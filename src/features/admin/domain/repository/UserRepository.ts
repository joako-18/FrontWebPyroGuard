import type { AdminUser, Role } from '../entities/AdminUser';

/**
 * Contrato de dominio: define QUÉ se puede hacer, no CÓMO.
 * La implementación concreta vive en data/repository/UserRepositoryImpl.ts
 */
export interface IUserRepository {
  getAll(): Promise<AdminUser[]>;
  update(id: string, role: Role, isActive: boolean): Promise<AdminUser>;
  delete(id: string): Promise<string>;
}