import { httpClient } from '../../../../shared/api/httpClient';
import { ENV } from '../../../../shared/config/env';
import type { LoginRequestDTO, LoginResponseDTO } from '../dto/LoginDTO';
import type { RegisterRequestDTO, RegisterResponseDTO } from '../dto/RegisterDTO';

export const AuthRemoteDataSource = {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    return httpClient<LoginResponseDTO>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
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