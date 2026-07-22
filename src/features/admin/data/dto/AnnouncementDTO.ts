
export interface CreateAnnouncementRequestDTO {
  titulo: string;
  contenido: string;
  fecha_vigencia: string; 
}

export interface CreateEmergencyAnnouncementRequestDTO {
  id_zona: string;
  mensaje_adicional: string;
  fecha_vigencia: string;
}

export interface AnnouncementDTO {
  id_comunicado: string;
  titulo: string;
  contenido: string;
  id_autor: string;
  fecha_publicacion: string;
  fecha_vigencia: string;
}

export type DeleteAnnouncementResponseDTO = string;