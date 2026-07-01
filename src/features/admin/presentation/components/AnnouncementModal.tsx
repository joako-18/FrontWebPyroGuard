import { useState } from 'react';
import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import type { AlertLevel } from '../../domain/entities/Announcement';
import './AnnouncementModal.css';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
    onCreate: (
    title: string,
    description: string,
    zones: string,
    alertLevel: AlertLevel,
    validUntil: string
  ) => Promise<boolean>;
}

function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}


function defaultValidUntil(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return toDatetimeLocalValue(d);
}

export default function AnnouncementModal({ isOpen, onClose, onCreate }: AnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zones, setZones] = useState('');
  const [alertLevel, setAlertLevel] = useState<AlertLevel | ''>('');
  const [validUntil, setValidUntil] = useState(defaultValidUntil());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setZones('');
    setAlertLevel('');
    setValidUntil(defaultValidUntil());
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!alertLevel) return;

    setIsSubmitting(true);
    setError(null);

    // El <input type="datetime-local"> no incluye zona horaria;
    // new Date() lo interpreta en hora local del navegador, que es lo esperado.
    const validUntilISO = new Date(validUntil).toISOString();

    const ok = await onCreate(title, description, zones, alertLevel, validUntilISO);

    setIsSubmitting(false);
    if (ok) {
      resetForm();
      onClose();
    } else {
      setError('No se pudo publicar el comunicado. Intenta de nuevo.');
    }
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content fade-up modal-large">
        <button className="modal-close" onClick={handleClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title">Nuevo <span>Comunicado</span></h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && (
            <div className="modal-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Título del comunicado</label>
            <input
              type="text"
              placeholder="Ej. Alerta preventiva: altas temperaturas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción detallada</label>
            <textarea
              rows={4}
              placeholder="Escribe el cuerpo del comunicado aquí..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>Zonas Afectadas</label>
              <input
                type="text"
                placeholder="Ej. Z1, Z2, Z4"
                value={zones}
                onChange={(e) => setZones(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group half-width">
              <label>Nivel de Alerta</label>
              <select
                value={alertLevel}
                onChange={(e) => setAlertLevel(e.target.value as AlertLevel)}
                disabled={isSubmitting}
                required
              >
                <option value="" disabled>Selecciona el nivel</option>
                <option value="info">Informativo</option>
                <option value="preventive">Preventivo</option>
                <option value="critical">Crítico</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Vigente hasta</label>
            <input
              type="datetime-local"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Publicando...' : 'Publicar Comunicado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}