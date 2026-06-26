import type { CitizenReportRepository } from '../../domain/repository/CitizenReportRepository';
import { CitizenReportRemoteDataSource } from '../dataSources/CitizenReportRemoteDataSource';
import type { CitizenReport } from '../../domain/entities/CitizenReport';
import { mapCitizenReport } from '../mappers/CitizenReportMapper';

export class CitizenReportRepositoryImpl implements CitizenReportRepository {
  private remote: CitizenReportRemoteDataSource;

  constructor(remote: CitizenReportRemoteDataSource) {
    this.remote = remote;
  }

  async getAll(): Promise<CitizenReport[]> {
    const dtos = await this.remote.getAll();
    return dtos.map(mapCitizenReport);
  }
}