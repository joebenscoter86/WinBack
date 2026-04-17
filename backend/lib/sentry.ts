import * as Sentry from "@sentry/nextjs";

export interface RouteErrorContext {
  route: string;
  disputeId?: string;
  generationId?: string;
  requestId?: string;
  extra?: Record<string, unknown>;
}

/**
 * Capture an error from an API route with WinBack-specific context.
 * Merchant identity (account_id, user_id) is set on the scope by withStripeAuth,
 * so it propagates automatically.
 */
export function captureRouteError(error: unknown, context: RouteErrorContext): void {
  Sentry.withScope((scope) => {
    scope.setTag("route", context.route);
    if (context.disputeId) scope.setTag("dispute_id", context.disputeId);
    if (context.generationId) scope.setTag("generation_id", context.generationId);
    if (context.requestId) scope.setTag("request_id", context.requestId);
    if (context.extra) scope.setContext("route_extra", context.extra);
    Sentry.captureException(error);
  });
}
