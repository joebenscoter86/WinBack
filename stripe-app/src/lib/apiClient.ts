import fetchStripeSignature from '@stripe/ui-extension-sdk/signature';

// Matches connect-src in stripe-app.json CSP. For local dev, update CSP to localhost.
const BACKEND_URL = 'https://winback-api.vercel.app';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchBackend<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const signature = await fetchStripeSignature();
  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': signature,
      ...options?.headers,
    },
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
