export interface CreateZoneRequest {
  id_zona: string;
  nombre: string;
  area_hectareas: number;
  geojson: string;
}

export interface ZoneListItemDTO {
  id_zona: string;
  nombre: string;
  area_hectareas: number;
  geojson?: string;
}