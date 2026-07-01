import type { RegisterResponseDTO } from '../dto/RegisterDTO';
import type { User, Role } from '../../domain/entities/User';

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