import { useState } from 'react';
import { useCitizenReports } from '../hooks/useCitizenReports';
import { useObservations } from '../hooks/useObservations';
import './ReportsPage.css';

const getStatusClass = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'pendiente': return 'status-pending';
    case 'atendido': return 'status-attended';
    case 'falso': return 'status-false';
    default: return '';
  }
};

const getStatusLabel = (estado: string) => {
  const map: Record<string, string> = {
    pendiente: 'Pendiente',
    atendido: 'Atendido',
    falso: 'Falso',
  };
  return map[estado.toLowerCase()] ?? estado;
};

export default function ReportsPage() {
  const { reports, isLoading: loadingReports, error: errorReports, refetch } = useCitizenReports();
  const { zones, selectedZone, setSelectedZone, observations, isLoading: loadingObs, error: errorObs } = useObservations();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="reports-page fade-up">
      {selectedImage && (
        <div className="image-modal-overlay fade-in" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content fade-up" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <img src={selectedImage} alt="Foto del reporte" className="image-modal-img" />
          </div>
        </div>
      )}

      <header className="page-header">
        <h1 className="page-title">Reportes y Observaciones</h1>
      </header>

      {/* --- SECCIÓN: REPORTES CIUDADANOS --- */}
      <section className="reports-section">
        <h2 className="section-subtitle">Reportes Ciudadanos</h2>
        {errorReports && (
          <div className="page-error">
            <p>{errorReports}</p>
            <button onClick={refetch} className="btn-retry">Reintentar</button>
          </div>
        )}

        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Foto</th>
              </tr>
            </thead>
            <tbody>
              {loadingReports && (
                <tr>
                  <td colSpan={5} className="loading-cell">Cargando reportes...</td>
                </tr>
              )}

              {!loadingReports && reports.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-cell">No se encontraron reportes.</td>
                </tr>
              )}

              {!loadingReports &&
                reports.map((report) => (
                  <tr 
                    key={report.id} 
                    onClick={() => { if (report.fotoUrl) setSelectedImage(report.fotoUrl); }}
                    className={report.fotoUrl ? "clickable-row" : ""}
                  >
                    <td className="desc-cell">{report.descripcion}</td>
                    <td>{report.latitud.toFixed(4)}, {report.longitud.toFixed(4)}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(report.estado)}`}>
                        {getStatusLabel(report.estado)}
                      </span>
                    </td>
                    <td>
                      {new Date(report.creadoEn).toLocaleDateString('es-MX', {
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td>
                      {report.fotoUrl ? (
                        <button 
                          className="photo-link" 
                          onClick={(e) => { e.stopPropagation(); setSelectedImage(report.fotoUrl!); }}
                        >
                          Ver foto
                        </button>
                      ) : (
                        <span className="no-photo">—</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- SECCIÓN: OBSERVACIONES DE BRIGADISTAS --- */}
      <section className="reports-section" style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="section-subtitle">Observaciones de Brigadistas</h2>
          
          <select 
            className="zone-selector"
            value={selectedZone} 
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="">-- Selecciona una Zona --</option>
            {zones.map((z) => (
              <option key={z.id_zona} value={z.id_zona}>{z.nombre}</option>
            ))}
          </select>
        </div>

        {errorObs && (
          <div className="page-error">
            <p>{errorObs}</p>
          </div>
        )}

        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Condiciones</th>
                <th>Recursos Necesarios</th>
                <th>Observaciones</th>
                <th>Ubicación</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {!selectedZone && (
                <tr>
                  <td colSpan={5} className="empty-cell">Selecciona una zona para ver sus observaciones.</td>
                </tr>
              )}
              
              {selectedZone && loadingObs && (
                <tr>
                  <td colSpan={5} className="loading-cell">Cargando observaciones...</td>
                </tr>
              )}

              {selectedZone && !loadingObs && observations.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-cell">No se encontraron observaciones en esta zona.</td>
                </tr>
              )}

              {selectedZone && !loadingObs &&
                observations.map((obs) => (
                  <tr key={obs.id_observacion}>
                    <td className="desc-cell">{obs.condiciones}</td>
                    <td>{obs.recursos_necesarios}</td>
                    <td>{obs.observaciones_texto}</td>
                    <td>{obs.latitud.toFixed(4)}, {obs.longitud.toFixed(4)}</td>
                    <td>
                      {new Date(obs.creado_en).toLocaleDateString('es-MX', {
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}