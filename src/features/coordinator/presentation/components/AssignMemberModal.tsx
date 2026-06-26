import { useState, useEffect, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useBrigades } from '../hooks/useBrigades';

interface AssignMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (brigadeId: string, memberId: string) => Promise<void>;
  brigadeId: string;
}

export default function AssignMemberModal({ isOpen, onClose, onSave, brigadeId }: AssignMemberModalProps) {
  const [memberId, setMemberId] = useState('');
  const [saving, setSaving] = useState(false);
  const [brigadistas, setBrigadistas] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  
  const { getBrigadistas } = useBrigades();

  useEffect(() => {
    if (isOpen) {
      setLoadingUsers(true);
      getBrigadistas()
        .then((data) => setBrigadistas(data))
        .catch((err) => console.error("Error fetching brigadistas", err))
        .finally(() => setLoadingUsers(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(brigadeId, memberId);
      setMemberId('');
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
        
        <h2 className="modal-title">Asignar <span>Brigadista</span></h2>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecciona un Brigadista</label>
            {loadingUsers ? (
              <div style={{ color: 'var(--text-muted)' }}>Cargando brigadistas...</div>
            ) : (
              <select 
                value={memberId} 
                onChange={(e) => setMemberId(e.target.value)} 
                required
                className="modal-select"
              >
                <option value="" disabled>-- Selecciona --</option>
                {brigadistas.map((b) => (
                  <option key={b.id_usuario} value={b.id_usuario}>
                    {b.nombre} ({b.email})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={saving || !memberId.trim()}>
              {saving ? 'Asignando...' : 'Asignar Brigadista'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
