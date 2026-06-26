import type { RegisterResponseDTO } from '../dto/RegisterDTO';
import type { User, Role } from '../../domain/entities/User';

/**
 * Mapper: traduce entre la forma de la API (DTO) y la forma de dominio (Entity).
 * Si la API cambia sus nombres de campo, solo se toca este archivo.
 */
export const UserMapper = {
  toDomain(dto: RegisterResponseDTO): User {
    return {
      id: dto.id_usuario,
      name: dto.nombre,
      email: dto.email,
      role: dto.rol as Role,
      isActive: dto.activo,
      createdAt: dto.creado_en,
    };
  },
};