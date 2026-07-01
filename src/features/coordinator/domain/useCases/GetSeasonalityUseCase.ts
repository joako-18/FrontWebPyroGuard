import type { IAnalyticsRepository } from '../repository/AnalyticsRepository';
import type { SeasonalityRecord } from '../entities/SeasonalityRecord';
import { AnalyticsRepositoryImpl } from '../../data/repository/AnalyticsRepositoryImpl';

import { AnalyticsRemoteDataSource } from '../../data/dataSources/AnalyticsRemoteDataSource';

const defaultRepository = new AnalyticsRepositoryImpl(new AnalyticsRemoteDataSource());

export function createGetSeasonalityUseCase(repository: IAnalyticsRepository = defaultRepository) {
  return async function getSeasonalityUseCase(): Promise<SeasonalityRecord[]> {
    return repository.getSeasonalityData();
  };
}

export const getSeasonalityUseCase = createGetSeasonalityUseCase();