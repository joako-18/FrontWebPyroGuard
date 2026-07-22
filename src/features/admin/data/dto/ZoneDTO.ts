export interface CreateZoneRequest {
  nombre: string;
  geojson_polygon: {
    type: string;
    coordinates: number[][][];
  };
}

export interface ZoneListItemDTO {
  id_zona: string;
  nombre: string;
  area_hectareas: number;
  geojson?: string;
}