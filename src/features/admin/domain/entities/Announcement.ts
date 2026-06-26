/**
 * Entidad de dominio: representa el concepto de negocio "Comunicado".
 *
 * El backend solo guarda título, contenido y fecha de vigencia.
 * "zones" y "alertLevel" son metadatos que la UI necesita pero la API
 * no soporta como campos propios, así que se empaquetan dentro de
 * `content` (ver AnnouncementMapper) y se separan de vuelta aquí para
 * que el resto de la app los use como campos normales.
 */

export type AlertLevel = 'info' | 'preventive' | 'critical';

export interface Announcement {
  id: string;
  title: string;
  /** Cuerpo del comunicado, ya sin el bloque de metadatos embebido */
  description: string;
  zones: string;
  alertLevel: AlertLevel;
  authorId: string;
  publishedAt: string;
  validUntil: string;
}