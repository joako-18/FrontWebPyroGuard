import type { IAuthRepository } from '../repository/AuthRepository';
import type { AuthSession } from '../entities/AuthSession';
import { AuthRepositoryImpl } from '../../data/repository/AuthRepositoryImpl';

export function createLoginUseCase(repository: IAuthRepository = AuthRepositoryImpl) {
  return async function loginUseCase(email: string, password: string): Promise<AuthSession> {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      throw new Error('Correo y contraseña son obligatorios.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error('El correo electrónico no tiene un formato válido.');
    }

    return repository.login(trimmedEmail, password);
  };
}

export const loginUseCase = createLoginUseCase();