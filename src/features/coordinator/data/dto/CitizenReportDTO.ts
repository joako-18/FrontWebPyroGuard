export interface CitizenReportDTO {
  id_reporte: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  foto_url: string | null;
  estado: string;
  creado_en: string;
}