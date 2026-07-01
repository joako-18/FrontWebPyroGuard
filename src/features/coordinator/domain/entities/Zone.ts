export interface Zone {
  id: string;
  name: string;
  areaHectares: number;
  geojson?: Record<string, unknown>;
  latitude: number;
  longitude: number;
  hasRealCoordinates: boolean;
}