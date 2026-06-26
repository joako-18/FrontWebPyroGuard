/**
 * DTOs = forma EXACTA de los datos como los envía/recibe la API
 * para los endpoints de Comunicados Oficiales: /v1/comunicados
 */

/** Body que se envía a POST /v1/comunicados/ */
export interface CreateAnnouncementRequestDTO {
  titulo: string;
  contenido: string;
  fecha_vigencia: string; // ISO 8601
}

/** Forma común de la respuesta en create/list/historial */
export interface AnnouncementDTO {
  id_comunicado: string;
  titulo: string;
  contenido: string;
  id_autor: string;
  fecha_publicacion: string;
  fecha_vigencia: string;
}

/** Respuesta de DELETE /v1/comunicados/{id_comunicado} — string suelto */
export type DeleteAnnouncementResponseDTO = string;