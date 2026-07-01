import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../../auth/presentation/store/authStore';

interface BrigadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, coordinatorId: string) => Promise<void>;
}

export default function BrigadeModal({ isOpen, onClose, onSave }: BrigadeModalProps) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const accessToken = useAuthStore(state => state.accessToken);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let coordinatorId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; 
      if (accessToken) {
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          coordinatorId = payload.sub || payload.id_usuario || payload.id || coordinatorId;
        } catch (err) {
          console.error("Error decoding token", err);
        }
      }
      
      await onSave(name, coordinatorId);
      setName('');
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
        
        <h2 className="modal-title">Nueva <span>Brigada</span></h2>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la Brigada</label>
            <input 
              type="text" 
              placeholder="Ej. Brigada Fénix" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={saving || !name.trim()}>
              {saving ? 'Creando...' : 'Crear Brigada'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}