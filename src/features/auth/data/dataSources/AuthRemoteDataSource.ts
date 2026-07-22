import { httpClient } from '../../../../shared/api/httpClient';
import { ENV } from '../../../../shared/config/env';
import type { LoginRequestDTO, LoginResponseDTO } from '../dto/LoginDTO';
import type { RegisterRequestDTO, RegisterResponseDTO } from '../dto/RegisterDTO';

export const AuthRemoteDataSource = {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    
    
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return httpClient<LoginResponseDTO>('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      skipAuth: true, 
      baseUrlOverride: ENV.API_BASE_URL_LOGIN,
    });
  },

  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    
    return httpClient<RegisterResponseDTO>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
      baseUrlOverride: ENV.API_BASE_URL_LOGIN,
      skipAuth: true,
    });
  },
};