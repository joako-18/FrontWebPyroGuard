import { httpClient } from '../../../../shared/api/httpClient';
import type { CreateZoneRequest, ZoneListItemDTO } from '../dto/ZoneDTO';

const ML_BASE_URL = 'https://pyroguard.inode.cloud/ml/api/v1';

export class ZonesRemoteDataSource {
  async getZones(): Promise<ZoneListItemDTO[]> {
    return httpClient<ZoneListItemDTO[]>(
      '/zonas/',
      { baseUrlOverride: ML_BASE_URL }
    );
  }

  async createZone(request: CreateZoneRequest): Promise<ZoneListItemDTO> {
    return httpClient<ZoneListItemDTO>(
      '/zonas/',
      {
        method: 'POST',
        body: JSON.stringify(request),
        baseUrlOverride: ML_BASE_URL,
      }
    );
  }
}