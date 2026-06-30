import type { LoginResponseDTO } from '../dto/LoginDTO';
import type { AuthSession } from '../../domain/entities/AuthSession';

/**
 * Mapper: traduce entre la forma de la API (DTO) y la forma de dominio (Entity).
 * Si la API cambia sus nombres de campo, solo se toca este archivo.
 */
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