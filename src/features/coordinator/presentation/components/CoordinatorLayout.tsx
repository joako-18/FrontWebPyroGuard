import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './CoordinatorLayout.css';

export default function CoordinatorLayout() {
  const location = useLocation();
  
  return (
    <div className="coord-layout">
      {/* Sidebar Izquierdo */}
      <aside className="coord-sidebar">
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
          <Link to="/login" className="nav-link logout-btn">
            <LogOut size={16} />
            Salir
          </Link>
          <div className="footer-circles">
            <div className="circle-large"></div>
            <div className="circle-small"></div>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="coord-main">
        <Outlet />
      </main>
    </div>
  );
}