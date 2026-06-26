import { httpClient } from '../../../../shared/api/httpClient';
import type {
  UserDTO,
  UpdateUserRequestDTO,
  UpdateUserResponseDTO,
  DeleteUserResponseDTO,
} from '../dto/UserDTO';

/**
 * DataSource: responsable ÚNICAMENTE de saber CÓMO hablar con la API
 * para el dominio de Gestión de Usuarios (Admin).
 */
export const UserRemoteDataSource = {
  async getAll(): Promise<UserDTO[]> {
    return httpClient<UserDTO[]>('/v1/usuarios/', {
      method: 'GET',
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