
export type Role = 'Admin' | 'Coordinador' | 'Analista' | 'Brigadista';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}