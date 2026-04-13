/**
 * WIN-20 concat spike: prove that PDF concatenation produces files Stripe accepts
 * as dispute evidence, under the 5 MB per-file cap, starting from realistic inputs.
 *
 * Run: cd backend && set -a && source .env.local && set +a && npx tsx scripts/spike-concat.ts
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
 * Generate a realistic-ish phone screenshot. Large (~2-3 MB) JPEG at iPhone
 * 14/15 resolution with gradient + text so it doesn't trivially compress.
 */
async function generateTestScreenshot(index: number): Promise<Buffer> {
  const palette = ["ff6b6b", "4ecdc4", "ffe66d", "a8e6cf", "ff8b94"];
  const svg = `
    <svg width="1170" height="2532" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#${palette[index % palette.length]}"/>
          <stop offset="100%" stop-color="#2c3e50"/>
        </linearGradient>
      </defs>
      <rect width="1170" height="2532" fill="url(#g)"/>
      ${Array.from(
        { length: 40 },
        (_, i) =>
          `<text x="60" y="${120 + i * 60}" font-family="Arial" font-size="32" fill="white">Screenshot ${index} line ${i}: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor</text>`,
      ).join("\n")}
    </svg>
  `;
  return sharp(Buffer.from(svg)).jpeg({ quality: 95 }).toBuffer();
}

/**
 * Generate a simple test PDF to represent a merchant-uploaded document like
 * an order confirmation or ToS page.
 */
async function generateTestPDF(): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([612, 792]);
  page.drawText("Order Confirmation", { x: 50, y: 720, size: 24, font });
  page.drawText("Order #12345", { x: 50, y: 680, size: 14, font });
  page.drawText("Customer: Jane Doe", { x: 50, y: 660, size: 14, font });
  page.drawText("Amount: $149.99", { x: 50, y: 640, size: 14, font });
  page.drawText("Date: 2026-04-12", { x: 50, y: 620, size: 14, font });
  return Buffer.from(await doc.save());
}

/**
 * Compress an image for evidence: resize to max 1200px on the long edge, re-encode
 * as JPEG quality 80 with mozjpeg. This is the critical step that keeps merged
 * evidence under Stripe's 5 MB per-file cap on realistic multi-file inputs.
 */
async function compressImageForEvidence(imgBuffer: Buffer): Promise<Buffer> {
  return sharp(imgBuffer)
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

type ConcatInput = {
  name: string;
  buffer: Buffer;
  kind: "image" | "pdf";
};

/**
 * Core concat pipeline. Takes a list of images and PDFs, emits one combined PDF:
 * - PDFs are page-appended via copyPages
 * - Images are compressed then embedded one-per-page, scaled to fit Letter size
 */
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
  console.log("=== WIN-20 PDF concat spike ===\n");

  await fs.mkdir(TMP_DIR, { recursive: true });

  console.log("[1/5] Generating realistic test inputs...");
  const screenshots = await Promise.all([0, 1, 2, 3, 4].map(generateTestScreenshot));
  const testPDF = await generateTestPDF();

  const inputs: ConcatInput[] = [
    ...screenshots.map((buffer, i) => ({
      name: `screenshot-${i + 1}.jpg`,
      buffer,
      kind: "image" as const,
    })),
    { name: "order-confirmation.pdf", buffer: testPDF, kind: "pdf" as const },
  ];

  let rawTotal = 0;
  for (const input of inputs) {
    console.log(`       ${input.name.padEnd(28)} ${mb(input.buffer.length).padStart(8)}`);
    rawTotal += input.buffer.length;
  }
  console.log(`       ${"TOTAL RAW INPUT".padEnd(28)} ${mb(rawTotal).padStart(8)}\n`);

  console.log("[2/5] Running concat pipeline (compress + merge)...");
  const t0 = Date.now();
  const combined = await concatFilesToPDF(inputs);
  const elapsed = Date.now() - t0;
  console.log(`       output size:      ${mb(combined.length)}`);
  console.log(`       elapsed:          ${elapsed} ms`);
  console.log(`       compression:      ${((combined.length / rawTotal) * 100).toFixed(1)}% of raw input\n`);

  const outPath = path.join(TMP_DIR, "combined.pdf");
  await fs.writeFile(outPath, combined);
  console.log(`[3/5] Saved combined PDF for visual inspection:`);
  console.log(`       ${outPath}\n`);

  if (combined.length > STRIPE_EVIDENCE_FILE_CAP) {
    console.log(`[4/5] FAIL — output ${mb(combined.length)} exceeds Stripe cap ${mb(STRIPE_EVIDENCE_FILE_CAP)}`);
    process.exit(1);
  }
  const headroom = STRIPE_EVIDENCE_FILE_CAP - combined.length;
  console.log(`[4/5] PASS — under Stripe 5 MB cap (${mb(headroom)} headroom)\n`);

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.log("[5/5] SKIP Stripe upload — STRIPE_SECRET_KEY not set");
    console.log("\n=== PARTIAL PASS: local pipeline works, Stripe not verified ===");
    return;
  }
  const stripe = new Stripe(key);
  console.log("[5/5] Uploading to Stripe Files (purpose: dispute_evidence)...");
  const file = await stripe.files.create({
    purpose: "dispute_evidence",
    file: {
      data: combined,
      name: "spike-combined-evidence.pdf",
      type: "application/pdf",
    },
  });
  console.log(`       file_id:          ${file.id}`);
  console.log(`       stripe size:      ${mb(file.size ?? 0)}`);
  console.log(`       type:             ${file.type}`);
  console.log(`       purpose:          ${file.purpose}`);
  console.log(`\n=== SPIKE PASS: concat works end-to-end, Stripe accepted it ===`);
}

main().catch((err) => {
  console.error("SPIKE FAILED:", err);
  process.exit(1);
});
