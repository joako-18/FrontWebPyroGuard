import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUseCase } from '../../domain/useCases/LoginUseCase';
import { useAuthStore } from '../store/authStore';
import { ApiError } from '../../../../shared/api/httpClient';

type Role = 'admin' | 'coordinator';

/**
 * Hook de presentación: es el ÚNICO puente entre la UI (Login.tsx)
 * y la capa de dominio (useCase). El componente no sabe nada de
 * fetch, tokens, ni stores; solo llama a `login(email, password, role)`.
 */
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  async function login(email: string, password: string, role: Role) {
    setIsLoading(true);
    setError(null);

    try {
      const session = await loginUseCase(email, password);
      setSession(session, role);

      if (role === 'admin') {
        navigate('/admin/usuarios');
      } else {
        navigate('/coordinator/brigadas');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401 || err.status === 400) {
          setError('Correo o contraseña incorrectos.');
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}