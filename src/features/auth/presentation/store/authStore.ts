import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession } from '../../domain/entities/AuthSession';

type Role = 'admin' | 'coordinator';

interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession, role: Role) => void;
  logout: () => void;
}

/**
 * Store global de sesión. Persiste en localStorage bajo la clave
 * "auth-storage" (la misma que lee shared/api/httpClient.ts).
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      tokenType: null,
      role: null,
      isAuthenticated: false,

      setSession: (session, role) =>
        set({
          accessToken: session.accessToken,
          tokenType: session.tokenType,
          role,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          tokenType: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // clave en localStorage
    }
  )
);