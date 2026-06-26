import type { Zone } from '../entities/Zone';

export interface ZoneRepository {
  getZones(): Promise<Zone[]>;
  createZone(nombre: string, geojsonPolygon: Record<string, unknown>): Promise<Zone>;
}