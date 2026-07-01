import type { LoginResponseDTO } from '../dto/LoginDTO';
import type { AuthSession } from '../../domain/entities/AuthSession';

export const AuthMapper = {
  toDomain(dto: LoginResponseDTO): AuthSession {
    return {
      accessToken: dto.access_token,
      tokenType: dto.token_type,
      user: dto.usuario ? {
        id: dto.usuario.id_usuario,
        name: dto.usuario.nombre,
        role: dto.usuario.rol,
      } : undefined,
    };
  },
};