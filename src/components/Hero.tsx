import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const NAV_LINKS = ['Problemática', 'Cómo Funciona', 'Funcionalidades', 'Usuarios', 'Tecnología']

export default function Hero() {
  const embersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = embersRef.current
    if (!container) return
    const embers = Array.from({ length: 28 }, () => {
      const el = document.createElement('div')
      el.className = 'ember'
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 30}%;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${4 + Math.random() * 8}s;
      `
      return el
    })
    embers.forEach(e => container.appendChild(e))
    return () => embers.forEach(e => e.remove())
  }, [])

  return (
    <header className="hero">
      <nav className="hero__nav">
        <div className="container hero__nav-inner">
          <div className="hero__logo">
            <span className="hero__logo-icon">🔥</span>
            <span className="hero__logo-text">PyroGuard <em>AI</em></span>
          </div>
          <ul className="hero__nav-links">
            {NAV_LINKS.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          {}
          <Link to="/login" className="hero__nav-cta">
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      <div className="hero__bg">
        <div className="hero__bg-grid" />
        <div className="hero__bg-radial" />
        <div className="hero__bg-forest" />
      </div>

      <div className="hero__embers" ref={embersRef} />

      <div className="hero__flames">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flame-col" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="badge-dot" />
          Sistema de Alerta Temprana · Ciencias Naturales
        </div>

        <h1 className="hero__title fade-up" style={{ animationDelay: '0.2s' }}>
          <span className="hero__title-line">PYROGUARD</span>
          <span className="hero__title-accent">AI</span>
          <span className="hero__title-sub">Vigilancia Forestal Inteligente</span>
        </h1>

        <p className="hero__desc fade-up" style={{ animationDelay: '0.5s' }}>
          Sistema de predicción de riesgo de incendio forestal que analiza{' '}
          <strong>datos meteorológicos en tiempo real</strong> mediante machine learning
          para alertar a brigadas, coordinadores y comunidades antes de que el fuego comience.
        </p>

        <div className="hero__stats fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="stat">
            <span className="stat__num">400K</span>
            <span className="stat__label">hectáreas perdidas al año en México</span>
          </div>
          <div className="stat__sep" />
          <div className="stat">
            <span className="stat__num">7–10×</span>
            <span className="stat__label">ahorro por peso invertido en prevención</span>
          </div>
          <div className="stat__sep" />
          <div className="stat">
            <span className="stat__num">72h</span>
            <span className="stat__label">de anticipación en predicción de riesgo</span>
          </div>
          <div className="stat__sep" />
          <div className="stat">
            <span className="stat__num">5</span>
            <span className="stat__label">tipos de usuarios cubiertos</span>
          </div>
        </div>

        <div className="hero__actions fade-up" style={{ animationDelay: '0.9s' }}>
          <a href="#como-funciona" className="btn-primary">Explorar Sistema</a>
          <a href="#tecnologia" className="btn-ghost">Stack Técnico →</a>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </header>
  )
}