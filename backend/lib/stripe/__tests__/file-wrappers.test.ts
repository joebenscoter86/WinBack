import { describe, it, expect, vi, beforeEach } from "vitest";

const retrieveMock = vi.fn();
const createMock = vi.fn();

vi.mock("stripe", () => {
  function StripeMock(_key: string) {
    // @ts-expect-error constructor mock
    this.files = { retrieve: retrieveMock, create: createMock };
  }
  return { default: StripeMock };
});

import { downloadStripeFile, uploadCombinedEvidence } from "../client";

describe("downloadStripeFile", () => {
  beforeEach(() => {
    retrieveMock.mockReset();
    process.env.STRIPE_SECRET_KEY = "sk_test_123";
  });

  it("retrieves the file and downloads bytes from the short-lived URL", async () => {
    retrieveMock.mockResolvedValue({ id: "file_abc", url: "https://files.stripe.com/file_abc" });
    const bytes = new Uint8Array([1, 2, 3, 4, 5]);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      arrayBuffer: async () => bytes.buffer,
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await downloadStripeFile("file_abc");

    expect(retrieveMock).toHaveBeenCalledWith("file_abc");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://files.stripe.com/file_abc",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer sk_test_123",
        }),
      }),
    );
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(Array.from(result)).toEqual([1, 2, 3, 4, 5]);

    vi.unstubAllGlobals();
  });

  it("throws when the file has no URL", async () => {
    retrieveMock.mockResolvedValue({ id: "file_abc", url: null });
    await expect(downloadStripeFile("file_abc")).rejects.toThrow(/no URL/);
  });

  it("throws when the download fails", async () => {
    retrieveMock.mockResolvedValue({ id: "file_abc", url: "https://files.stripe.com/x" });
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Forbidden",
      arrayBuffer: async () => new ArrayBuffer(0),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(downloadStripeFile("file_abc")).rejects.toThrow(/403/);

    vi.unstubAllGlobals();
  });
});

describe("uploadCombinedEvidence", () => {
  beforeEach(() => {
    createMock.mockReset();
    process.env.STRIPE_SECRET_KEY = "sk_test_123";
  });

  it("uploads a PDF buffer as dispute_evidence and returns the new file_id", async () => {
    createMock.mockResolvedValue({ id: "file_new" });
    const pdf = Buffer.from("%PDF-1.4 fake");

    const id = await uploadCombinedEvidence(pdf, "combined-evidence.pdf");

    expect(id).toBe("file_new");
    expect(createMock).toHaveBeenCalledTimes(1);
    const arg = createMock.mock.calls[0][0];
    expect(arg.purpose).toBe("dispute_evidence");
    expect(arg.file.name).toBe("combined-evidence.pdf");
    expect(arg.file.type).toBe("application/pdf");
    expect(Buffer.isBuffer(arg.file.data)).toBe(true);
    expect(arg.file.data.equals(pdf)).toBe(true);
  });
});
