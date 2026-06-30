import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession } from '../../domain/entities/AuthSession';

import type { Role } from '../../domain/entities/User';

interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  role: Role | null;
  userName: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession, role: Role, userName: string) => void;
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
      userName: null,
      isAuthenticated: false,

      setSession: (session, role, userName) =>
        set({
          accessToken: session.accessToken,
          tokenType: session.tokenType,
          role,
          userName,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          accessToken: null,
          tokenType: null,
          role: null,
          userName: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage', // clave en localStorage
    }
  )
);