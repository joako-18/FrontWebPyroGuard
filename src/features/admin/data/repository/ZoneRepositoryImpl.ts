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
    // geojsonPolygon comes from Leaflet as a GeoJSON Feature
    // We only need the geometry part for the API
    const geometry = geojsonPolygon.geometry as { type: string; coordinates: number[][][] };

    const dto = await this.remote.createZone({
      nombre,
      geojson_polygon: geometry,
    });
    return mapZone(dto);
  }
}