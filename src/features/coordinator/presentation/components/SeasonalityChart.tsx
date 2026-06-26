import type { SeasonalityRecord } from '../../domain/entities/SeasonalityRecord';
import './SeasonalityChart.css';

interface SeasonalityChartProps {
  record: SeasonalityRecord;
}

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function SeasonalityChart({ record }: SeasonalityChartProps) {
  const maxCount = Math.max(...record.monthlyCounts.map((m) => m.count), 1);

  return (
    <div className="seasonality-chart">
      <div className="seasonality-chart__header">
        <h4 className="seasonality-chart__title">{record.zoneName}</h4>
        <span className="seasonality-chart__total">{record.totalIncidents} incidentes históricos</span>
      </div>

      <div className="seasonality-chart__bars">
        {record.monthlyCounts.map((m) => {
          const heightPercent = (m.count / maxCount) * 100;
          const isPeak = record.peakMonth?.month === m.month && m.count > 0;
          return (
            <div className="seasonality-chart__bar-col" key={m.month}>
              <div className="seasonality-chart__bar-track">
                <div
                  className={`seasonality-chart__bar ${isPeak ? 'seasonality-chart__bar--peak' : ''}`}
                  style={{ height: `${heightPercent}%` }}
                  title={`${MONTH_LABELS[m.month - 1]}: ${m.count} incidentes`}
                />
              </div>
              <span className="seasonality-chart__bar-label">{MONTH_LABELS[m.month - 1]}</span>
            </div>
          );
        })}
      </div>

      {record.peakMonth && (
        <p className="seasonality-chart__insight">
          Mes de mayor riesgo histórico: <strong>{MONTH_LABELS[record.peakMonth.month - 1]}</strong> (
          {record.peakMonth.count} incidentes)
        </p>
      )}
    </div>
  );
}