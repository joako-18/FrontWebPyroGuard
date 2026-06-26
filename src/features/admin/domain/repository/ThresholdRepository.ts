import type { ThresholdConfig } from '../entities/ThresholdConfig';

export interface ThresholdRepository {
  getThresholds(): Promise<ThresholdConfig>;
  updateThresholds(config: ThresholdConfig): Promise<void>;
}