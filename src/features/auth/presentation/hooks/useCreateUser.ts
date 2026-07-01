import { useState } from 'react';
import { registerUserUseCase } from '../../domain/useCases/RegisterUserUseCase';
import type { User, Role } from '../../domain/entities/User';
import { ApiError } from '../../../../shared/api/httpClient';

export function useCreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createUser(
    name: string,
    email: string,
    password: string,
    role: Role
  ): Promise<User | null> {
    setIsLoading(true);
    setError(null);

    try {
      const user = await registerUserUseCase(name, email, password, role);
      return user;
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setError('Ya existe un usuario con ese correo electrónico.');
        } else if (err.status === 400 || err.status === 422) {
          setError('Revisa los datos del formulario. ' + err.message);
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado. Intenta de nuevo.');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { createUser, isLoading, error };
}