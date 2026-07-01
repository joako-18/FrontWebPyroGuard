import type { UserDTO } from '../dto/UserDTO';
import type { AdminUser, Role } from '../../domain/entities/AdminUser';

export const AdminUserMapper = {
  toDomain(dto: UserDTO): AdminUser {
    return {
      id: dto.id_usuario,
      name: dto.nombre,
      email: dto.email,
      role: dto.rol as Role,
      isActive: dto.activo,
      createdAt: dto.creado_en,
    };
  },

  toDomainList(dtos: UserDTO[]): AdminUser[] {
    return dtos.map(AdminUserMapper.toDomain);
  },
};