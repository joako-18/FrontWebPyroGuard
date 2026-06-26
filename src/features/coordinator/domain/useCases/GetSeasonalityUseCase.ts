import type { IAnalyticsRepository } from '../repository/AnalyticsRepository';
import type { SeasonalityRecord } from '../entities/SeasonalityRecord';
import { AnalyticsRepositoryImpl } from '../../data/repository/AnalyticsRepositoryImpl';

/**
 * Caso de uso: obtener el histórico de estacionalidad de incendios por zona.
 */
import { AnalyticsRemoteDataSource } from '../../data/dataSources/AnalyticsRemoteDataSource';

const defaultRepository = new AnalyticsRepositoryImpl(new AnalyticsRemoteDataSource());

export function createGetSeasonalityUseCase(repository: IAnalyticsRepository = defaultRepository) {
  return async function getSeasonalityUseCase(): Promise<SeasonalityRecord[]> {
    return repository.getSeasonalityData();
  };
}

export const getSeasonalityUseCase = createGetSeasonalityUseCase();