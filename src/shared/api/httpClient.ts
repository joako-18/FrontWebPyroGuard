import { ENV } from '../config/env';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

interface RequestOptions extends RequestInit {
    skipAuth?: boolean;
    baseUrlOverride?: string;
}

interface FastApiValidationError {
  detail?:
    | Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
      }>
    | string;
}

function extractErrorMessage(body: unknown, status: number): string {
  const fastApiBody = body as FastApiValidationError;

  if (!fastApiBody?.detail) {
    return `Error en la petición (${status})`;
  }

  if (typeof fastApiBody.detail === 'string') {
    return fastApiBody.detail;
  }

  if (Array.isArray(fastApiBody.detail)) {
    return fastApiBody.detail
      .map((e) => {
        const field = e.loc?.[e.loc.length - 1] ?? 'campo';
        return `${field}: ${e.msg}`;
      })
      .join(' | ');
  }

  return `Error en la petición (${status})`;
}

function getStoredToken(): string | null {
  try {
    const raw = localStorage.getItem('auth-storage');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.accessToken ?? null;
  } catch {
    return null;
  }
}

export async function httpClient<TResponse>(
  path: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const { skipAuth, headers, baseUrlOverride, ...rest } = options;

  const finalHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (!skipAuth) {
    const token = getStoredToken();
    if (token) {
      (finalHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const base = baseUrlOverride ?? ENV.API_BASE_URL;

  const response = await fetch(`${base}${path}`, {
    ...rest,
    headers: finalHeaders,
  });

  let body: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    const message = extractErrorMessage(body, response.status);
    throw new ApiError(message, response.status, body);
  }

  return body as TResponse;
}