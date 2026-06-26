import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import './Login.css';

type Role = 'admin' | 'coordinator';

export default function Login() {
  const [role, setRole] = useState<Role>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const embersRef = useRef<HTMLDivElement>(null);
  const { login, isLoading, error } = useLogin();

  // Efecto de brasas de fuego para mantener la consistencia con el Hero
  useEffect(() => {
    const container = embersRef.current;
    if (!container) return;
    const embers = Array.from({ length: 15 }, () => {
      const el = document.createElement('div');
      el.className = 'ember';
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${3 + Math.random() * 5}s;
      `;
      return el;
    });
    embers.forEach(e => container.appendChild(e));
    return () => embers.forEach(e => e.remove());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password, role);
  };

  return (
    <div className="login-page">
      {/* Background elements */}
      <div className="login__bg">
        <div className="login__bg-grid" />
        <div className="login__bg-radial" />
      </div>
      <div className="hero__embers" ref={embersRef} />

      {/* Navigation Bar Header (Minimalist for Login) */}
      <nav className="login__nav">
        <Link to="/" className="hero__logo">
          <span className="hero__logo-icon">🔥</span>
          <span className="hero__logo-text">PyroGuard <em>AI</em></span>
        </Link>
        <Link to="/" className="btn-ghost btn-sm">Volver al Inicio</Link>
      </nav>

      <div className="login__container fade-up">
        <div className="login__card">
          <div className="login__header">
            <h1 className="login__title">Acceso al <span>Sistema</span></h1>
            <p className="login__subtitle">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Selector de Rol */}
          <div className="login__role-tabs">
            <button
              className={`role-tab ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
              type="button"
              disabled={isLoading}
            >
              Administrador
            </button>
            <button
              className={`role-tab ${role === 'coordinator' ? 'active' : ''}`}
              onClick={() => setRole('coordinator')}
              type="button"
              disabled={isLoading}
            >
              Coordinador
            </button>
          </div>

          <form className="login__form" onSubmit={handleSubmit}>
            {error && (
              <div className="login__error" role="alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`correo@${role === 'admin' ? 'admin' : 'coord'}.pyroguard.mx`}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkbox-custom"></span>
                Recordarme
              </label>
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn-primary login__btn" disabled={isLoading}>
              {isLoading
                ? 'Ingresando...'
                : `Iniciar Sesión como ${role === 'admin' ? 'Administrador' : 'Coordinador'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}