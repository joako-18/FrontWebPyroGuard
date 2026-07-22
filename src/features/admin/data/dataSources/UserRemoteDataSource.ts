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
    const url = role ? `/internal/users?rol=${role}` : '/internal/users';
    return httpClient<UserDTO[]>(url, {
      method: 'GET',
      headers: {
        'x-api-key': ENV.API_KEY_INTERNAL,
      },
      baseUrlOverride: 'https://pyroguard.inode.cloud',
    });
  },

  async update(id: string, data: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> {
    return httpClient<UpdateUserResponseDTO>(`/v1/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<DeleteUserResponseDTO> {
    return httpClient<DeleteUserResponseDTO>(`/v1/usuarios/${id}`, {
      method: 'DELETE',
    });
  },
};