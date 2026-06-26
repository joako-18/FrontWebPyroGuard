import type { IAuthRepository } from '../../domain/repository/AuthRepository';
import type { AuthSession } from '../../domain/entities/AuthSession';
import type { User, Role } from '../../domain/entities/User';
import { AuthRemoteDataSource } from '../dataSources/AuthRemoteDataSource';
import { AuthMapper } from '../mappers/AuthMapper';
import { UserMapper } from '../mappers/UserMapper';

/**
 * Implementación concreta: orquesta dataSource + mapper.
 * Es lo único que conoce tanto el DTO como la Entity.
 */
export const AuthRepositoryImpl: IAuthRepository = {
  async login(email: string, password: string): Promise<AuthSession> {
    const dto = await AuthRemoteDataSource.login({ username: email, password });
    return AuthMapper.toDomain(dto);
  },

  async register(name: string, email: string, password: string, role: Role): Promise<User> {
    const dto = await AuthRemoteDataSource.register({
      nombre: name,
      email,
      password,
      rol: role,
    });
    return UserMapper.toDomain(dto);
  },
};