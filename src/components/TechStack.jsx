import './TechStack.css'

const CATEGORIES = [
  {
    cat: 'Datos Meteorológicos',
    icon: '🌡️',
    techs: [
      { name: 'Open-Meteo API', desc: 'Datos climáticos en tiempo real y pronóstico 7 días' },
      { name: 'SMN México', desc: 'Estaciones meteorológicas oficiales nacionales' },
      { name: 'Índice FWI', desc: 'Fire Weather Index — estándar Conafor / Canadá' },
      { name: 'Dataset Conafor', desc: 'Historial de incendios Chiapas 10 años' },
    ],
  },
  {
    cat: 'Machine Learning',
    icon: '🤖',
    techs: [
      { name: 'Scikit-learn', desc: 'Random Forest y clasificación de riesgo' },
      { name: 'XGBoost', desc: 'Gradient Boosting como comparador de entrenamiento' },
      { name: 'LSTM / PyTorch', desc: 'Predicción de series de tiempo a 72 horas' },
      { name: 'Isolation Forest', desc: 'Detección de anomalías meteorológicas' },
      { name: 'Pandas / GeoPandas', desc: 'Procesamiento de datos históricos geoespaciales' },
    ],
  },
  {
    cat: 'NLP',
    icon: '💬',
    techs: [
      { name: 'LangChain + LLM', desc: 'Generación de reportes, directivas y mensajes comunitarios' },
      { name: 'SpaCy', desc: 'Extracción de normativas y entidades de documentos Conafor' },
      { name: 'Sentence Transformers', desc: 'Búsqueda semántica en base de conocimiento normativo' },
    ],
  },
  {
    cat: 'Backend & Datos',
    icon: '🔧',
    techs: [
      { name: 'FastAPI', desc: 'Backend principal y endpoints REST' },
      { name: 'PostgreSQL + PostGIS', desc: 'Almacenamiento geoespacial e histórico' },
      { name: 'Redis', desc: 'Caché de directivas y colas de tareas en tiempo real' },
      { name: 'Celery', desc: 'Tareas asíncronas: inferencia, reportes, alertas' },
      { name: 'Nginx + Docker', desc: 'Proxy inverso, contenedores y despliegue' },
    ],
  },
  {
    cat: 'Frontend Web',
    icon: '🖥️',
    techs: [
      { name: 'React.js', desc: 'Dashboard coordinadores y portal comunitario' },
      { name: 'Mapbox GL / Leaflet', desc: 'Mapas interactivos y zonas de riesgo' },
      { name: 'WebSockets', desc: 'Alertas y actualizaciones en tiempo real' },
    ],
  },
  {
    cat: 'App Móvil',
    icon: '📱',
    techs: [
      { name: 'Flutter', desc: 'App brigadas multiplataforma con modo offline' },
      { name: 'SQLite', desc: 'Almacenamiento local para funcionamiento sin conexión' },
      { name: 'Firebase FCM', desc: 'Notificaciones push geolocalizadas' },
    ],
  },
  {
    cat: 'Notificaciones Comunitarias',
    icon: '🔔',
    techs: [
      { name: 'SendGrid', desc: 'Alertas y reportes por correo electrónico' },
      { name: 'Twilio', desc: 'Alertas por SMS a suscriptores comunitarios' },
      { name: 'Firebase FCM', desc: 'Push notifications a la app móvil' },
    ],
  },
]

export default function TechStack() {
  return (
    <section id="tecnologia" className="tech">
      <div className="container">
        <div className="tech__header">
          <span className="tag">Stack Tecnológico</span>
          <h2 className="section-title">Construido con<br /><span>la mejor IA</span></h2>
          <p className="section-subtitle">
            Machine learning, NLP, datos meteorológicos en tiempo real y comunicación
            multicanal para cubrir todos los ángulos de la prevención forestal.
          </p>
        </div>
        <div className="tech__grid">
          {CATEGORIES.map((c, i) => (
            <div key={i} className="tech-cat">
              <div className="tech-cat__header">
                <span className="tech-cat__icon">{c.icon}</span>
                <h3 className="tech-cat__name">{c.cat}</h3>
              </div>
              <div className="tech-cat__items">
                {c.techs.map((t, j) => (
                  <div key={j} className="tech-item">
                    <span className="tech-item__name">{t.name}</span>
                    <span className="tech-item__desc">{t.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}