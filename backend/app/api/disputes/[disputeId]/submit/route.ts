import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import Stripe from "stripe";
import { withStripeAuth } from "@/lib/stripe-auth";
import {
  getDispute,
  getCharge,
  submitDispute,
} from "@/lib/stripe";
import { ensureMerchant } from "@/lib/merchants";
import { supabase } from "@/lib/supabase";
import { getPlaybook } from "@/lib/playbooks";
import { evaluateSubmissionGuard } from "@/lib/disputes/submission-guard";
import type { SubmissionWarning } from "@/lib/disputes/types";

// A stale pending row is one created more than this many seconds ago.
const PENDING_STALE_SECONDS = 60;

type ErrorBody = { error: string; code: string; warnings?: SubmissionWarning[] };

function errorResponse(
  status: number,
  code: string,
  message: string,
  warnings?: SubmissionWarning[],
): NextResponse<ErrorBody> {
  return NextResponse.json(
    { error: message, code, ...(warnings ? { warnings } : {}) },
    { status },
  );
}

/**
 * Classify a Stripe error into our domain codes and HTTP status for submission failures.
 * Intentionally separate from `classifyStripeError` in lib/stripe/errors.ts because
 * submission errors use different domain codes (stripe_rate_limit, stripe_5xx, etc.)
 * compared to the generic stripe lib codes.
 */
function classifyStripeSubmissionError(err: unknown): {
  code: string;
  status: number;
  message: string;
} {
  if (err instanceof Stripe.errors.StripeRateLimitError) {
    return {
      code: "stripe_rate_limit",
      status: 429,
      message: err.message,
    };
  }
  if (
    err instanceof Stripe.errors.StripeAPIError ||
    err instanceof Stripe.errors.StripeConnectionError
  ) {
    return {
      code: "stripe_5xx",
      status: 502,
      message: "Stripe encountered an error. Your submission was NOT sent.",
    };
  }
  if (err instanceof Stripe.errors.StripeError) {
    return {
      code: "stripe_invalid_request",
      status: 400,
      message: err.message,
    };
  }
  const message =
    err instanceof Error
      ? err.message
      : "Something went wrong. Your submission was NOT sent.";
  return { code: "internal_error", status: 500, message };
}

async function failSubmission(
  submissionId: string,
  err: unknown,
  warnings: SubmissionWarning[],
): Promise<NextResponse<ErrorBody>> {
  const { code, status, message } = classifyStripeSubmissionError(err);

  await supabase
    .from("dispute_submissions")
    .update({
      status: "failed",
      error_code: code,
      error_message: message,
      completed_at: new Date().toISOString(),
    })
    .eq("id", submissionId);

  return NextResponse.json({ error: message, code, warnings }, { status });
}

