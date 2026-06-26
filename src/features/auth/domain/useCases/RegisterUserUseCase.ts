import type { IAuthRepository } from '../repository/AuthRepository';
import type { User, Role } from '../entities/User';
import { AuthRepositoryImpl } from '../../data/repository/AuthRepositoryImpl';

const VALID_ROLES: Role[] = ['Admin', 'Coordinador', 'Analista', 'Brigadista'];

/**
 * Caso de uso: contiene la lógica de negocio pura del registro de usuarios.
 * Las validaciones de formato/negocio viven aquí, no en el componente de UI.
 */
export function createRegisterUserUseCase(repository: IAuthRepository = AuthRepositoryImpl) {
  return async function registerUserUseCase(
    name: string,
    email: string,
    password: string,
    role: Role
  ): Promise<User> {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      throw new Error('El nombre es obligatorio.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error('El correo electrónico no tiene un formato válido.');
    }

    if (password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    if (!VALID_ROLES.includes(role)) {
      throw new Error('El rol seleccionado no es válido.');
    }

    return repository.register(trimmedName, trimmedEmail, password, role);
  };
}

export const registerUserUseCase = createRegisterUserUseCase();