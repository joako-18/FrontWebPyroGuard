/**
 * DTOs = forma EXACTA de los datos como los envía/recibe la API.
 * No deben usarse directamente en la UI; para eso existen las entidades
 * de dominio (ver domain/entities) y el mapper que las traduce.
 */

/** Body que se envía a POST /v1/auth/login */
export interface LoginRequestDTO {
  username: string; // la API pide "username" aunque conceptualmente sea un correo
  password: string;
}

/** Respuesta cruda de POST /v1/auth/login */
export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
  usuario?: {
    id_usuario: string;
    nombre: string;
    email: string;
    rol: string;
    activo: boolean;
    creado_en: string;
  };
}