import type { UserDTO } from '../dto/UserDTO';
import type { AdminUser, Role } from '../../domain/entities/AdminUser';

export const AdminUserMapper = {
  toDomain(dto: UserDTO): AdminUser {
    const roleString = (dto.roles && dto.roles.length > 0) ? dto.roles[0] : (dto.rol || 'Sin Rol');
    return {
      id: dto.id_usuario,
      name: dto.nombre,
      email: dto.email,
      role: roleString as Role,
      isActive: dto.activo ?? true,
      createdAt: dto.creado_en ?? new Date().toISOString(),
    };
  },

  toDomainList(dtos: UserDTO[]): AdminUser[] {
    return dtos.map(AdminUserMapper.toDomain);
  },
};