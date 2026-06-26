import type { SeasonalityDTO } from '../dto/SeasonalityDTO';
import type { SeasonalityRecord, MonthlyCount } from '../../domain/entities/SeasonalityRecord';

function buildMonthlyCounts(monthMap: Record<string, number>): MonthlyCount[] {
  const counts: MonthlyCount[] = [];
  for (let month = 1; month <= 12; month++) {
    counts.push({ month, count: monthMap[String(month)] ?? 0 });
  }
  return counts;
}

function findPeakMonth(monthlyCounts: MonthlyCount[]): MonthlyCount | null {
  if (monthlyCounts.every((m) => m.count === 0)) return null;
  return monthlyCounts.reduce((max, current) => (current.count > max.count ? current : max));
}

export const SeasonalityMapper = {
  toDomain(dto: SeasonalityDTO): SeasonalityRecord[] {
    return Object.entries(dto).map(([zoneName, monthMap]) => {
      const monthlyCounts = buildMonthlyCounts(monthMap);
      const totalIncidents = monthlyCounts.reduce((sum, m) => sum + m.count, 0);
      return {
        zoneName,
        monthlyCounts,
        totalIncidents,
        peakMonth: findPeakMonth(monthlyCounts),
      };
    });
  },
};