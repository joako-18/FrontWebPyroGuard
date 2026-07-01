import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../auth/presentation/store/authStore';
import './AdminLayout.css';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, role, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <div className="admin-layout">
      {}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo-box"></div>
          <span className="brand-text">PyroGuard</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin/usuarios" 
            className={`nav-link ${location.pathname.includes('/usuarios') ? 'active' : ''}`}
          >
            Usuarios y permisos
          </Link>
          <Link 
            to="/admin/comunicados" 
            className={`nav-link ${location.pathname.includes('/comunicados') ? 'active' : ''}`}
          >
            Comunicados
          </Link>
          <Link 
            to="/admin/zonas" 
            className={`nav-link ${location.pathname.includes('/zonas') ? 'active' : ''}`}
          >
            Zonas
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="circle-large user-avatar">
              {getInitials(userName || 'Usuario')}
            </div>
            <div className="user-details">
              <span className="user-name">{userName || 'Usuario'}</span>
              <span className="user-role">{role || 'Administrador'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="nav-link logout-btn">
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </aside>

      {}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}