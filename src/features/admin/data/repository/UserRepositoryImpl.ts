import type { IUserRepository } from '../../domain/repository/UserRepository';
import type { AdminUser, Role } from '../../domain/entities/AdminUser';
import { UserRemoteDataSource } from '../dataSources/UserRemoteDataSource';
import { AdminUserMapper } from '../mappers/AdminUserMapper';

export const UserRepositoryImpl: IUserRepository = {
  async getAll(): Promise<AdminUser[]> {
    const dtos = await UserRemoteDataSource.getAll();
    return AdminUserMapper.toDomainList(dtos);
  },

  async update(id: string, role: Role, isActive: boolean): Promise<AdminUser> {
    const dto = await UserRemoteDataSource.update(id, { rol: role, activo: isActive });
    return AdminUserMapper.toDomain(dto);
  },

  async delete(id: string): Promise<string> {
    return UserRemoteDataSource.delete(id);
  },
};