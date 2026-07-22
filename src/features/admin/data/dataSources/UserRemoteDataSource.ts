import { httpClient } from '../../../../shared/api/httpClient';
import type {
  UserDTO,
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
  DeleteUserResponseDTO,
} from '../dto/UserDTO';
import { ENV } from '../../../../shared/config/env';

export const UserRemoteDataSource = {
  async getAll(role?: string): Promise<UserDTO[]> {
    const url = role ? `/auth/internal/users?rol=${role}` : '/auth/internal/users';
    return httpClient<UserDTO[]>(url, {
      method: 'GET',
      headers: {
        'x-api-key': ENV.API_KEY_INTERNAL,
      },
      baseUrlOverride: 'https://pyroguard.inode.cloud',
    });
  },

  async update(id: string, data: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> {
    return httpClient<UpdateUserResponseDTO>(`/auth/internal/users/${id}/rol`, {
      method: 'PUT',
      body: JSON.stringify({ rol: data.rol }), // El endpoint sólo espera el rol
      headers: {
        'x-api-key': ENV.API_KEY_INTERNAL,
      },
      baseUrlOverride: 'https://pyroguard.inode.cloud',
    });
  },

  async delete(id: string): Promise<DeleteUserResponseDTO> {
    return httpClient<DeleteUserResponseDTO>(`/auth/internal/users/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': ENV.API_KEY_INTERNAL,
      },
      baseUrlOverride: 'https://pyroguard.inode.cloud',
    });
  },
};