import type { IUserRepository } from '../repository/UserRepository';
import type { AdminUser, Role } from '../entities/AdminUser';
import { UserRepositoryImpl } from '../../data/repository/UserRepositoryImpl';

const VALID_ROLES: Role[] = ['Admin', 'Coordinador', 'Analista', 'Brigadista'];

/**
 * Caso de uso: actualizar rol y/o estado activo de un usuario.
 * El endpoint PUT /v1/usuarios/{id} solo permite cambiar estos dos campos.
 */
export function createUpdateUserUseCase(repository: IUserRepository = UserRepositoryImpl) {
  return async function updateUserUseCase(
    id: string,
    role: Role,
    isActive: boolean
  ): Promise<AdminUser> {
    if (!id) {
      throw new Error('El identificador del usuario es obligatorio.');
    }

    if (!VALID_ROLES.includes(role)) {
      throw new Error('El rol seleccionado no es válido.');
    }

    return repository.update(id, role, isActive);
  };
}

export const updateUserUseCase = createUpdateUserUseCase();