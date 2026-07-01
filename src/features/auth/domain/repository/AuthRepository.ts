import type { AuthSession } from '../entities/AuthSession';
import type { User, Role } from '../entities/User';

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthSession>;
  register(name: string, email: string, password: string, role: Role): Promise<User>;
}