import type { ZoneRepository } from '../repository/ZoneRepository';
import type { Zone } from '../entities/Zone';

export class GetZonesUseCase {
  private repo: ZoneRepository;

  constructor(repo: ZoneRepository) {
    this.repo = repo;
  }

  async execute(): Promise<Zone[]> {
    return this.repo.getZones();
  }
}