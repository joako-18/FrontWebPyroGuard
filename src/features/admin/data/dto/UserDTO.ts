
export interface UserDTO {
  id_usuario: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  creado_en: string;
}

export interface UpdateUserRequestDTO {
  rol: string;
  activo: boolean;
}

export type UpdateUserResponseDTO = UserDTO;

export type DeleteUserResponseDTO = string;