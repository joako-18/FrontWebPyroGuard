import type { IUserRepository } from '../repository/UserRepository';
import type { AdminUser } from '../entities/AdminUser';
import { UserRepositoryImpl } from '../../data/repository/UserRepositoryImpl';

/**
 * Caso de uso: obtener la lista completa de usuarios.
 */
export function createGetUsersUseCase(repository: IUserRepository = UserRepositoryImpl) {
  return async function getUsersUseCase(): Promise<AdminUser[]> {
    return repository.getAll();
  };
}

export const getUsersUseCase = createGetUsersUseCase();