import { httpClient } from '../../../../shared/api/httpClient';
import type { BrigadeDTO, CreateBrigadeRequestDTO, AssignMemberRequestDTO } from '../dto/BrigadeDTO';
import type { InterventionDTO, CreateInterventionRequestDTO, UpdateInterventionRequestDTO } from '../dto/InterventionDTO';

export interface MinimalUserDTO {
  id_usuario: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  creado_en: string;
}

const API_BASE_URL = 'https://pyroguard.inode.cloud/api/v1';

export class OperationsRemoteDataSource {
  async getBrigadistas(): Promise<MinimalUserDTO[]> {
    return httpClient<MinimalUserDTO[]>('/usuarios/?rol=Brigadista', { baseUrlOverride: API_BASE_URL });
  }

  async getBrigades(): Promise<BrigadeDTO[]> {
    return httpClient<BrigadeDTO[]>('/brigadas', { baseUrlOverride: API_BASE_URL });
  }

  async createBrigade(request: CreateBrigadeRequestDTO): Promise<BrigadeDTO> {
    return httpClient<BrigadeDTO>('/brigadas', {
      method: 'POST',
      body: JSON.stringify(request),
      baseUrlOverride: API_BASE_URL,
    });
  }

  async assignMember(id_brigada: string, request: AssignMemberRequestDTO): Promise<string> {
    return httpClient<string>(`/brigadas/${id_brigada}/miembros`, {
      method: 'POST',
      body: JSON.stringify(request),
      baseUrlOverride: API_BASE_URL,
    });
  }

  async createIntervention(request: CreateInterventionRequestDTO): Promise<InterventionDTO> {
    return httpClient<InterventionDTO>('/operaciones/intervenciones', {
      method: 'POST',
      body: JSON.stringify(request),
      baseUrlOverride: API_BASE_URL,
    });
  }

  async updateIntervention(id_intervencion: string, request: UpdateInterventionRequestDTO): Promise<InterventionDTO> {
    return httpClient<InterventionDTO>(`/operaciones/intervenciones/${id_intervencion}`, {
      method: 'PUT',
      body: JSON.stringify(request),
      baseUrlOverride: API_BASE_URL,
    });
  }

  async getInterventionsByZone(id_zona: string, limit = 5): Promise<InterventionDTO[]> {
    return httpClient<InterventionDTO[]>(`/operaciones/intervenciones/zona/${id_zona}?limit=${limit}`, {
      baseUrlOverride: API_BASE_URL,
    });
  }

  async getObservationsByZone(id_zona: string): Promise<ObservationDTO[]> {
    return httpClient<ObservationDTO[]>(`/observaciones/zona/${id_zona}`, {
      baseUrlOverride: API_BASE_URL,
    });
  }
}

export interface ObservationDTO {
  id_observacion: string;
  id_brigadista: string;
  id_zona: string;
  latitud: number;
  longitud: number;
  condiciones: string;
  recursos_necesarios: string;
  observaciones_texto: string;
  creado_en: string;
}
