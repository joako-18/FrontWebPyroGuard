import { useState } from 'react';
import { useZonesData } from '../hooks/useZonesData';
import IncidentMap from '../components/IncidentMap';
import ThresholdForm from '../components/ThresholdForm';
import CreateZoneModal from '../components/CreateZoneModal';
import type { ThresholdConfig } from '../../domain/entities/ThresholdConfig';
import './ZonesPage.css';

export default function ZonesPage() {
  const {
    incidents,
    thresholds,
    zones,
    isLoading,
    error,
    updateThresholds,
    createZone,
    refetch,
  } = useZonesData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleThresholdSave = async (config: ThresholdConfig) => {
    setSaveError(null);
    try {
      await updateThresholds(config);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al guardar';
      setSaveError(message);
    }
  };

  const handleZoneCreate = async (name: string, geojson: Record<string, unknown>) => {
    setSaveError(null);
    try {
      await createZone(name, geojson);
      refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al crear zona';
      setSaveError(message);
      throw err; 
    }
  };

  if (isLoading) {
    return (
      <div className="zones-page">
        <div className="loading-state">Cargando datos de zonas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="zones-page">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={refetch} className="btn-retry">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="zones-page fade-up">
      <header className="page-header">
        <h1 className="page-title">Monitoreo de Zonas</h1>
        <p className="page-description">
          Administra las zonas de riesgo, ajusta los umbrales de alerta y visualiza los incidentes históricos.
        </p>
      </header>

      <div className="zones-grid">
        <div className="zones-column-main">
          <section className="zones-card map-card">
            <h2 className="section-subtitle">Incidentes Históricos</h2>
            <IncidentMap incidents={incidents} />
          </section>
        </div>

        <div className="zones-column-side">
          <section className="zones-card action-card">
            <h2 className="section-subtitle">Gestión de Zonas</h2>
            <p className="zones-count">
              <span className="count-number">{zones.length}</span>
              <span className="count-label">Zona{zones.length !== 1 && 's'} registrada{zones.length !== 1 && 's'}</span>
            </p>
            <button className="btn-new-zone" onClick={() => setIsModalOpen(true)}>
              + Nueva Zona
            </button>
          </section>

          <section className="zones-card threshold-card">
            <h2 className="section-subtitle">Umbrales de Alerta</h2>
            <ThresholdForm initial={thresholds} onSave={handleThresholdSave} />
            {saveError && <p className="error-message">{saveError}</p>}
          </section>
        </div>
      </div>

      <CreateZoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleZoneCreate}
      />
    </div>
  );
}