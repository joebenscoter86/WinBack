import fetchStripeSignature from '@stripe/ui-extension-sdk/signature';
import type { ExtensionContextValue } from '@stripe/ui-extension-sdk/context';

// Toggle for local development: set to true when running `stripe apps start`
const USE_LOCAL_BACKEND = true;

const BACKEND_URL = USE_LOCAL_BACKEND
  ? 'http://localhost:3000'
  : 'https://winbackpay.com';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Makes an authenticated request to the WinBack backend.
 * Automatically includes Stripe App signature and identity fields.
 */
export async function fetchBackend<T = unknown>(
  path: string,
  context: ExtensionContextValue,
  data?: Record<string, unknown>,
): Promise<T> {
  const signature = await fetchStripeSignature();

  const body = JSON.stringify({
    ...data,
    user_id: context.userContext?.id,
    account_id: context.userContext?.account.id,
  });

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
    },
    body,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new ApiError(
      error.error || error.message || `API error: ${response.status}`,
      response.status,
      error.code,
    );
  }
  return response.json() as Promise<T>;
}

/**
 * Makes an authenticated PATCH request to the WinBack backend.
 */
export async function patchBackend<T = unknown>(
  path: string,
  context: ExtensionContextValue,
  data: Record<string, unknown>,
): Promise<T> {
  const signature = await fetchStripeSignature();

  const body = JSON.stringify({
    ...data,
    user_id: context.userContext?.id,
    account_id: context.userContext?.account.id,
  });

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
    },
    body,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new ApiError(
      error.error || error.message || `API error: ${response.status}`,
      response.status,
      error.code,
    );
  }
  return response.json() as Promise<T>;
}

/**
 * Makes an authenticated POST request to a "delete" endpoint on the WinBack backend.
 * Uses POST because Stripe App signature verification requires a body,
 * and some proxies strip bodies from DELETE requests.
 */
export async function deleteBackend<T = unknown>(
  path: string,
  context: ExtensionContextValue,
): Promise<T> {
  const signature = await fetchStripeSignature();

  const body = JSON.stringify({
    user_id: context.userContext?.id,
    account_id: context.userContext?.account.id,
  });

  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
    },
    body,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new ApiError(
      error.error || error.message || `API error: ${response.status}`,
      response.status,
      error.code,
    );
  }
  return response.json() as Promise<T>;
}
