import type { IncidentRepository } from '../../domain/repository/IncidentRepository';
import { IncidentsRemoteDataSource } from '../dataSources/IncidentsRemoteDataSource';
import type { Incident } from '../../domain/entities/Incident';
import { mapIncident } from '../mappers/IncidentMapper';

export class IncidentRepositoryImpl implements IncidentRepository {
  private remote: IncidentsRemoteDataSource;

  constructor(remote: IncidentsRemoteDataSource) {
    this.remote = remote;
  }

  async getHistoricalIncidents(limit = 1000): Promise<Incident[]> {
    const dtos = await this.remote.getHistoricalIncidents(limit);
    return dtos.map(mapIncident);
  }
}