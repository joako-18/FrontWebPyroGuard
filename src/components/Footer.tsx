import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="fire-divider" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🔥 PyroGuard <em>AI</em></span>
          <p>Sistema de Predicción de Riesgo de Incendio Forestal mediante Análisis de Datos Meteorológicos, Machine Learning y Alertas Comunitarias en Chiapas, México.</p>
        </div>
        <div className="footer__links">
          <span className="footer__section-label">Navegación</span>
          <a href="#problematica">Problemática</a>
          <a href="#como-funciona">Cómo Funciona</a>
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#usuarios">Usuarios</a>
          <a href="#tecnologia">Tecnología</a>
          <a href="#contacto">Proyecto</a>
        </div>
        <div className="footer__tech">
          <span className="footer__section-label">Categoría</span>
          <span className="footer__badge">🌿 Ciencias Naturales</span>
          <span className="footer__badge">🤖 Machine Learning</span>
          <span className="footer__badge">💬 NLP y LLM</span>
          <span className="footer__badge">🌡️ APIs Meteorológicas</span>
          <span className="footer__badge">📱 Móvil + Web + Comunidad</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <div className="footer__bottom-inner">
          <span>PyroGuard AI — Prevención Activa de Incendios Forestales en Chiapas, México</span>
          <div className="footer__legal">
            <a href="/aviso-de-privacidad" className="footer__legal-link">Aviso de Privacidad</a>
            <a href="/eliminar-datos" className="footer__legal-link">Eliminar mis datos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}