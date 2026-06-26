import type { IncidentRepository } from '../repository/IncidentRepository';
import type { Incident } from '../entities/Incident';

export class GetHistoricalIncidentsUseCase {
  private repo: IncidentRepository;

  constructor(repo: IncidentRepository) {
    this.repo = repo;
  }

  async execute(limit = 1000): Promise<Incident[]> {
    return this.repo.getHistoricalIncidents(limit);
  }
}