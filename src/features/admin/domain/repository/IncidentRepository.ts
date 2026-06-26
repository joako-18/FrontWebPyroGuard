import type { Incident } from '../entities/Incident';

export interface IncidentRepository {
  getHistoricalIncidents(limit?: number): Promise<Incident[]>;
}