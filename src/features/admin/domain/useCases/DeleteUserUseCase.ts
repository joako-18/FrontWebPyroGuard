import type { IUserRepository } from '../repository/UserRepository';
import { UserRepositoryImpl } from '../../data/repository/UserRepositoryImpl';

export function createDeleteUserUseCase(repository: IUserRepository = UserRepositoryImpl) {
  return async function deleteUserUseCase(id: string): Promise<string> {
    if (!id) {
      throw new Error('El identificador del usuario es obligatorio.');
    }
    return repository.delete(id);
  };
}

export const deleteUserUseCase = createDeleteUserUseCase();