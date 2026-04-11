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
      error.message || `API error: ${response.status}`,
      response.status,
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
      error.message || error.error || `API error: ${response.status}`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}

/**
 * Makes an authenticated DELETE request to the WinBack backend.
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
    method: 'DELETE',
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
      error.message || error.error || `API error: ${response.status}`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}
