import { httpClient } from '../../../../shared/api/httpClient';
import type { CitizenReportDTO } from '../dto/CitizenReportDTO';

export class CitizenReportRemoteDataSource {
  async getAll(): Promise<CitizenReportDTO[]> {
    return httpClient<CitizenReportDTO[]>('/ciudadano/reportes', {
      baseUrlOverride: 'https://pyroguard.inode.cloud/api/v1',
    });
  }
}