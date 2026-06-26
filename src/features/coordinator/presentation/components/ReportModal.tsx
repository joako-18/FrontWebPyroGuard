import type { FormEvent } from 'react';
import { X } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content fade-up">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 className="modal-title">Generar <span>Reporte</span></h2>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tipo de Reporte</label>
            <select required defaultValue="">
              <option value="" disabled>Selecciona el tipo</option>
              <option value="diario">Resumen Diario</option>
              <option value="semanal">Consolidado Semanal</option>
              <option value="mensual">Informe Mensual</option>
              <option value="incidente">Reporte de Incidente Específico</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group half-width">
              <label>Fecha Inicio</label>
              <input type="date" required />
            </div>
            <div className="form-group half-width">
              <label>Fecha Fin</label>
              <input type="date" required />
            </div>
          </div>

          <div className="form-group">
            <label>Zona Específica (Opcional)</label>
            <select defaultValue="todas">
              <option value="todas">Todas las zonas</option>
              <option value="z01">Z01 - Sierra Madre</option>
              <option value="z02">Z02 - Bosque Sur</option>
              <option value="z08">Z08 - Durango Core</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Generar PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}