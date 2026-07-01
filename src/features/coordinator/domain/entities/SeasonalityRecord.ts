export interface MonthlyCount {
  month: number; 
  count: number;
}

export interface SeasonalityRecord {
  zoneName: string;
  monthlyCounts: MonthlyCount[];
  totalIncidents: number;
  peakMonth: MonthlyCount | null;
}