import type { LoginResponseDTO } from '../dto/LoginDTO';
import type { AuthSession } from '../../domain/entities/AuthSession';

export const AuthMapper = {
  toDomain(dto: LoginResponseDTO): AuthSession {
    const userRole = dto.rol || dto.usuario?.rol || '';
    return {
      accessToken: dto.access_token,
      tokenType: dto.token_type,
      user: {
        id: dto.usuario?.id_usuario || '',
        name: dto.usuario?.nombre || '',
        role: userRole,
      },
    };
  },
};