/**
 * Entidad de dominio: representa el concepto de negocio "Usuario"
 * desde la perspectiva del panel de administración.
 *
 * Se llama AdminUser (no User) para no chocar con la entidad User
 * del feature de auth (que representa al usuario recién registrado).
 */

export type Role = 'Admin' | 'Coordinador' | 'Analista' | 'Brigadista';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}