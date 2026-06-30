import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/presentation/store/authStore';
import type { Role } from '../../features/auth/domain/entities/User';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}
