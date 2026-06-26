import type { ZoneListItemDTO } from '../dto/ZoneDTO';
import type { Zone } from '../../domain/entities/Zone';

export function mapZone(dto: ZoneListItemDTO): Zone {
  return {
    id: dto.id_zona,
    nombre: dto.nombre,
    areaHectareas: dto.area_hectareas,
    geojsonPolygon: dto.geojson,
  };
}