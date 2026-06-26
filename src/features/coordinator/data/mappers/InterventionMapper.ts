import type { InterventionDTO } from '../dto/InterventionDTO';
import type { Intervention } from '../../domain/entities/Intervention';

export const InterventionMapper = {
  toDomain(dto: InterventionDTO): Intervention {
    return {
      id: dto.id_intervencion,
      brigadeId: dto.id_brigada,
      zoneId: dto.id_zona,
      status: dto.estado,
      notes: dto.observaciones,
      assignedAt: dto.fecha_asignacion,
      completedAt: dto.fecha_completada,
    };
  }
};
