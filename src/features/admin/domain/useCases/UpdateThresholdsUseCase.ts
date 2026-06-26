import type { ThresholdRepository } from '../repository/ThresholdRepository';
import type { ThresholdConfig } from '../entities/ThresholdConfig';

export class UpdateThresholdsUseCase {
  private repo: ThresholdRepository;

  constructor(repo: ThresholdRepository) {
    this.repo = repo;
  }

  async execute(config: ThresholdConfig): Promise<void> {
    return this.repo.updateThresholds(config);
  }
}