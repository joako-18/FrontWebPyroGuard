import type { Brigade } from '../entities/Brigade';
import type { Intervention } from '../entities/Intervention';

export interface OperationsRepository {
  getBrigadistas(): Promise<any[]>;
  getBrigades(): Promise<Brigade[]>;
  createBrigade(nombre: string, idCoordinador: string): Promise<Brigade>;
  assignMember(idBrigada: string, idBrigadista: string): Promise<boolean>;
  createIntervention(idBrigada: string, idZona: string, observaciones: string): Promise<Intervention>;
  updateIntervention(idIntervencion: string, estado: string, observaciones: string): Promise<Intervention>;
  getInterventionsByZone(idZona: string, limit?: number): Promise<Intervention[]>;
}
