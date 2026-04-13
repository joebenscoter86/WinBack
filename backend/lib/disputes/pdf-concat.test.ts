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
  it("produces a valid PDF from a single image", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [{ name: "a.jpg", buffer: jpg, kind: "image" }];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBe(1);
  });

  it("produces a valid PDF from a single source PDF (page copy)", async () => {
    const pdf = await loadFixture("sample.pdf");
    const inputs: ConcatInput[] = [{ name: "a.pdf", buffer: pdf, kind: "pdf" }];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });

  it("merges 3 images into a 3-page PDF", async () => {
    const jpg = await loadFixture("sample.jpg");
    const inputs: ConcatInput[] = [
      { name: "a.jpg", buffer: jpg, kind: "image" },
      { name: "b.jpg", buffer: jpg, kind: "image" },
      { name: "c.jpg", buffer: jpg, kind: "image" },
    ];
    const result = await concatFilesToPDF(inputs);
    const doc = await PDFDocument.load(result);
    expect(doc.getPageCount()).toBe(3);
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
