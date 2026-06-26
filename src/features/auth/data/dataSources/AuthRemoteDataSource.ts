import { httpClient } from '../../../../shared/api/httpClient';
import type { LoginRequestDTO, LoginResponseDTO } from '../dto/LoginDTO';
import type { RegisterRequestDTO, RegisterResponseDTO } from '../dto/RegisterDTO';

/**
 * DataSource: responsable ÚNICAMENTE de saber CÓMO hablar con la API.
 * No conoce entidades de dominio ni lógica de negocio.
 */
export const AuthRemoteDataSource = {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    // FastAPI con OAuth2PasswordRequestForm espera
    // application/x-www-form-urlencoded, NO JSON.
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return httpClient<LoginResponseDTO>('/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      skipAuth: true, // todavía no hay token al loguearse
    });
  },

  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    // Este endpoint sí recibe JSON normal (no form-urlencoded como login).
    return httpClient<RegisterResponseDTO>('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      // No se manda skipAuth: si el admin está logueado, el token
      // se adjunta automáticamente (la API probablemente requiere
      // estar autenticado como admin para crear usuarios).
    });
  },
};