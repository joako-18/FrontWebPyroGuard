import { httpClient } from '../../../../shared/api/httpClient';
import type { LoginRequestDTO, LoginResponseDTO } from '../dto/LoginDTO';
import type { RegisterRequestDTO, RegisterResponseDTO } from '../dto/RegisterDTO';

export const AuthRemoteDataSource = {
  async login(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    
    
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return httpClient<LoginResponseDTO>('/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
      skipAuth: true, 
      baseUrlOverride: 'https://pyroguard.inode.cloud',
    });
  },

  async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    
    return httpClient<RegisterResponseDTO>('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      
      
      
    });
  },
};