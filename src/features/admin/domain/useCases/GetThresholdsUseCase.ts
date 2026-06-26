import type { ThresholdRepository } from '../repository/ThresholdRepository';
import type { ThresholdConfig } from '../entities/ThresholdConfig';

export class GetThresholdsUseCase {
  private repo: ThresholdRepository;

  constructor(repo: ThresholdRepository) {
    this.repo = repo;
  }

  async execute(): Promise<ThresholdConfig> {
    return this.repo.getThresholds();
  }
}