import type { CitizenReportRepository } from '../repository/CitizenReportRepository';
import type { CitizenReport } from '../entities/CitizenReport';

export class GetCitizenReportsUseCase {
  private repo: CitizenReportRepository;

  constructor(repo: CitizenReportRepository) {
    this.repo = repo;
  }

  async execute(): Promise<CitizenReport[]> {
    return this.repo.getAll();
  }
}