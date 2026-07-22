
export interface LoginRequestDTO {
  email: string; 
  password: string;
}

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