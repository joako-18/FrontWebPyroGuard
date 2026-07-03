import { useState } from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import UserModal from '../components/UserModal';
import { useUsers } from '../hooks/useUsers';
import type { AdminUser } from '../../domain/entities/AdminUser';
import './UsersPage.css';

const getRoleClass = (role: string) => {
  switch (role) {
    case 'Admin': return 'role-admin';
    case 'Coordinador': return 'role-coord';
    case 'Analista': return 'role-analyst';
    case 'Brigadista': return 'role-brigade';
    default: return '';
  }
};

const getRoleLabel = (role: string) => {
  return role === 'Admin' ? 'Administrador' : role;
};

const getInitials = (name: string) => {
  return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
};

export default function UsersPage() {
  const { users, isLoading, error, fetchUsers, deleteUser, updateUser, toggleActive } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: AdminUser) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
  };

  const handleDelete = async (user: AdminUser) => {
    const confirmed = window.confirm(`¿Eliminar a "${user.name}"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setDeletingId(user.id);
    await deleteUser(user.id);
    setDeletingId(null);
  };

  return (
    <div className="users-page fade-up">
      <header className="page-header">
        <h1 className="page-title">Usuarios y permisos</h1>
      </header>

      <div className="page-toolbar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o correo..."
          />
          <button className="search-btn">
            <Search size={16} />
          </button>
        </div>
        <button className="btn-new-user" onClick={openCreateModal}>
          + Nuevo Usuario
        </button>
      </div>

      {error && <div className="page-error">{error}</div>}

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i}>
                    <td>
                      <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Skeleton circle width={32} height={32} />
                        <Skeleton width={120} />
                      </div>
                    </td>
                    <td><Skeleton width={180} /></td>
                    <td><Skeleton width={100} /></td>
                    <td><Skeleton width={40} height={20} borderRadius={10} /></td>
                    <td>
                      <div className="action-buttons" style={{ display: 'flex', gap: '8px' }}>
                        <Skeleton width={32} height={32} borderRadius={6} />
                        <Skeleton width={32} height={32} borderRadius={6} />
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}

            {!isLoading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5}>No se encontraron usuarios.</td>
              </tr>
            )}

            {!isLoading &&
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">{getInitials(user.name)}</div>
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td className="user-email">{user.email}</td>
                  <td>
                    <span className={`role-text ${getRoleClass(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`active-toggle ${user.isActive ? 'active-toggle--on' : 'active-toggle--off'}`}
                      onClick={() => toggleActive(user)}
                      title={user.isActive ? 'Activo (clic para desactivar)' : 'Inactivo (clic para activar)'}
                      type="button"
                    >
                      <span className="active-toggle__knob" />
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon-sq"
                        title="Editar"
                        onClick={() => openEditModal(user)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="btn-icon-sq"
                        title="Eliminar"
                        onClick={() => handleDelete(user)}
                        disabled={deletingId === user.id}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userToEdit={userToEdit}
        onUserCreated={fetchUsers}
        onUserUpdated={updateUser}
      />
    </div>
  );
}