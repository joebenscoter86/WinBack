import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/stripe-auth", () => ({
  withStripeAuth: (handler: Function) => async (req: NextRequest) => {
    const body = await req.clone().json().catch(() => ({}));
    return handler(req, {
      identity: { userId: "usr_test", accountId: "acct_test" },
      body,
    });
  },
}));

vi.mock("@/lib/merchants", () => ({
  ensureMerchant: vi.fn(),
}));

// Track supabase calls by table and build chainable results
type ChainResult = { data: unknown; error: unknown };
const tableResults: Record<string, ChainResult[]> = {};
const tableCallCounts: Record<string, number> = {};

function setTableResult(table: string, ...results: ChainResult[]) {
  tableResults[table] = results;
  tableCallCounts[table] = 0;
}

function makeChainBuilder(table: string): Record<string, Function> {
  const getResult = (): ChainResult => {
    const results = tableResults[table] || [{ data: null, error: null }];
    const idx = tableCallCounts[table] || 0;
    tableCallCounts[table] = idx + 1;
    return results[idx] ?? results[results.length - 1];
  };

  const chain: Record<string, unknown> = {};
  const terminalMethods = ["single"];
  const chainMethods = ["select", "insert", "upsert", "update", "delete", "eq"];

  for (const method of terminalMethods) {
    chain[method] = vi.fn(() => Promise.resolve(getResult()));
  }
  for (const method of chainMethods) {
    chain[method] = vi.fn(() => chain);
  }

  // Make chain itself thenable so `await supabase.from("x").select().eq()` works
  // (when there's no .single() at the end)
  (chain as any).then = (resolve: Function, reject?: Function) => {
    const result = getResult();
    return Promise.resolve(result).then(resolve, reject);
  };

  return chain as Record<string, Function>;
}

const chainBuilders: Record<string, Record<string, Function>> = {};

vi.mock("@/lib/supabase", () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (!chainBuilders[table]) {
        chainBuilders[table] = makeChainBuilder(table);
      }
      return chainBuilders[table];
    }),
  },
}));

import { ensureMerchant } from "@/lib/merchants";

function makeGetRequest(disputeId: string): NextRequest {
  return new NextRequest(
    `http://localhost/api/disputes/${disputeId}/evidence-files`,
    { method: "GET" },
  );
}

function makePostRequest(disputeId: string, body: unknown): NextRequest {
  return new NextRequest(
    `http://localhost/api/disputes/${disputeId}/evidence-files`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

function makeDeleteRequest(disputeId: string, fileId: string): NextRequest {
  return new NextRequest(
    `http://localhost/api/disputes/${disputeId}/evidence-files/${fileId}`,
    { method: "DELETE" },
  );
}

describe("GET /api/disputes/[disputeId]/evidence-files", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset chain builders so they get recreated
    for (const key of Object.keys(chainBuilders)) delete chainBuilders[key];
    for (const key of Object.keys(tableResults)) delete tableResults[key];
    for (const key of Object.keys(tableCallCounts)) delete tableCallCounts[key];
  });

  it("returns evidence files for a dispute", async () => {
    const mockFiles = [
      {
        id: "file-1",
        dispute_id: "dispute-uuid",
        checklist_item_key: "receipt",
        stripe_file_id: "file_abc",
        file_name: "receipt.pdf",
        file_size: 1024,
        mime_type: "application/pdf",
        uploaded_at: "2026-04-10T00:00:00Z",
      },
    ];

    // disputes table: first call returns the dispute
    setTableResult("disputes", { data: { id: "dispute-uuid" }, error: null });
    // evidence_files table: returns the files list
    setTableResult("evidence_files", { data: mockFiles, error: null });

    const { GET } = await import("../route");
    const res = await GET(makeGetRequest("dp_test123"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ data: mockFiles });
    expect(ensureMerchant).toHaveBeenCalledWith("acct_test", "usr_test");
  });

  it("returns 400 when dispute ID is missing", async () => {
    const { GET } = await import("../route");
    const req = new NextRequest(
      "http://localhost/api/disputes//evidence-files",
      { method: "GET" },
    );
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.code).toBe("invalid_request");
  });

  it("returns empty array when dispute not found", async () => {
    setTableResult("disputes", { data: null, error: { code: "PGRST116" } });

    const { GET } = await import("../route");
    const res = await GET(makeGetRequest("dp_nonexistent"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ data: [] });
  });
});

describe("POST /api/disputes/[disputeId]/evidence-files", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(chainBuilders)) delete chainBuilders[key];
    for (const key of Object.keys(tableResults)) delete tableResults[key];
    for (const key of Object.keys(tableCallCounts)) delete tableCallCounts[key];
  });

  it("creates an evidence file record", async () => {
    const mockFile = {
      id: "file-1",
      dispute_id: "dispute-uuid",
      checklist_item_key: "receipt",
      stripe_file_id: "file_abc",
      file_name: "receipt.pdf",
      file_size: 1024,
      mime_type: "application/pdf",
      file_path: "file_abc",
    };

    // disputes table: lookup returns existing dispute
    setTableResult("disputes", { data: { id: "dispute-uuid" }, error: null });
    // evidence_files table: upsert returns the file
    setTableResult("evidence_files", { data: mockFile, error: null });

    const { POST } = await import("../route");
    const res = await POST(
      makePostRequest("dp_test123", {
        checklist_item_key: "receipt",
        stripe_file_id: "file_abc",
        file_name: "receipt.pdf",
        file_size: 1024,
        mime_type: "application/pdf",
      }),
    );
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ data: mockFile });
    expect(ensureMerchant).toHaveBeenCalledWith("acct_test", "usr_test");
  });

  it("returns 400 when required fields are missing", async () => {
    const { POST } = await import("../route");
    const res = await POST(
      makePostRequest("dp_test123", {
        checklist_item_key: "receipt",
        // missing stripe_file_id and file_name
      }),
    );
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.code).toBe("invalid_request");
    expect(ensureMerchant).not.toHaveBeenCalled();
  });
});

describe("DELETE /api/disputes/[disputeId]/evidence-files/[fileId]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    for (const key of Object.keys(chainBuilders)) delete chainBuilders[key];
    for (const key of Object.keys(tableResults)) delete tableResults[key];
    for (const key of Object.keys(tableCallCounts)) delete tableCallCounts[key];
  });

  it("deletes an evidence file record", async () => {
    // disputes table: lookup returns the dispute
    setTableResult("disputes", { data: { id: "dispute-uuid" }, error: null });
    // evidence_files table: delete succeeds
    setTableResult("evidence_files", { data: null, error: null });

    const { DELETE } = await import("../[fileId]/route");
    const res = await DELETE(makeDeleteRequest("dp_test123", "file-uuid-1"));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual({ success: true });
    expect(ensureMerchant).toHaveBeenCalledWith("acct_test", "usr_test");
  });
});
