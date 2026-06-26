import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, Bell, Map, LogOut } from 'lucide-react';
import './AdminLayout.css';

export default function AdminLayout() {
  const location = useLocation();
  
  return (
    <div className="admin-layout">
      {/* Sidebar Izquierdo */}
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
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}