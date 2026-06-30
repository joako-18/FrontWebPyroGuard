/**
 * Entidad de dominio: representa el concepto de negocio "sesión autenticada",
 * sin saber nada de cómo la API lo modela (eso es responsabilidad del mapper).
 */
export interface AuthSession {
  accessToken: string;
  tokenType: string;
  user?: {
    id: string;
    name: string;
    role: string;
  };
}