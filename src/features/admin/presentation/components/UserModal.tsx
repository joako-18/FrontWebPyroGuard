import { useState } from 'react';
import type { FormEvent } from 'react';
import { X } from 'lucide-react';
import { useCreateUser } from '../../../auth/presentation/hooks/useCreateUser';
import type { Role as AuthRole } from '../../../auth/domain/entities/User';
import type { AdminUser, Role } from '../../domain/entities/AdminUser';
import './UserModal.css';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Si se provee, el modal entra en modo "editar" precargado con estos datos */
  userToEdit?: AdminUser | null;
  /** Se llama tras crear con éxito */
  onUserCreated?: () => void;
  /** Se llama tras editar con éxito: (id, rol, activo) */
  onUserUpdated?: (id: string, role: Role, isActive: boolean) => Promise<boolean>;
}

export default function UserModal({
  isOpen,
  onClose,
  userToEdit = null,
  onUserCreated,
  onUserUpdated,
}: UserModalProps) {
  const isEditMode = Boolean(userToEdit);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [isActive, setIsActive] = useState(true);
  const [editError, setEditError] = useState<string | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Rastrea el id del usuario que se cargó por última vez en el formulario,
  // para detectar "cambió la prop userToEdit" durante el render sin usar
  // un efecto (patrón recomendado por React: "Adjusting state when a prop changes").
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);

  const { createUser, isLoading: isCreating, error: createError } = useCreateUser();

  const currentEditId = userToEdit?.id ?? null;

  if (isOpen && currentEditId !== loadedUserId) {
    // Esto corre durante el render (no en un efecto), por lo que React
    // descarta este render y vuelve a renderizar de inmediato con el
    // estado actualizado, sin el "doble render" que penaliza el linter.
    setLoadedUserId(currentEditId);
    if (userToEdit) {
      setRole(userToEdit.role);
      setIsActive(userToEdit.isActive);
    } else {
      setRole('');
      setIsActive(true);
    }
    setName('');
    setEmail('');
    setPassword('');
    setEditError(null);
  }

  if (!isOpen) return null;

  const isLoading = isEditMode ? isSavingEdit : isCreating;
  const error = isEditMode ? editError : createError;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!role) return;

    if (isEditMode && userToEdit && onUserUpdated) {
      setIsSavingEdit(true);
      setEditError(null);
      const ok = await onUserUpdated(userToEdit.id, role, isActive);
      setIsSavingEdit(false);
      if (ok) onClose();
      return;
    }

    // Modo crear: el rol aquí usa los mismos valores que AuthRole (Admin/Coordinador/Analista/Brigadista)
    const user = await createUser(name, email, password, role as AuthRole);
    if (user) {
      onUserCreated?.();
      onClose();
    }
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content fade-up">
        <button className="modal-close" onClick={handleClose}>
          <X size={20} />
        </button>

        <h2 className="modal-title">
          {isEditMode ? (
            <>Editar <span>Usuario</span></>
          ) : (
            <>Crear Nuevo <span>Usuario</span></>
          )}
        </h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && (
            <div className="modal-error" role="alert">
              {error}
            </div>
          )}

          {isEditMode && userToEdit && (
            <div className="modal-readonly-info">
              <p><strong>Nombre:</strong> {userToEdit.name}</p>
              <p><strong>Correo:</strong> {userToEdit.email}</p>
            </div>
          )}

          {!isEditMode && (
            <>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="correo@pyroguard.mx"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Rol Asignado</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              disabled={isLoading}
              required
            >
              <option value="" disabled>Selecciona un rol</option>
              <option value="Admin">Administrador</option>
              <option value="Coordinador">Coordinador</option>
              <option value="Analista">Analista</option>
              <option value="Brigadista">Brigadista</option>
            </select>
          </div>

          {isEditMode ? (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkbox-custom"></span>
                Usuario activo
              </label>
            </div>
          ) : (
            <div className="form-group">
              <label>Contraseña Temporal</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                minLength={8}
                required
              />
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Guardando...' : isEditMode ? 'Guardar Cambios' : 'Guardar Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}