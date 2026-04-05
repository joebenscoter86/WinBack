import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockSingle, mockEqReasonCode, mockEqNetwork, mockSelect, mockFrom } =
  vi.hoisted(() => {
    const mockSingle = vi.fn();
    const mockEqReasonCode = vi.fn().mockReturnValue({ single: mockSingle });
    const mockEqNetwork = vi
      .fn()
      .mockReturnValue({ eq: mockEqReasonCode });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEqNetwork });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
    return { mockSingle, mockEqReasonCode, mockEqNetwork, mockSelect, mockFrom };
  });

vi.mock("@/lib/supabase", () => ({
  supabase: { from: mockFrom },
}));

import { getPlaybook } from "../index";

describe("getPlaybook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSingle.mockResolvedValue({ data: null, error: null });
    mockEqReasonCode.mockReturnValue({ single: mockSingle });
    mockEqNetwork.mockReturnValue({ eq: mockEqReasonCode });
    mockSelect.mockReturnValue({ eq: mockEqNetwork });
    mockFrom.mockReturnValue({ select: mockSelect });
  });

  it("queries playbooks table with network and reason_code", async () => {
    mockSingle.mockResolvedValueOnce({ data: { id: 1 }, error: null });

    await getPlaybook("visa", "10.4");

    expect(mockFrom).toHaveBeenCalledWith("playbooks");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEqNetwork).toHaveBeenCalledWith("network", "visa");
    expect(mockEqReasonCode).toHaveBeenCalledWith("reason_code", "10.4");
    expect(mockSingle).toHaveBeenCalled();
  });

  it("returns playbook data on success", async () => {
    const playbook = {
      id: 1,
      network: "visa",
      reason_code: "10.4",
      title: "Fraud",
    };
    mockSingle.mockResolvedValueOnce({ data: playbook, error: null });

    const result = await getPlaybook("visa", "10.4");

    expect(result).toEqual(playbook);
  });

  it("returns null when playbook not found (PGRST116)", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: "PGRST116", message: "Row not found" },
    });

    const result = await getPlaybook("visa", "99.9");

    expect(result).toBeNull();
  });

  it("throws on unexpected database errors", async () => {
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: "42P01", message: "relation does not exist" },
    });

    await expect(getPlaybook("visa", "10.4")).rejects.toThrow(
      "relation does not exist",
    );
  });
});
