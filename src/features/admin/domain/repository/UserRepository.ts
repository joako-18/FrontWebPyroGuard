import type { AdminUser, Role } from '../entities/AdminUser';

export interface IUserRepository {
  getAll(role?: string): Promise<AdminUser[]>;
  update(id: string, role: Role, isActive: boolean): Promise<AdminUser>;
  delete(id: string): Promise<string>;
}