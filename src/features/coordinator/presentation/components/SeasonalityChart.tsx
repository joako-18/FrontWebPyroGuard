import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { SeasonalityRecord } from '../../domain/entities/SeasonalityRecord';
import './SeasonalityChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SeasonalityChartProps {
  record: SeasonalityRecord;
}

const MONTH_LABELS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function SeasonalityChart({ record }: SeasonalityChartProps) {
  
  const chartData = useMemo(() => {
    const data = record.monthlyCounts.map(m => m.count);
    const peakMonth = record.peakMonth?.month;

    return {
      labels: MONTH_LABELS,
      datasets: [
        {
          label: 'Incidentes',
          data,
          backgroundColor: record.monthlyCounts.map((m) => 
            m.month === peakMonth && m.count > 0 ? 'rgba(255, 75, 31, 0.9)' : 'rgba(255, 144, 104, 0.3)'
          ),
          hoverBackgroundColor: 'rgba(255, 75, 31, 1)',
          borderRadius: 4,
          borderSkipped: false,
        }
      ],
    };
  }, [record]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(26, 16, 8, 0.9)',
        titleColor: '#fff',
        bodyColor: '#ff9068',
        borderColor: 'rgba(255, 106, 0, 0.2)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y} incidentes`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 11,
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 11,
          },
          stepSize: 1,
        },
        beginAtZero: true,
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart' as const,
    }
  }), []);

  return (
    <div className="seasonality-chart">
      <div className="seasonality-chart__header">
        <h4 className="seasonality-chart__title">{record.zoneName}</h4>
        <span className="seasonality-chart__total">{record.totalIncidents} incidentes históricos</span>
      </div>

      <div className="seasonality-chart__canvas-container" style={{ height: '220px', width: '100%', position: 'relative' }}>
        <Bar data={chartData} options={options} />
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