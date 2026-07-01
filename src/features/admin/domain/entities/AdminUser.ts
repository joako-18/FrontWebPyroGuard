
export type Role = 'Admin' | 'Coordinador' | 'Analista' | 'Brigadista';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}