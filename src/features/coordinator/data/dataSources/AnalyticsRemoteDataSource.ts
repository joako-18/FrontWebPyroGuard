import { httpClient } from '../../../../shared/api/httpClient';
import type { SeasonalityDTO } from '../dto/SeasonalityDTO';
import type { ZoneDTO } from '../dto/ZoneDTO';

const ML_BASE = 'https://pyroguard.inode.cloud/ml/api/v1';

export class AnalyticsRemoteDataSource {
  async getSeasonality(): Promise<SeasonalityDTO> {
    return httpClient<SeasonalityDTO>('/analitica/estacionalidad', {
      baseUrlOverride: ML_BASE,
    });
  }

  async getZones(): Promise<ZoneDTO[]> {
    return httpClient<ZoneDTO[]>('/zonas/', {
      baseUrlOverride: ML_BASE,
    });
  }

  async getSimpleZones(): Promise<{id_zona: string, nombre: string}[]> {
    return httpClient<{id_zona: string, nombre: string}[]>('/zonas/simple', {
      baseUrlOverride: ML_BASE,
    });
  }
}