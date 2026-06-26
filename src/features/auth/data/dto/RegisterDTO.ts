/**
 * DTOs = forma EXACTA de los datos como los envía/recibe la API
 * para el endpoint POST /v1/auth/register.
 *
 * IMPORTANTE: el backend valida `rol` contra el patrón regex
 * ^(Admin|Coordinador|Analista|Brigadista)$
 * "Admin" es el valor real para el rol de administrador (no "Administrador").
 */

export type RoleDTO = 'Admin' | 'Coordinador' | 'Analista' | 'Brigadista';

/** Body que se envía a POST /v1/auth/register */
export interface RegisterRequestDTO {
  nombre: string;
  email: string;
  password: string;
  rol: RoleDTO;
}

/** Respuesta cruda de POST /v1/auth/register */
export interface RegisterResponseDTO {
  id_usuario: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  creado_en: string;
}