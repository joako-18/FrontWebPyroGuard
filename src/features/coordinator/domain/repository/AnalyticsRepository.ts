import type { SeasonalityRecord } from '../entities/SeasonalityRecord';
import type { Zone } from '../entities/Zone';

export interface IAnalyticsRepository {
  getSeasonalityData(): Promise<SeasonalityRecord[]>;
  getZones(): Promise<Zone[]>;
}