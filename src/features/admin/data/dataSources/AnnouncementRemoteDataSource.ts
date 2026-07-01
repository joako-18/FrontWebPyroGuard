import { httpClient } from '../../../../shared/api/httpClient';
import type {
  CreateAnnouncementRequestDTO,
  AnnouncementDTO,
  DeleteAnnouncementResponseDTO,
} from '../dto/AnnouncementDTO';

export const AnnouncementRemoteDataSource = {
  async create(data: CreateAnnouncementRequestDTO): Promise<AnnouncementDTO> {
    return httpClient<AnnouncementDTO>('/v1/comunicados/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getActive(): Promise<AnnouncementDTO[]> {
    return httpClient<AnnouncementDTO[]>('/v1/comunicados/activos', {
      method: 'GET',
    });
  },

  async getHistory(): Promise<AnnouncementDTO[]> {
    return httpClient<AnnouncementDTO[]>('/v1/comunicados/historial', {
      method: 'GET',
    });
  },

  async delete(id: string): Promise<DeleteAnnouncementResponseDTO> {
    return httpClient<DeleteAnnouncementResponseDTO>(`/v1/comunicados/${id}`, {
      method: 'DELETE',
    });
  },
};