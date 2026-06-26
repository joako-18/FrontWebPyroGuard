import { useState, type FormEvent } from 'react';
import type { ThresholdConfig } from '../../domain/entities/ThresholdConfig';
import './ThresholdForm.css';

interface Props {
  initial: ThresholdConfig | null;
  onSave: (config: ThresholdConfig) => Promise<void>;
  disabled?: boolean;
}

export default function ThresholdForm({ initial, onSave, disabled }: Props) {
  const [critTemp, setCritTemp] = useState(initial?.critico.temp ?? 32);
  const [critHum, setCritHum] = useState(initial?.critico.hum ?? 40);
  const [medTemp, setMedTemp] = useState(initial?.medio.temp ?? 30);
  const [medHum, setMedHum] = useState(initial?.medio.hum ?? 50);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Sincronizar si initial cambia
  if (initial) {
    if (critTemp !== initial.critico.temp) setCritTemp(initial.critico.temp);
    if (critHum !== initial.critico.hum) setCritHum(initial.critico.hum);
    if (medTemp !== initial.medio.temp) setMedTemp(initial.medio.temp);
    if (medHum !== initial.medio.hum) setMedHum(initial.medio.hum);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await onSave({
        critico: { temp: critTemp, hum: critHum },
        medio: { temp: medTemp, hum: medHum },
      });
      setMessage('✅ Umbrales actualizados correctamente');
    } catch {
      setMessage('❌ Error al guardar los umbrales');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="threshold-form-container">
      <h3 className="threshold-title">Configuración de Umbrales</h3>
      <form onSubmit={handleSubmit} className="threshold-form">
        <div className="threshold-level">
          <h4>Crítico</h4>
          <label>
            Temperatura (°C):
            <input
              type="number"
              step="0.1"
              value={critTemp}
              onChange={(e) => setCritTemp(Number(e.target.value))}
              disabled={disabled || saving}
            />
          </label>
          <label>
            Humedad (%):
            <input
              type="number"
              step="0.1"
              value={critHum}
              onChange={(e) => setCritHum(Number(e.target.value))}
              disabled={disabled || saving}
            />
          </label>
        </div>
        <div className="threshold-level">
          <h4>Medio</h4>
          <label>
            Temperatura (°C):
            <input
              type="number"
              step="0.1"
              value={medTemp}
              onChange={(e) => setMedTemp(Number(e.target.value))}
              disabled={disabled || saving}
            />
          </label>
          <label>
            Humedad (%):
            <input
              type="number"
              step="0.1"
              value={medHum}
              onChange={(e) => setMedHum(Number(e.target.value))}
              disabled={disabled || saving}
            />
          </label>
        </div>
        <div className="threshold-actions">
          <button type="submit" className="btn-save-thresholds" disabled={disabled || saving}>
            {saving ? 'Guardando...' : 'Actualizar Umbrales'}
          </button>
          {message && <p className="threshold-message">{message}</p>}
        </div>
      </form>
    </div>
  );
}