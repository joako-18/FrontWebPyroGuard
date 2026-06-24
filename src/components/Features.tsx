import './Features.css'

const FEATURES = [
  {
    icon: '🌡️',
    title: 'Datos Meteorológicos en Tiempo Real',
    desc: 'Integración con APIs públicas que entregan variables climáticas por zona cada 30 minutos para alimentar el modelo de predicción continuamente.',
    items: ['Open-Meteo API', 'SMN México', 'Temperatura · Humedad · Viento · Precipitación'],
  },
  {
    icon: '🧠',
    title: 'Predicción con Machine Learning',
    desc: 'Tres modelos en conjunto: clasificador de riesgo actual, predictor LSTM a 72 horas y detector de anomalías meteorológicas por zona.',
    items: ['Random Forest + XGBoost', 'LSTM para series de tiempo', 'Isolation Forest para anomalías'],
  },
  {
    icon: '🔥',
    title: 'Índice FWI Automatizado',
    desc: 'Cálculo automático del Fire Weather Index, estándar internacional de la Conafor, combinando temperatura, humedad, viento y precipitación acumulada.',
    items: ['Estándar canadiense / Conafor', 'Actualización cada 30 minutos', 'Base del modelo de clasificación'],
  },
  {
    icon: '📋',
    title: 'Directivas NLP Automatizadas',
    desc: 'LangChain genera textos distintos para cada usuario: reporte técnico para el coordinador, directiva operativa para el brigadista y mensaje cotidiano para la comunidad.',
    items: ['LangChain + LLM', 'SpaCy + normativas Conafor', 'Tres niveles de lenguaje por destinatario'],
  },
  {
    icon: '📱',
    title: 'App Móvil para Brigadas',
    desc: 'Aplicación Flutter con mapa de riesgo en tiempo real, alertas geolocalizadas, botón de emergencia y funcionamiento completo sin conexión a internet.',
    items: ['Modo offline + sincronización', 'Botón de emergencia GPS', 'Navegación hacia zona asignada'],
  },
  {
    icon: '🗺️',
    title: 'Dashboard Web para Coordinadores',
    desc: 'Panel con mapa interactivo, series de tiempo de evolución del riesgo, asignación de brigadas, reportes automáticos y estadísticas ejecutivas.',
    items: ['React.js + Mapbox GL', 'Reportes PDF automatizados', 'Seguimiento de brigadas en tiempo real'],
  },
  {
    icon: '🏘️',
    title: 'Portal Comunitario Público',
    desc: 'Portal web accesible sin registro donde la comunidad consulta el riesgo de su zona, se suscribe a alertas por SMS o correo y reporta avistamientos.',
    items: ['Sin registro requerido', 'Alertas por SMS y correo', 'Lenguaje accesible para ciudadanos'],
  },
  {
    icon: '⛏️',
    title: 'Minería de Datos Históricos',
    desc: 'Análisis de 10 años de registros de incendios de la Conafor para identificar patrones estacionales, zonas de reincidencia y correlaciones climáticas.',
    items: ['Dataset Conafor 10 años', 'Patrones estacionales por zona', 'Validación del modelo predictivo'],
  },
]

export default function Features() {
  return (
    <section id="funcionalidades" className="features">
      <div className="features__bg-glow" />
      <div className="container">
        <div className="features__header">
          <span className="tag">Funcionalidades</span>
          <h2 className="section-title">Tecnología al servicio<br /><span>del bosque</span></h2>
          <p className="section-subtitle">
            Ocho módulos integrados que cubren el ciclo completo: desde la captura
            meteorológica hasta la alerta comunitaria.
          </p>
        </div>
        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}>
              <div className="feature-card__top">
                <span className="feature-card__icon">{f.icon}</span>
                <div className="feature-card__glow" />
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
              <ul className="feature-card__items">
                {f.items.map((item, j) => (
                  <li key={j}>
                    <span className="feature-dot">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}