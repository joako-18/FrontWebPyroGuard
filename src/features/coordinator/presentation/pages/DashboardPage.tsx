import { useDashboard } from '../hooks/useDashboard.ts';
import ZonesMap from '../components/ZonesMap';
import SeasonalityChart from '../components/SeasonalityChart';
import './DashboardPage.css';

function formatHectares(value: number): string {
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(value);
}

export default function DashboardPage() {
  const { zones, seasonality, isLoading, error } = useDashboard();

  const totalArea = zones.reduce((sum, z) => sum + z.areaHectares, 0);
  const totalHistoricalIncidents = seasonality.reduce((sum, s) => sum + s.totalIncidents, 0);

  return (
    <div className="dashboard-page fade-up">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </header>

      {error && <div className="page-error">{error}</div>}

      {isLoading && <p className="page-loading">Cargando información del dashboard...</p>}

      {!isLoading && !error && (
        <>
          {}
          <div className="dashboard-summary-grid">
            <div className="summary-card">
              <div className="summary-header">
                <span>ZONAS MONITOREADAS</span>
              </div>
              <div className="summary-value">{zones.length}</div>
            </div>
            <div className="summary-card">
              <div className="summary-header">
                <span>ÁREA TOTAL PROTEGIDA</span>
              </div>
              <div className="summary-value">{formatHectares(totalArea)} ha</div>
            </div>
            <div className="summary-card">
              <div className="summary-header">
                <span>INCIDENTES HISTÓRICOS</span>
              </div>
              <div className="summary-value">{totalHistoricalIncidents}</div>
            </div>
          </div>

          {}
          <section className="dashboard-section">
            <h2 className="dashboard-section__title">Zonas en el mapa</h2>
            <ZonesMap zones={zones} />
            {zones.some((z) => !z.hasRealCoordinates) && (
              <p className="dashboard-section__note">
                Algunas zonas se muestran con coordenadas aproximadas porque la API aún no provee su
                ubicación exacta.
              </p>
            )}
          </section>

          {}
          <section className="dashboard-section">
            <h2 className="dashboard-section__title">Estacionalidad de incendios por zona</h2>
            <div className="dashboard-charts-grid">
              {seasonality.map((record) => (
                <SeasonalityChart record={record} key={record.zoneName} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}