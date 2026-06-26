import type { IncidentDTO } from '../dto/IncidentDTO';
import type { Incident } from '../../domain/entities/Incident';

export function mapIncident(dto: IncidentDTO): Incident {
  return {
    id: dto.id,
    fecha: dto.fecha,
    fuente: dto.fuente,
    zona: dto.zona,
    coordenadaWkt: dto.coordenada_wkt,
  };
}