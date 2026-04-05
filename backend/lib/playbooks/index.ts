import { supabase } from "@/lib/supabase";

export async function getPlaybook(
  network: string,
  reasonCode: string,
): Promise<Record<string, unknown> | null> {
  const { data, error } = await supabase
    .from("playbooks")
    .select("*")
    .eq("network", network)
    .eq("reason_code", reasonCode)
    .single();

  if (error) {
    // PGRST116 = row not found from .single()
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(error.message);
  }

  return data;
}
