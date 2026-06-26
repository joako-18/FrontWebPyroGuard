import type { OperationsRepository } from '../../domain/repository/OperationsRepository';
import type { Brigade } from '../../domain/entities/Brigade';
import type { Intervention } from '../../domain/entities/Intervention';
import type { OperationsRemoteDataSource } from '../dataSources/OperationsRemoteDataSource';
import { BrigadeMapper } from '../mappers/BrigadeMapper';
import { InterventionMapper } from '../mappers/InterventionMapper';

export class OperationsRepositoryImpl implements OperationsRepository {
  private remote: OperationsRemoteDataSource;
  constructor(remote: OperationsRemoteDataSource) {
    this.remote = remote;
  }

  async getBrigadistas(): Promise<any[]> {
    return this.remote.getBrigadistas();
  }

  async getBrigades(): Promise<Brigade[]> {
    const dtos = await this.remote.getBrigades();
    return dtos.map(BrigadeMapper.toDomain);
  }

  async createBrigade(nombre: string, idCoordinador: string): Promise<Brigade> {
    const dto = await this.remote.createBrigade({ nombre, id_coordinador: idCoordinador });
    return BrigadeMapper.toDomain(dto);
  }

  async assignMember(idBrigada: string, idBrigadista: string): Promise<boolean> {
    const response = await this.remote.assignMember(idBrigada, { id_brigadista: idBrigadista });
    return response.status === 'success';
  }

  async createIntervention(idBrigada: string, idZona: string, observaciones: string): Promise<Intervention> {
    const dto = await this.remote.createIntervention({
      id_brigada: idBrigada,
      id_zona: idZona,
      estado: 'Pendiente',
      observaciones
    });
    return InterventionMapper.toDomain(dto);
  }

  async updateIntervention(idIntervencion: string, estado: string, observaciones: string): Promise<Intervention> {
    const dto = await this.remote.updateIntervention(idIntervencion, { estado, observaciones });
    return InterventionMapper.toDomain(dto);
  }

  async getInterventionsByZone(idZona: string, limit = 5): Promise<Intervention[]> {
    const dtos = await this.remote.getInterventionsByZone(idZona, limit);
    return dtos.map(InterventionMapper.toDomain);
  }
}
