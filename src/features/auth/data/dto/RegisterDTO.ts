
export type RoleDTO = 'Admin' | 'Coordinador' | 'Analista' | 'Brigadista';

export interface RegisterRequestDTO {
  nombre: string;
  email: string;
  password: string;
  rol: RoleDTO;
}

export interface RegisterResponseDTO {
  id_usuario: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  creado_en: string;
}