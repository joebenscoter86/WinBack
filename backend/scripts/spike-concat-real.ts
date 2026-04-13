/**
 * WIN-20 concat calibration: run a real iPhone photo through the pipeline.
 *
 * Takes a real phone photo from Joe's desktop and measures:
 * 1. Single-photo compression ratio (calibrates our assumptions)
 * 2. 10-copy stress test (worst-case merchant upload to one slot)
 *
 * Run: cd backend && set -a && source .env.local && set +a && npx tsx scripts/spike-concat-real.ts
 */

import Stripe from "stripe";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const REAL_PHOTO_PATH = "/Users/joeb/Desktop/IMG_5417.jpeg";
const TMP_DIR = "/tmp/winback-concat-spike";
const STRIPE_EVIDENCE_FILE_CAP = 5 * 1024 * 1024;

function mb(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

async function compressImageForEvidence(imgBuffer: Buffer): Promise<Buffer> {
  return sharp(imgBuffer)
    .rotate() // honor EXIF orientation so photos land right-side-up
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
  console.log("=== WIN-20 real-photo calibration ===\n");
  await fs.mkdir(TMP_DIR, { recursive: true });

  const raw = await fs.readFile(REAL_PHOTO_PATH);
  const meta = await sharp(raw).metadata();
  console.log(`[1/4] Loaded real photo:`);
  console.log(`      path:         ${REAL_PHOTO_PATH}`);
  console.log(`      size:         ${mb(raw.length)}`);
  console.log(`      dimensions:   ${meta.width}x${meta.height}`);
  console.log(`      format:       ${meta.format}`);
  console.log(`      has exif:     ${meta.exif ? "yes" : "no"}\n`);

  console.log(`[2/4] Compressing single photo through pipeline...`);
  const t0 = Date.now();
  const compressed = await compressImageForEvidence(raw);
  const compressMs = Date.now() - t0;
  const compressedMeta = await sharp(compressed).metadata();
  console.log(`      output size:  ${mb(compressed.length)}`);
  console.log(`      dimensions:   ${compressedMeta.width}x${compressedMeta.height}`);
  console.log(`      ratio:        ${((compressed.length / raw.length) * 100).toFixed(1)}% of raw`);
  console.log(`      elapsed:      ${compressMs} ms\n`);

  // Save the compressed version so Joe can visually check quality
  const compressedPath = path.join(TMP_DIR, "real-photo-compressed.jpg");
  await fs.writeFile(compressedPath, compressed);
  console.log(`      saved:        ${compressedPath}\n`);

  console.log(`[3/4] Stress test: 10 copies of this photo in one combined PDF...`);
  const inputs: ConcatInput[] = Array.from({ length: 10 }, (_, i) => ({
    name: `real-photo-${i + 1}.jpg`,
    buffer: raw,
    kind: "image" as const,
  }));
  const rawTotal = raw.length * 10;
  console.log(`      raw total:    ${mb(rawTotal)} (10 x ${mb(raw.length)})`);

  const t1 = Date.now();
  const combined = await concatFilesToPDF(inputs);
  const concatMs = Date.now() - t1;
  console.log(`      output size:  ${mb(combined.length)}`);
  console.log(`      ratio:        ${((combined.length / rawTotal) * 100).toFixed(1)}% of raw`);
  console.log(`      elapsed:      ${concatMs} ms`);

  const outPath = path.join(TMP_DIR, "combined-real-stress.pdf");
  await fs.writeFile(outPath, combined);
  console.log(`      saved:        ${outPath}`);

  if (combined.length > STRIPE_EVIDENCE_FILE_CAP) {
    console.log(`\n[4/4] FAIL — ${mb(combined.length)} exceeds Stripe 5 MB cap`);
    process.exit(1);
  }
  const headroom = STRIPE_EVIDENCE_FILE_CAP - combined.length;
  console.log(`\n[4/4] PASS — under 5 MB cap with ${mb(headroom)} headroom\n`);

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.log("SKIP Stripe upload — STRIPE_SECRET_KEY not set");
    return;
  }
  const stripe = new Stripe(key);
  console.log("Uploading 10-real-photo stress test to Stripe Files...");
  const file = await stripe.files.create({
    purpose: "dispute_evidence",
    file: {
      data: combined,
      name: "spike-real-10photos.pdf",
      type: "application/pdf",
    },
  });
  console.log(`      file_id:      ${file.id}`);
  console.log(`      stripe size:  ${mb(file.size ?? 0)}`);
  console.log(`\n=== REAL-PHOTO CALIBRATION PASS ===`);
}

main().catch((err) => {
  console.error("CALIBRATION FAILED:", err);
  process.exit(1);
});
