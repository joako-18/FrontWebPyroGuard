/**
 * Entidad de dominio: representa el concepto de negocio "Usuario",
 * sin saber nada de cómo la API lo modela (eso es responsabilidad del mapper).
 *
 * Roles reales soportados por el backend (ver RegisterDTO.ts):
 * Admin | Coordinador | Analista | Brigadista
 */

export type Role = 'Admin' | 'Coordinador' | 'Analista' | 'Brigadista';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}