import './CTA.css'

export default function CTA() {
  return (
    <section id="contacto" className="cta">
      <div className="cta__flames">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="cta-flame" style={{ '--i': i }} />
        ))}
      </div>
      <div className="cta__embers">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="cta-ember" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }} />
        ))}
      </div>
      <div className="container cta__content">
        <span className="tag">Proyecto</span>
        <h2 className="cta__title">
          PREVENIR ES<br />
          <span>POSIBLE.</span>
        </h2>
        <p className="cta__desc">
          PyroGuard AI representa el cambio de paradigma que México necesita:
          de respuesta reactiva a <strong>prevención activa</strong> mediante
          inteligencia artificial aplicada a datos meteorológicos reales y
          comunicación directa con las comunidades en riesgo.
        </p>
        <div className="cta__meta">
          <div className="meta-item">
            <span className="meta-label">Categoría</span>
            <span className="meta-value">Ciencias Naturales</span>
          </div>
          <div className="meta-sep" />
          <div className="meta-item">
            <span className="meta-label">Proyecto</span>
            <span className="meta-value">PyroGuard AI</span>
          </div>
          <div className="meta-sep" />
          <div className="meta-item">
            <span className="meta-label">Usuarios</span>
            <span className="meta-value">5 perfiles cubiertos</span>
          </div>
          <div className="meta-sep" />
          <div className="meta-item">
            <span className="meta-label">Anticipación</span>
            <span className="meta-value">72 horas de predicción</span>
          </div>
        </div>
      </div>
    </section>
  )
}