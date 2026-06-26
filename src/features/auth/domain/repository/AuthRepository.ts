import type { AuthSession } from '../entities/AuthSession';
import type { User, Role } from '../entities/User';

/**
 * Contrato de dominio: define QUÉ se puede hacer, no CÓMO.
 * La implementación concreta vive en data/repository/AuthRepositoryImpl.ts
 */
export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthSession>;
  register(name: string, email: string, password: string, role: Role): Promise<User>;
}