import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import TechStack from './components/TechStack'
import Users from './components/Users'
import CTA from './components/CTA'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import DeleteData from './components/DeleteData'
import './index.css'
import Login from './features/auth/presentation/pages/Login'
import AdminLayout from './features/admin/presentation/components/AdminLayout';
import UsersPage from './features/admin/presentation/pages/UsersPage';
import AnnouncementsPage from './features/admin/presentation/pages/AnnouncementsPage';
import CoordinatorLayout from './features/coordinator/presentation/components/CoordinatorLayout';
import BrigadesPage from './features/coordinator/presentation/pages/BrigadesPage';
import ReportsPage from './features/coordinator/presentation/pages/ReportsPage';
import DashboardPage from './features/coordinator/presentation/pages/DashboardPage';
import ZonesPage from './features/admin/presentation/pages/ZonesPage';
import ProtectedRoute from './app/routes/ProtectedRoute';
import NotFound from './app/routes/NotFound';

function Home() {
  return (
    <div className="app">
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Users />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aviso-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/eliminar-datos" element={<DeleteData />} />
        
        {}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="usuarios" element={<UsersPage />} />
            <Route path="comunicados" element={<AnnouncementsPage />} />
            <Route path="zonas" element={<ZonesPage />} />
          </Route>
        </Route>

        {}
        <Route element={<ProtectedRoute allowedRoles={['Coordinador']} />}>
          <Route path="/coordinator" element={<CoordinatorLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="reportes" element={<ReportsPage />} />
            <Route path="brigadas" element={<BrigadesPage />} />
          </Route>
        </Route>

        {}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}