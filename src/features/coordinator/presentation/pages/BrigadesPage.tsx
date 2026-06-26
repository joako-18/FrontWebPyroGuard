import { useState, useMemo } from 'react';
import { CheckCircle2, Activity, AlertTriangle, UserPlus, MapPin } from 'lucide-react';
import BrigadeModal from '../components/BrigadeModal';
import AssignZoneModal from '../components/AssignZoneModal';
import AssignMemberModal from '../components/AssignMemberModal';
import { useBrigades } from '../hooks/useBrigades';
import { useInterventions } from '../hooks/useInterventions';
import './BrigadesPage.css';

export default function BrigadesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignZoneData, setAssignZoneData] = useState<string | null>(null);
  const [assignMemberData, setAssignMemberData] = useState<string | null>(null);

  const { brigades, isLoading, error, createBrigade, assignMember, refetch: refetchBrigades } = useBrigades();
  const { createIntervention } = useInterventions();

  const handleSaveBrigade = async (name: string, coordinatorId: string) => {
    await createBrigade(name, coordinatorId);
  };

  const handleAssignZone = async (brigadeId: string, zoneId: string, notes: string) => {
    await createIntervention(brigadeId, zoneId, notes);
    await refetchBrigades();
  };

  const handleAssignMember = async (brigadeId: string, memberId: string) => {
    await assignMember(brigadeId, memberId);
    await refetchBrigades();
  };

  const summary = useMemo(() => {
    return {
      disponibles: brigades.filter(b => b.isActive).length, // Activas son DISPONIBLES
      enOperacion: 0, // Mock: Se necesitan intervenciones
      fueraServicio: brigades.filter(b => !b.isActive).length
    };
  }, [brigades]);

  return (
    <div className="brigades-page fade-up">
      <header className="page-header header-between">
        <h1 className="page-title">Brigadas</h1>
        <button className="btn-new" onClick={() => setIsModalOpen(true)}>
          Nueva Brigada
        </button>
      </header>

      {/* Tarjetas de Resumen */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-header">
            <span>DISPONIBLES</span>
            <CheckCircle2 size={16} className="icon-muted" />
          </div>
          <div className="summary-value">{summary.disponibles}</div>
        </div>
        <div className="summary-card">
          <div className="summary-header">
            <span>EN OPERACIÓN</span>
            <Activity size={16} className="icon-muted" />
          </div>
          <div className="summary-value">{summary.enOperacion}</div>
        </div>
        <div className="summary-card">
          <div className="summary-header">
            <span>FUERA DE SERVICIO</span>
            <AlertTriangle size={16} className="icon-muted" />
          </div>
          <div className="summary-value">{summary.fueraServicio}</div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">Cargando brigadas...</div>
      ) : error ? (
        <div className="error-state">Error: {error}</div>
      ) : (
        <div className="brigades-grid">
          {brigades.map((brigade) => {
            // Asumimos que "activa: true" significa que existe y está DISPONIBLE,
            // "activa: false" significa FUERA DE SERVICIO.
            // Para saber si está "EN OPERACIÓN" idealmente necesitamos cruzar con sus intervenciones.
            const statusLabel = brigade.isActive ? 'DISPONIBLE' : 'FUERA DE SERVICIO';
            return (
              <div className="brigade-card" key={brigade.id}>
                <div className="brigade-header">
                  <span className="brigade-id">{brigade.id.split('-')[0]}</span>
                  <span className={`status-badge badge-${statusLabel.replace(/\s+/g, '-').toLowerCase()}`}>
                    {statusLabel}
                  </span>
                </div>
                
                <h3 className="brigade-name">{brigade.name}</h3>
                
                <div className="brigade-meta-actions">
                  <button className="btn-icon-text" onClick={() => setAssignMemberData(brigade.id)}>
                    <UserPlus size={14} /> <span>Añadir Miembro</span>
                  </button>
                </div>

                <div className="brigade-action">
                  {brigade.isActive ? (
                    <button className="btn-outline-action" onClick={() => setAssignZoneData(brigade.id)}>
                      VINCULAR A ZONA →
                    </button>
                  ) : (
                    <button className="btn-disabled" disabled>
                      FUERA DE SERVICIO
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <BrigadeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveBrigade} 
      />
      
      {assignZoneData && (
        <AssignZoneModal
          isOpen={true}
          onClose={() => setAssignZoneData(null)}
          onSave={handleAssignZone}
          brigadeId={assignZoneData}
        />
      )}

      {assignMemberData && (
        <AssignMemberModal
          isOpen={true}
          onClose={() => setAssignMemberData(null)}
          onSave={handleAssignMember}
          brigadeId={assignMemberData}
        />
      )}
    </div>
  );
}