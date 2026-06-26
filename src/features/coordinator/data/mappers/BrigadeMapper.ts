import type { BrigadeDTO } from '../dto/BrigadeDTO';
import type { Brigade } from '../../domain/entities/Brigade';

export const BrigadeMapper = {
  toDomain(dto: BrigadeDTO): Brigade {
    return {
      id: dto.id_brigada,
      name: dto.nombre,
      coordinatorId: dto.id_coordinador,
      isActive: dto.activa,
      createdAt: dto.creado_en,
    };
  }
};
