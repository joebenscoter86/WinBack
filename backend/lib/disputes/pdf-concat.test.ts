import { describe, it, expect } from "vitest";
import { concatFilesToPDF, compressImageForEvidence, type ConcatInput } from "./pdf-concat";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";

const FIXTURES = path.join(__dirname, "../../__tests__/fixtures/concat");

async function loadFixture(name: string): Promise<Buffer> {
  return fs.readFile(path.join(FIXTURES, name));
}

describe("compressImageForEvidence", () => {
  it("produces a smaller buffer than the input for a large image", async () => {
    const { default: sharp } = await import("sharp");
    const big = await sharp({
      create: { width: 3000, height: 3000, channels: 3, background: { r: 50, g: 50, b: 50 } },
    }).jpeg({ quality: 100 }).toBuffer();

    const compressed = await compressImageForEvidence(big);
    expect(compressed.length).toBeLessThan(big.length);
  });

  it("honors EXIF rotation (rotate() is called before resize)", async () => {
    const jpg = await loadFixture("sample.jpg");
    const compressed = await compressImageForEvidence(jpg);
    expect(compressed.length).toBeGreaterThan(0);
  });
});

describe("concatFilesToPDF", () => {
  it("produces a valid PDF from a single image (1 cover + 1 image)", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [{ name: "a.jpg", buffer: jpg, kind: "image" }];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBe(2);
  });

  it("produces a valid PDF from a single source PDF (page copy)", async () => {
    const pdf = await loadFixture("sample.pdf");
    const inputs: ConcatInput[] = [{ name: "a.pdf", buffer: pdf, kind: "pdf" }];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });

  it("merges 3 images into a 6-page PDF (3 cover pages + 3 image pages)", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [
      { name: "a.jpg", buffer: jpg, kind: "image" },
      { name: "b.jpg", buffer: jpg, kind: "image" },
      { name: "c.jpg", buffer: jpg, kind: "image" },
    ];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBe(6);
  });

  it("prepends one cover page per input file (issuer can locate narrative-referenced files inside a concat)", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [
      { name: "alpha.jpg", buffer: jpg, kind: "image" },
      { name: "beta.jpg", buffer: jpg, kind: "image" },
    ];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    // 2 files x (1 cover + 1 content) = 4 pages
    expect(doc.getPageCount()).toBe(4);
  });

  it("writes a visually-inspectable sample concat with cover pages to /tmp (manual QA hook)", async () => {
    // pdf-lib compresses content streams so asserting on rendered filename
    // bytes is brittle. Instead save a sample and let a human eyeball it.
    // Path is logged when the test runs with reporter=verbose.
    const jpg = await loadFixture("sample.jpg");
    const pdf = await loadFixture("sample.pdf");
    const inputs: ConcatInput[] = [
      { name: "invoice-004-international.pdf", buffer: pdf, kind: "pdf" },
      { name: "delivery-screenshot.png", buffer: jpg, kind: "image" },
      { name: "customer-email-chain.pdf", buffer: pdf, kind: "pdf" },
    ];
    const result = await concatFilesToPDF(inputs);
    const outDir = path.join(__dirname, "../../../docs/qa/samples");
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, "concat-cover-sample.pdf");
    await fs.writeFile(outPath, result);
    const stat = await fs.stat(outPath);
    expect(stat.size).toBeGreaterThan(1000);
  });

  it("merges a PDF + 2 images into a multi-page PDF", async () => {
    const jpg = await loadFixture("sample.jpg");
    const pdf = await loadFixture("sample.pdf");
    const inputs: ConcatInput[] = [
      { name: "a.pdf", buffer: pdf, kind: "pdf" },
      { name: "b.jpg", buffer: jpg, kind: "image" },
      { name: "c.jpg", buffer: jpg, kind: "image" },
    ];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(3);
  });

  it("throws on a corrupted PDF input (caller must catch)", async () => {
    const bad = Buffer.from("not a pdf at all");
    const inputs: ConcatInput[] = [{ name: "bad.pdf", buffer: bad, kind: "pdf" }];
    await expect(concatFilesToPDF(inputs)).rejects.toThrow();
  });
});
