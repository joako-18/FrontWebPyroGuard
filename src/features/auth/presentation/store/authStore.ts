import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession } from '../../domain/entities/AuthSession';

import type { Role } from '../../domain/entities/User';

interface AuthState {
  accessToken: string | null;
  tokenType: string | null;
  role: Role | null;
  userName: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession, role: Role, userName: string, userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      tokenType: null,
      role: null,
      userName: null,
      userId: null,
      isAuthenticated: false,

      setSession: (session, role, userName, userId) =>
        set({
          accessToken: session.accessToken,
          tokenType: session.tokenType,
          role,
          userName,
          userId,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          accessToken: null,
          tokenType: null,
          role: null,
          userName: null,
          userId: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('payment_status');
        localStorage.removeItem('payment_id');
        localStorage.removeItem('payment_method');
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);