import { useState, useEffect, type FormEvent } from 'react';
import { X } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import { AnalyticsRemoteDataSource } from '../../data/dataSources/AnalyticsRemoteDataSource';

interface AssignZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (brigadeId: string, zoneId: string, notes: string) => Promise<void>;
  brigadeId: string;
}

export default function AssignZoneModal({ isOpen, onClose, onSave, brigadeId }: AssignZoneModalProps) {
  const [zoneId, setZoneId] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [zones, setZones] = useState<{id_zona: string, nombre: string}[]>([]);
  const [loadingZones, setLoadingZones] = useState(true);

  useEffect(() => {
    let active = true;
    if (isOpen) {
      Promise.resolve().then(() => {
        if (active) setLoadingZones(true);
      });
      const ds = new AnalyticsRemoteDataSource();
      ds.getSimpleZones()
        .then((data) => {
          if (active) setZones(data);
        })
        .catch((err) => console.error("Error fetching zones", err))
        .finally(() => {
          if (active) setLoadingZones(false);
        });
    }
    return () => { active = false; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(brigadeId, zoneId, notes);
      setZoneId('');
      setNotes('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content fade-up">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 className="modal-title">Vincular a <span>Zona (Intervención)</span></h2>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecciona la Zona</label>
            {loadingZones ? (
              <Skeleton height={42} />
            ) : (
              <select 
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                required
                className="modal-select"
              >
                <option value="" disabled>-- Selecciona --</option>
                {zones.map((z) => (
                  <option key={z.id_zona} value={z.id_zona}>
                    {z.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="form-group">
            <label>Observaciones Iniciales</label>
            <textarea 
              placeholder="Ej. Despliegue preventivo por alta temperatura..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required 
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={saving || !zoneId.trim()}>
              {saving ? 'Vinculando...' : 'Iniciar Intervención'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
