/**
 * Entidad de dominio: representa una Zona de monitoreo/reserva.
 */
export interface Zone {
  id: string;
  name: string;
  areaHectares: number;
  geojson?: any;
  latitude: number;
  longitude: number;
  hasRealCoordinates: boolean;
}