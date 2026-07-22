import { httpClient } from '../../../../shared/api/httpClient';
import type {
  CreateAnnouncementRequestDTO,
  CreateEmergencyAnnouncementRequestDTO,
  AnnouncementDTO,
  DeleteAnnouncementResponseDTO,
} from '../dto/AnnouncementDTO';

export const AnnouncementRemoteDataSource = {
  async create(data: CreateAnnouncementRequestDTO): Promise<AnnouncementDTO> {
    return httpClient<AnnouncementDTO>('/v1/comunicados', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async createEmergency(data: CreateEmergencyAnnouncementRequestDTO): Promise<AnnouncementDTO> {
    return httpClient<AnnouncementDTO>('/v1/comunicados/emergencia', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAll(): Promise<AnnouncementDTO[]> {
    return httpClient<AnnouncementDTO[]>('/v1/comunicados', {
      method: 'GET',
    });
  },

  async delete(id: string): Promise<DeleteAnnouncementResponseDTO> {
    return httpClient<DeleteAnnouncementResponseDTO>(`/v1/comunicados/${id}`, {
      method: 'DELETE',
    });
  },
};