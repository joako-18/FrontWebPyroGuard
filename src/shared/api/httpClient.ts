import { ENV } from '../config/env';

/**
 * Error tipado para fallos de la API.
 * Permite a las capas superiores (useCases, hooks) reaccionar
 * según el status code sin parsear strings.
 */
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
  /** Si es true, no se adjunta el header Authorization aunque exista token */
  skipAuth?: boolean;
  /** Permite apuntar a un dominio distinto al de ENV.API_BASE_URL (ej. servicio de ML) */
  baseUrlOverride?: string;
}

/** Forma típica de error de validación 422 de FastAPI */
interface FastApiValidationError {
  detail?:
    | Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
      }>
    | string;
}

/**
 * Convierte el cuerpo de error de FastAPI en un mensaje legible.
 * FastAPI manda `detail` como string en errores simples (401, 404, etc.)
 * pero como ARRAY de objetos en errores de validación 422.
 */
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

/**
 * Devuelve el token guardado en localStorage (clave usada por el authStore).
 */
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

/**
 * Cliente HTTP centralizado. Todas las dataSources de la app deben
 * usar esta función en vez de fetch directo.
 * Por defecto apunta a ENV.API_BASE_URL; pasa `baseUrlOverride` para
 * hablar con otros dominios (ej. el servicio de ML en ENV.ML_API_BASE_URL).
 */
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