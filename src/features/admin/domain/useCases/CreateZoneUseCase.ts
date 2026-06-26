import type { ZoneRepository } from '../repository/ZoneRepository';
import type { Zone } from '../entities/Zone';

export class CreateZoneUseCase {
  private repo: ZoneRepository;

  constructor(repo: ZoneRepository) {
    this.repo = repo;
  }

  async execute(
    nombre: string,
    geojsonPolygon: Record<string, unknown>
  ): Promise<Zone> {
    return this.repo.createZone(nombre, geojsonPolygon);
  }
}