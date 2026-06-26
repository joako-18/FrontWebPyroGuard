import { httpClient } from '../../../../shared/api/httpClient';
import type { IncidentDTO } from '../dto/IncidentDTO';

const ML_BASE_URL = 'https://pyroguard.inode.cloud/ml/api/v1';

export class IncidentsRemoteDataSource {
  async getHistoricalIncidents(limit = 10): Promise<IncidentDTO[]> {
    return httpClient<IncidentDTO[]>(
      `/analitica/incidentes-historicos?limit=${limit}`,
      { baseUrlOverride: ML_BASE_URL }
    );
  }
}