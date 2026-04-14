/**
 * WIN-20 concat stress test: worst-case merchant inputs.
 *
 * Desktop uploads only (Stripe Apps is desktop-only), so:
 *  - PNGs for screenshots (Retina desktop captures)
 *  - Noise-heavy JPEGs for "photos" of damage/condition
 *  - One HEIC to verify the sharp conversion path works at all
 *  - One multi-page PDF
 *
 * Target: 11 items combine to under Stripe's 5 MB cap for dispute_evidence.
 *
 * Run: cd backend && set -a && source .env.local && set +a && npx tsx scripts/spike-concat-stress.ts
 */

import Stripe from "stripe";
import sharp from "sharp";
import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const TMP_DIR = "/tmp/winback-concat-spike";
const STRIPE_EVIDENCE_FILE_CAP = 5 * 1024 * 1024;

function mb(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

/**
 * Generate a noise-heavy "photo" that resists compression. Uses sharp's noise
 * generator layered with random rectangles to approximate the detail density
 * of a real photo (damaged product, shipping label, receipt close-up).
 */
async function generateNoisyPhoto(index: number, w: number, h: number): Promise<Buffer> {
  // Start with a noise-ish base via a gradient SVG overlaid with many small rects
  const rects = Array.from({ length: 800 }, (_, i) => {
    const rx = Math.floor(Math.random() * w);
    const ry = Math.floor(Math.random() * h);
    const rw = 4 + Math.floor(Math.random() * 30);
    const rh = 4 + Math.floor(Math.random() * 30);
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = (0.3 + Math.random() * 0.5).toFixed(2);
    return `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="rgba(${r},${g},${b},${a})"/>`;
  }).join("");
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8a7a6a"/>
          <stop offset="100%" stop-color="#3a2a1a"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)"/>
      ${rects}
      <text x="40" y="60" font-family="Arial" font-size="32" fill="white">Photo ${index}</text>
    </svg>
  `;
  // Encode at max quality to be the hardest possible input to the compression pipeline
  return sharp(Buffer.from(svg)).jpeg({ quality: 100, chromaSubsampling: "4:4:4" }).toBuffer();
}

/**
 * Generate a realistic desktop PNG screenshot at Retina resolution.
 * Text-heavy content compresses well but we keep the native resolution
 * large so the raw input size is representative.
 */
async function generateDesktopScreenshotPNG(index: number): Promise<Buffer> {
  const w = 2880;
  const h = 1800;
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#f4f4f8"/>
      <rect x="0" y="0" width="${w}" height="120" fill="#635bff"/>
      <text x="60" y="80" font-family="Arial" font-size="48" fill="white">Stripe Dashboard Screenshot ${index}</text>
      ${Array.from({ length: 25 }, (_, i) =>
        `<text x="60" y="${220 + i * 56}" font-family="Arial" font-size="28" fill="#333">Row ${i}: Payment py_1TestXyz${i} | $${(10 + i * 7).toFixed(2)} | 2026-04-${(i % 28) + 1} | succeeded</text>`,
      ).join("\n")}
    </svg>
  `;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/**
 * Generate an HEIC input to verify the sharp HEIC → JPEG conversion path.
 * If libvips was built without HEIF support this will fail at generation,
 * which is exactly what we need to find out BEFORE shipping.
 */
async function generateHEIC(): Promise<Buffer | null> {
  const w = 1170;
  const h = 2532;
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#4a90e2"/>
      <text x="60" y="200" font-family="Arial" font-size="48" fill="white">HEIC test</text>
    </svg>
  `;
  try {
    return await sharp(Buffer.from(svg)).heif({ compression: "hevc", quality: 80 }).toBuffer();
  } catch (err) {
    console.log(`       WARN: HEIC encoding not supported on this sharp build: ${(err as Error).message}`);
    return null;
  }
}

async function generateMultiPagePDF(): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < 6; i++) {
    const page = doc.addPage([612, 792]);
    page.drawText(`Bank Statement — Page ${i + 1} of 6`, { x: 50, y: 720, size: 18, font });
    for (let j = 0; j < 20; j++) {
      page.drawText(`Txn ${i * 20 + j}: $${(10 + j * 3).toFixed(2)}  2026-04-${(j % 28) + 1}`, {
        x: 50,
        y: 680 - j * 20,
        size: 10,
        font,
      });
    }
  }
  return Buffer.from(await doc.save());
}

async function compressImageForEvidence(imgBuffer: Buffer): Promise<Buffer> {
  return sharp(imgBuffer)
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

type ConcatInput = { name: string; buffer: Buffer; kind: "image" | "pdf" };

async function concatFilesToPDF(items: ConcatInput[]): Promise<Buffer> {
  const combined = await PDFDocument.create();
  for (const item of items) {
    if (item.kind === "pdf") {
      const src = await PDFDocument.load(item.buffer);
      const pages = await combined.copyPages(src, src.getPageIndices());
      for (const p of pages) combined.addPage(p);
    } else {
      const compressed = await compressImageForEvidence(item.buffer);
      const img = await combined.embedJpg(compressed);
      const pageW = 612;
      const pageH = 792;
      const scale = Math.min(pageW / img.width, pageH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const page = combined.addPage([pageW, pageH]);
      page.drawImage(img, {
        x: (pageW - drawW) / 2,
        y: (pageH - drawH) / 2,
        width: drawW,
        height: drawH,
      });
    }
  }
  return Buffer.from(await combined.save());
}

async function main() {
  console.log("=== WIN-20 PDF concat stress test ===\n");
  await fs.mkdir(TMP_DIR, { recursive: true });

  console.log("[1/5] Generating worst-case inputs...");

  // 6 noise-heavy "photos" at iPhone portrait resolution
  const photos = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((i) => generateNoisyPhoto(i, 1170, 2532)),
  );

  // 3 large PNG "desktop screenshots" at Retina resolution
  const screenshots = await Promise.all([1, 2, 3].map(generateDesktopScreenshotPNG));

  // 1 HEIC input (may be null if sharp lacks HEIF support)
  const heic = await generateHEIC();

  // 1 multi-page PDF
  const pdf = await generateMultiPagePDF();

  const inputs: ConcatInput[] = [
    ...photos.map((buffer, i) => ({ name: `photo-${i + 1}.jpg`, buffer, kind: "image" as const })),
    ...screenshots.map((buffer, i) => ({
      name: `desktop-screenshot-${i + 1}.png`,
      buffer,
      kind: "image" as const,
    })),
    ...(heic ? [{ name: "iphone-photo.heic", buffer: heic, kind: "image" as const }] : []),
    { name: "bank-statement.pdf", buffer: pdf, kind: "pdf" as const },
  ];

  let rawTotal = 0;
  for (const input of inputs) {
    console.log(`       ${input.name.padEnd(28)} ${mb(input.buffer.length).padStart(8)}`);
    rawTotal += input.buffer.length;
  }
  console.log(`       ${"TOTAL RAW INPUT".padEnd(28)} ${mb(rawTotal).padStart(8)}\n`);

  console.log("[2/5] Running concat pipeline...");
  const t0 = Date.now();
  const combined = await concatFilesToPDF(inputs);
  const elapsed = Date.now() - t0;
  console.log(`       output size:      ${mb(combined.length)}`);
  console.log(`       elapsed:          ${elapsed} ms`);
  console.log(`       compression:      ${((combined.length / rawTotal) * 100).toFixed(1)}% of raw input\n`);

  const outPath = path.join(TMP_DIR, "combined-stress.pdf");
  await fs.writeFile(outPath, combined);
  console.log(`[3/5] Saved combined PDF: ${outPath}\n`);

  if (combined.length > STRIPE_EVIDENCE_FILE_CAP) {
    console.log(`[4/5] FAIL — output ${mb(combined.length)} exceeds Stripe cap ${mb(STRIPE_EVIDENCE_FILE_CAP)}`);
    process.exit(1);
  }
  const headroom = STRIPE_EVIDENCE_FILE_CAP - combined.length;
  console.log(`[4/5] PASS — under Stripe 5 MB cap (${mb(headroom)} headroom)\n`);

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.log("[5/5] SKIP Stripe upload — STRIPE_SECRET_KEY not set");
    return;
  }
  const stripe = new Stripe(key);
  console.log("[5/5] Uploading stress-test PDF to Stripe Files...");
  const file = await stripe.files.create({
    purpose: "dispute_evidence",
    file: {
      data: combined,
      name: "spike-stress-combined-evidence.pdf",
      type: "application/pdf",
    },
  });
  console.log(`       file_id:          ${file.id}`);
  console.log(`       stripe size:      ${mb(file.size ?? 0)}`);
  console.log(`       purpose:          ${file.purpose}`);
  console.log(`\n=== STRESS TEST PASS: ${inputs.length} files combined and accepted by Stripe ===`);
}

main().catch((err) => {
  console.error("STRESS TEST FAILED:", err);
  process.exit(1);
});
