import type { IAnalyticsRepository } from '../repository/AnalyticsRepository';
import type { Zone } from '../entities/Zone';
import { AnalyticsRepositoryImpl } from '../../data/repository/AnalyticsRepositoryImpl';

import { AnalyticsRemoteDataSource } from '../../data/dataSources/AnalyticsRemoteDataSource';

const defaultRepository = new AnalyticsRepositoryImpl(new AnalyticsRemoteDataSource());

export function createGetZonesUseCase(repository: IAnalyticsRepository = defaultRepository) {
  return async function getZonesUseCase(): Promise<Zone[]> {
    return repository.getZones();
  };
}

export const getZonesUseCase = createGetZonesUseCase();