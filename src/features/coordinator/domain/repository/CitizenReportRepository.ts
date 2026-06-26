import type { CitizenReport } from '../entities/CitizenReport';

export interface CitizenReportRepository {
  getAll(): Promise<CitizenReport[]>;
}