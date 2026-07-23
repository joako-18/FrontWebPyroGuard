import { httpClient } from '../../../../shared/api/httpClient';
import type { CitizenReportDTO } from '../dto/CitizenReportDTO';
import { ENV } from '../../../../shared/config/env';

export class CitizenReportRemoteDataSource {
  async getAll(): Promise<CitizenReportDTO[]> {
    return httpClient<CitizenReportDTO[]>('/reportes', {
      baseUrlOverride: ENV.API_V1_BASE_URL,
    });
  }
}