export const POST = withStripeAuth(
  async (request: NextRequest, { identity }) => {
    const { accountId, userId } = identity;

    // Extract disputeId from path: /api/disputes/[disputeId]/submit
    const parts = request.nextUrl.pathname.split("/");
    const stripeDisputeId = parts[parts.length - 2];

    if (!stripeDisputeId) {
      return errorResponse(400, "invalid_request", "Missing dispute ID");
    }

    // Step 1: Auth + merchant lookup
    await ensureMerchant(accountId, userId);

    const { data: merchant } = await supabase
      .from("merchants")
      .select("id")
      .eq("stripe_account_id", accountId)
      .single();

    if (!merchant) {
      return errorResponse(404, "merchant_not_found", "Merchant row missing");
    }

    // Step 2: Load local dispute row
    const { data: dispute } = await supabase
      .from("disputes")
      .select("id, stripe_dispute_id, network, reason_code, narrative_text")
      .eq("stripe_dispute_id", stripeDisputeId)
      .eq("merchant_id", (merchant as { id: string }).id)
      .single();

    if (!dispute) {
      return errorResponse(
        404,
        "dispute_not_found",
        "Dispute not found. Refresh this page and try again.",
      );
    }

    const localDispute = dispute as {
      id: string;
      stripe_dispute_id: string;
      network: string;
      reason_code: string;
      narrative_text: string | null;
    };

    // Step 3: Load evidence files
    const { data: evidenceFilesRaw } = await supabase
      .from("evidence_files")
      .select("checklist_item_key, stripe_file_id")
      .eq("dispute_id", localDispute.id);

    const evidenceFiles = (evidenceFilesRaw ?? []) as Array<{
      checklist_item_key: string;
      stripe_file_id: string;
    }>;

    // Step 4: Load narrative — prefer disputes.narrative_text; fall back to
    // latest succeeded narrative_generation. The narrative_output JSONB stores
    // a NarrativeOutput object with shape { narrative: string, annotations: [] }.
    let narrativeText: string | null = localDispute.narrative_text;
    if (!narrativeText) {
      const { data: latestGen } = await supabase
        .from("narrative_generations")
        .select("narrative_output")
        .eq("dispute_id", localDispute.id)
        .eq("status", "succeeded")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestGen) {
        const out = (
          latestGen as { narrative_output: { narrative?: string } }
        ).narrative_output;
        narrativeText = out?.narrative ?? null;
      }
    }

    // Step 5: Fetch live Stripe dispute (with charge expanded) + charge object
    let stripeDispute: Stripe.Dispute;
    let stripeCharge: Stripe.Charge;
    try {
      stripeDispute = await getDispute(accountId, stripeDisputeId, ["charge"]);

      const chargeOrId = stripeDispute.charge;
      const chargeId =
        typeof chargeOrId === "string" ? chargeOrId : chargeOrId?.id;

      if (!chargeId) {
        return errorResponse(
          500,
          "internal_error",
          "Dispute has no associated charge",
        );
      }

      stripeCharge =
        typeof chargeOrId === "string"
          ? await getCharge(accountId, chargeId)
          : (chargeOrId as Stripe.Charge);
    } catch (err) {
      if (err instanceof Stripe.errors.StripeError) {
        const { code, status, message } = classifyStripeSubmissionError(err);
        return errorResponse(status, code, message);
      }
      console.error("[WIN-20] fetch stripe dispute failed", err);
      return errorResponse(
        500,
        "internal_error",
        "Failed to load dispute from Stripe",
      );
    }

    // Step 6: Load playbook
    const playbook = await getPlaybook(
      localDispute.network,
      localDispute.reason_code,
    );
    if (!playbook) {
      return errorResponse(500, "internal_error", "Playbook not found");
    }

    // Step 7: Idempotent replay / in-flight lock check
    // Must run BEFORE the pre-submission guard so that a replay of a
    // successfully-submitted dispute returns the cached 200 even though
    // Stripe now reports a non-submittable status (e.g. under_review).
    const { data: existingRows } = await supabase
      .from("dispute_submissions")
      .select("*")
      .eq("dispute_id", localDispute.id)
      .in("status", ["pending", "succeeded"])
      .order("created_at", { ascending: false })
      .limit(1);

    const prior = (existingRows ?? [])[0] as
      | {
          id: string;
          status: "pending" | "succeeded";
          stripe_response: Stripe.Dispute | null;
          created_at: string;
          completed_at: string | null;
          warnings: SubmissionWarning[] | null;
        }
      | undefined;

    if (prior?.status === "succeeded") {
      // Return cached result — no need to re-call Stripe (and no need to
      // run the guard; the submission already happened).
      return NextResponse.json({
        data: {
          submission_id: prior.id,
          submitted_at: prior.completed_at,
          dispute_status: prior.stripe_response?.status ?? "under_review",
          warnings: prior.warnings ?? [],
        },
      });
    }

    if (prior?.status === "pending") {
      const ageSec = (Date.now() - new Date(prior.created_at).getTime()) / 1000;

      if (ageSec < PENDING_STALE_SECONDS) {
        // Fresh pending — another request is in flight
        return errorResponse(
          409,
          "submission_in_progress",
          "A submission is already in flight. Please wait a moment.",
        );
      }

      // Stale pending (>= 60s) — check if Stripe already processed it
      const STILL_SUBMITTABLE = new Set(["needs_response", "warning_needs_response"]);
      if (!STILL_SUBMITTABLE.has(stripeDispute.status)) {
        // Stripe accepted the submission despite our timeout — reconcile
        const completedAt = new Date().toISOString();
        const { error: staleSubErr } = await supabase
          .from("dispute_submissions")
          .update({
            status: "succeeded",
            stripe_response: stripeDispute as unknown as Record<string, unknown>,
            completed_at: completedAt,
          })
          .eq("id", prior.id);
        if (staleSubErr) {
          console.error("[WIN-20] Failed to persist submission success:", staleSubErr);
        }
        const { error: staleDispErr } = await supabase
          .from("disputes")
          .update({
            status: "evidence_submitted",
            evidence_submitted_at: completedAt,
          })
          .eq("id", localDispute.id);
        if (staleDispErr) {
          console.error("[WIN-20] Failed to persist submission success:", staleDispErr);
        }

        return NextResponse.json({
          data: {
            submission_id: prior.id,
            submitted_at: completedAt,
            dispute_status: stripeDispute.status,
            warnings: [],
          },
        });
      }

      // Stripe hasn't processed it — mark the stale row failed and try fresh.
      // Fall through to the guard and a new submission attempt below.
      await supabase
        .from("dispute_submissions")
        .update({
          status: "failed",
          error_code: "timeout_recovered",
          error_message: "Pending row expired; reclaimed for new attempt",
          completed_at: new Date().toISOString(),
        })
        .eq("id", prior.id);
    }

    // Step 8: Pre-submission guard
    const guard = evaluateSubmissionGuard({
      stripeDispute,
      playbook: playbook as unknown as import("@/lib/playbooks/types").PlaybookData,
      evidenceFiles,
      narrativeText,
    });

    if (guard.action === "block") {
      const statusCode =
        guard.blockCode === "dispute_not_submittable"
          ? 409
          : guard.blockCode === "validation_failed"
            ? 422
            : 400;
      return errorResponse(
        statusCode,
        guard.blockCode ?? "invalid_request",
        guard.blockMessage ?? "Submission blocked",
        guard.warnings,
      );
    }

    // Step 9: Build evidence payload
    // TODO(WIN-20 Task 7): replace with assembleEvidence() call
    const { evidence, warnings: mapperWarnings } = ((): never => {
      throw new Error(
        "evidence assembler not yet implemented — see docs/superpowers/plans/2026-04-12-win-20-evidence-submission.md Task 7",
      );
    })();
    // Unreachable — the throw above aborts Step 9. The references below keep
    // Task 9's re-wire simple without a massive diff.
    void stripeCharge;
    const allWarnings: SubmissionWarning[] = [...guard.warnings, ...mapperWarnings];

    // Guard already validated hasFiles || hasNarrative, but buildEvidencePayload
    // could produce an empty object if all file stripe_file_ids were empty strings.
    // Give a last-chance 422 rather than sending Stripe an empty update.
    if (Object.keys(evidence).length === 0) {
      return errorResponse(
        422,
        "validation_failed",
        "Add at least one piece of evidence or a narrative before submitting.",
        allWarnings,
      );
    }

    // Step 10: Insert pending submission row — idempotency key is a fresh UUID
    const idempotencyKey = randomUUID();
    const { data: insertedRow, error: insertErr } = await supabase
      .from("dispute_submissions")
      .insert({
        dispute_id: localDispute.id,
        idempotency_key: idempotencyKey,
        status: "pending",
        evidence_payload: evidence as unknown as Record<string, unknown>,
        warnings: allWarnings,
      })
      .select("id")
      .single();

    if (insertErr || !insertedRow) {
      // Unique constraint violation means another concurrent request won the race
      return errorResponse(
        409,
        "submission_in_progress",
        "A submission is already in flight. Please wait a moment.",
      );
    }
    const submissionId = (insertedRow as { id: string }).id;

    // Step 11: Call Stripe — retry once on transient errors
    let result: Stripe.Dispute;
    try {
      result = await submitDispute(
        accountId,
        stripeDisputeId,
        evidence,
        idempotencyKey,
      );
    } catch (err) {
      const isTransient =
        err instanceof Stripe.errors.StripeAPIError ||
        err instanceof Stripe.errors.StripeConnectionError;

      if (isTransient) {
        try {
          // Retry once with the same idempotency key — Stripe will deduplicate
          result = await submitDispute(
            accountId,
            stripeDisputeId,
            evidence,
            idempotencyKey,
          );
        } catch (retryErr) {
          return await failSubmission(submissionId, retryErr, allWarnings);
        }
      } else {
        return await failSubmission(submissionId, err, allWarnings);
      }
    }

    // Step 12: Persist success — update both submissions and disputes rows
    const completedAt = new Date().toISOString();
    const { error: subErr } = await supabase
      .from("dispute_submissions")
      .update({
        status: "succeeded",
        stripe_response: result as unknown as Record<string, unknown>,
        completed_at: completedAt,
      })
      .eq("id", submissionId);
    if (subErr) {
      console.error("[WIN-20] Failed to persist submission success:", subErr);
    }

    const { error: dispErr } = await supabase
      .from("disputes")
      .update({
        status: "evidence_submitted",
        evidence_submitted_at: completedAt,
      })
      .eq("id", localDispute.id);
    if (dispErr) {
      console.error("[WIN-20] Failed to persist submission success:", dispErr);
    }

    return NextResponse.json({
      data: {
        submission_id: submissionId,
        submitted_at: completedAt,
        dispute_status: result.status,
        warnings: allWarnings,
      },
    });
  },
);
