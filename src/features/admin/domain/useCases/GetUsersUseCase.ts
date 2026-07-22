import type { IUserRepository } from '../repository/UserRepository';
import type { AdminUser } from '../entities/AdminUser';
import { UserRepositoryImpl } from '../../data/repository/UserRepositoryImpl';

export function createGetUsersUseCase(repository: IUserRepository = UserRepositoryImpl) {
  return async function getUsersUseCase(role?: string): Promise<AdminUser[]> {
    return repository.getAll(role);
  };
}

export const getUsersUseCase = createGetUsersUseCase();