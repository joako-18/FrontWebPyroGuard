/**
 * DTOs = forma EXACTA de los datos como los envía/recibe la API
 * para los endpoints de Gestión de Usuarios (Admin): /v1/usuarios
 */

/** Item devuelto por GET /v1/usuarios/ */
export interface UserDTO {
  id_usuario: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  creado_en: string;
}

/** Body que se envía a PUT /v1/usuarios/{id_usuario} */
export interface UpdateUserRequestDTO {
  rol: string;
  activo: boolean;
}

/** Respuesta de PUT /v1/usuarios/{id_usuario} (mismo shape que UserDTO) */
export type UpdateUserResponseDTO = UserDTO;

/** Respuesta de DELETE /v1/usuarios/{id_usuario} — la API devuelve un string suelto */
export type DeleteUserResponseDTO = string;