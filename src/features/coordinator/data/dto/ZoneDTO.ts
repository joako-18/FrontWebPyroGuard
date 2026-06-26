/**
 * DTOs = forma EXACTA de los datos como los envía la API
 * para el endpoint GET /ml/api/v1/zonas/
 *
 * NOTA: por ahora la API NO incluye latitud/longitud — solo nombre y área.
 * Se asume que en el futuro el backend agregará coordenadas (latitud/longitud).
 * Mientras eso ocurre, ZoneMapper.ts usa coordenadas de respaldo conocidas
 * para las reservas reales de Chiapas, para no bloquear la vista del mapa.
 */
export interface ZoneDTO {
  id_zona: string;
  nombre: string;
  area_hectareas: number;
  geojson?: string;
  latitud?: number;
  longitud?: number;
}