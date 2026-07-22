import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../../auth/presentation/store/authStore';
import { useFCM } from '../../../../shared/hooks/useFCM';
import './CoordinatorLayout.css';

export default function CoordinatorLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, role, logout } = useAuthStore();
  
  useFCM();

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
    <div className="coord-layout glass-bg-container">
      {/* Ambient Glassmorphism Orbs */}
      <div className="ambient-orb ambient-orb--fire" />
      <div className="ambient-orb ambient-orb--ember" />
      <div className="ambient-orb ambient-orb--ash" />
      
      {/* Barra lateral */}
      <aside className="coord-sidebar glass-panel">
        <div className="sidebar-brand">
          <div className="brand-logo-box"></div>
          <span className="brand-text">PyroGuard</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/coordinator/dashboard" 
            className={`nav-link ${location.pathname.includes('/dashboard') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/coordinator/reportes" 
            className={`nav-link ${location.pathname.includes('/reportes') ? 'active' : ''}`}
          >
            Reportes
          </Link>
          <Link 
            to="/coordinator/brigadas" 
            className={`nav-link ${location.pathname.includes('/brigadas') ? 'active' : ''}`}
          >
            Brigadas
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="circle-large user-avatar">
              {getInitials(userName || 'Usuario')}
            </div>
            <div className="user-details">
              <span className="user-name">{userName || 'Usuario'}</span>
              <span className="user-role">{role || 'Coordinador'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="nav-link logout-btn">
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </aside>

      {}
      <main className="coord-main">
        <Outlet />
      </main>
    </div>
  );
}