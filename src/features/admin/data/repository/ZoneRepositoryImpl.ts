import type { ZoneRepository } from '../../domain/repository/ZoneRepository';
import { ZonesRemoteDataSource } from '../dataSources/ZonesRemoteDataSource';
import type { Zone } from '../../domain/entities/Zone';
import { mapZone } from '../mappers/ZoneMapper';

export class ZoneRepositoryImpl implements ZoneRepository {
  private remote: ZonesRemoteDataSource;

  constructor(remote: ZonesRemoteDataSource) {
    this.remote = remote;
  }

  async getZones(): Promise<Zone[]> {
    const dtos = await this.remote.getZones();
    return dtos.map(mapZone);
  }

  async createZone(
    nombre: string,
    geojsonPolygon: Record<string, unknown>
  ): Promise<Zone> {
    const dto = await this.remote.createZone({
      id_zona: crypto.randomUUID(),
      nombre,
      area_hectareas: 0,
      geojson: JSON.stringify(geojsonPolygon),
    });
    return mapZone(dto);
  }
}