import type { CitizenReportDTO } from '../dto/CitizenReportDTO';
import type { CitizenReport } from '../../domain/entities/CitizenReport';

export function mapCitizenReport(dto: CitizenReportDTO): CitizenReport {
  return {
    id: dto.id_reporte,
    descripcion: dto.descripcion,
    latitud: dto.latitud,
    longitud: dto.longitud,
    fotoUrl: dto.foto_url,
    estado: dto.estado,
    creadoEn: dto.creado_en,
  };
}