import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUseCase } from '../../domain/useCases/LoginUseCase';
import { useAuthStore } from '../store/authStore';
import { ApiError } from '../../../../shared/api/httpClient';

import type { Role } from '../../domain/entities/User';

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

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

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const session = await loginUseCase(email, password);
      
      let role: Role = 'Admin';
      let userName: string = email.split('@')[0];

      if (session.user && session.user.role) {
        role = (session.user.role as Role);
        userName = session.user.name || userName;
      } else {
        const payload = parseJwt(session.accessToken);
        if (payload?.roles && payload.roles.length > 0) {
          role = payload.roles[0] as Role;
        } else if (payload?.sub) {
          // Fallback if needed
        }
      }
      
      // Normalize role name
      if (typeof role === 'string') {
        const lowerRole = role.toLowerCase();
        if (lowerRole.includes('admin')) role = 'Admin';
        else if (lowerRole.includes('coord')) role = 'Coordinador';
        else if (lowerRole.includes('analist')) role = 'Analista';
        else if (lowerRole.includes('brigad')) role = 'Brigadista';
      }
      
      setSession(session, role, userName);

      if (role === 'Admin') {
        navigate('/admin/usuarios');
      } else {
        navigate('/coordinator/dashboard');
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