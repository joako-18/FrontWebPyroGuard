/**
 * Entidad de dominio: representa el histórico de incendios por mes
 * para una zona específica.
 */
export interface MonthlyCount {
  month: number; // 1-12
  count: number;
}

export interface SeasonalityRecord {
  zoneName: string;
  monthlyCounts: MonthlyCount[];
  totalIncidents: number;
  peakMonth: MonthlyCount | null;
}