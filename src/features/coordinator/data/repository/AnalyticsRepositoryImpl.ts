import type { IAnalyticsRepository } from '../../domain/repository/AnalyticsRepository';
import { AnalyticsRemoteDataSource } from '../dataSources/AnalyticsRemoteDataSource';
import type { SeasonalityRecord } from '../../domain/entities/SeasonalityRecord';
import type { Zone } from '../../domain/entities/Zone';
import { SeasonalityMapper } from '../mappers/SeasonalityMapper';
import { ZoneMapper } from '../mappers/ZoneMapper';

export class AnalyticsRepositoryImpl implements IAnalyticsRepository {
  private remote: AnalyticsRemoteDataSource;

  constructor(remote: AnalyticsRemoteDataSource) {
    this.remote = remote;
  }

  async getSeasonalityData(): Promise<SeasonalityRecord[]> {
    const dtos = await this.remote.getSeasonality();
    return SeasonalityMapper.toDomain(dtos);
  }

  async getZones(): Promise<Zone[]> {
    const dtos = await this.remote.getZones();
    return ZoneMapper.toDomainList(dtos);
  }
}