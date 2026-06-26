import type { ThresholdRepository } from '../../domain/repository/ThresholdRepository';
import { ThresholdsRemoteDataSource } from '../dataSources/ThresholdsRemoteDataSource';
import type { ThresholdConfig } from '../../domain/entities/ThresholdConfig';
import { mapThreshold, mapThresholdToDTO } from '../mappers/ThresholdMapper';

export class ThresholdRepositoryImpl implements ThresholdRepository {
  private remote: ThresholdsRemoteDataSource;

  constructor(remote: ThresholdsRemoteDataSource) {
    this.remote = remote;
  }

  async getThresholds(): Promise<ThresholdConfig> {
    const dto = await this.remote.getThresholds();
    return mapThreshold(dto);
  }

  async updateThresholds(config: ThresholdConfig): Promise<void> {
    const dto = mapThresholdToDTO(config);
    await this.remote.updateThresholds(dto);
  }
}