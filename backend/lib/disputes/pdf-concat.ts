import sharp from "sharp";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";

export type ConcatInput = {
  name: string;
  buffer: Buffer;
  kind: "image" | "pdf";
};

/**
 * Compress a merchant-uploaded image for dispute evidence. Resizes to 1200px
 * on the long edge, honors EXIF rotation, re-encodes as JPEG quality 80 via
 * mozjpeg. Real iPhone photos (4 MB, 24 MP) compress to ~110 KB with no
 * visible loss of evidentiary detail at standard monitor viewing sizes.
 * Reference: backend/scripts/spike-concat-real.ts.
 */
export async function compressImageForEvidence(imgBuffer: Buffer): Promise<Buffer> {
  return sharp(imgBuffer)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
}

/**
 * Merge a list of images and PDFs into a single combined PDF.
 * - PDF inputs: pages are copied into the output via PDFDocument.copyPages.
 * - Image inputs: compressed via compressImageForEvidence, then embedded one
 *   per page, scaled to fit Letter size (612x792).
 *
 * This function does NOT handle per-file error recovery. The caller (the
 * evidence assembler) is responsible for wrapping this in a try/catch per
 * file to enforce the skip-and-warn policy.
 */
export async function concatFilesToPDF(items: ConcatInput[]): Promise<Buffer> {
  const combined = await PDFDocument.create();
  const font = await combined.embedFont(StandardFonts.Helvetica);
  const fontBold = await combined.embedFont(StandardFonts.HelveticaBold);

  for (const item of items) {
    addCoverPage(combined, item.name, font, fontBold);
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

// Inserts a simple cover page before a file's content so an issuer reading
// a concatted evidence bundle can map narrative filename references ("see
// invoice-007-saas.pdf") to the correct section inside the combined PDF.
function addCoverPage(
  doc: PDFDocument,
  filename: string,
  font: PDFFont,
  fontBold: PDFFont,
): void {
  const pageW = 612;
  const pageH = 792;
  const page = doc.addPage([pageW, pageH]);

  const labelSize = 11;
  const label = "Evidence file";
  const labelWidth = font.widthOfTextAtSize(label, labelSize);
  page.drawText(label, {
    x: (pageW - labelWidth) / 2,
    y: pageH / 2 + 20,
    size: labelSize,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  const nameSize = 18;
  const nameWidth = fontBold.widthOfTextAtSize(filename, nameSize);
  page.drawText(filename, {
    x: Math.max(40, (pageW - nameWidth) / 2),
    y: pageH / 2 - 10,
    size: nameSize,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
}
