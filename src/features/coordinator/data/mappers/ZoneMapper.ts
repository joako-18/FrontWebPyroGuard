import type { ZoneDTO } from '../dto/ZoneDTO';
import type { Zone } from '../../domain/entities/Zone';

/**
 * Coordenadas de respaldo (centro aproximado) de Reservas de la Biosfera
 * reales en Chiapas, usadas SOLO mientras la API no incluya latitud/longitud
 * en la respuesta de /ml/api/v1/zonas/. Si el backend ya las provee,
 * el mapper las usa directamente y este fallback se ignora.
 *
 * Fuente: límites geográficos publicados por CONABIO/CONANP.
 */
const FALLBACK_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'El Triunfo': { lat: 15.62, lng: -92.84 },
  'La Sepultura': { lat: 16.15, lng: -93.65 },
};

/** Coordenada genérica (centro de Chiapas) para zonas totalmente desconocidas */
const DEFAULT_FALLBACK = { lat: 16.75, lng: -93.1 };

export const ZoneMapper = {
  toDomain(dto: ZoneDTO): Zone {
    let parsedGeojson = undefined;
    let lat = DEFAULT_FALLBACK.lat;
    let lng = DEFAULT_FALLBACK.lng;
    let hasRealCoordinates = false;

    if (dto.geojson) {
      try {
        parsedGeojson = JSON.parse(dto.geojson);
        hasRealCoordinates = true;
        // Aproximar centro con el primer punto del polígono
        if (parsedGeojson.coordinates?.[0]?.[0]) {
          lng = parsedGeojson.coordinates[0][0][0];
          lat = parsedGeojson.coordinates[0][0][1];
        }
      } catch (e) {
        console.error("Error parsing geojson", e);
      }
    } else {
      const fallback = FALLBACK_COORDINATES[dto.nombre] ?? DEFAULT_FALLBACK;
      lat = fallback.lat;
      lng = fallback.lng;
    }

    return {
      id: dto.id_zona,
      name: dto.nombre,
      areaHectares: dto.area_hectareas,
      geojson: parsedGeojson,
      latitude: lat,
      longitude: lng,
      hasRealCoordinates,
    };
  },

  toDomainList(dtos: ZoneDTO[]): Zone[] {
    return dtos.map(ZoneMapper.toDomain);
  },
};