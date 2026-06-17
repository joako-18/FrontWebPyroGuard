import './HowItWorks.css'

const STEPS = [
  {
    num: '01',
    label: 'Datos Meteorológicos',
    title: 'Captura climática en tiempo real',
    desc: 'El sistema consume APIs meteorológicas públicas que entregan temperatura, humedad relativa, velocidad del viento, precipitación acumulada y radiación solar por zona cada 30 minutos.',
    detail: 'Open-Meteo · SMN México',
  },
  {
    num: '02',
    label: 'Índice FWI',
    title: 'Cálculo del índice de riesgo base',
    desc: 'Se calcula el Fire Weather Index, el estándar internacional usado por la Conafor y la Unión Europea, que combina las variables climáticas en un índice de peligrosidad por zona.',
    detail: 'Fire Weather Index · Estándar Conafor',
  },
  {
    num: '03',
    label: 'Machine Learning',
    title: 'Clasificación y predicción',
    desc: 'Un Random Forest clasifica el nivel de riesgo actual cruzando el FWI con patrones históricos de 10 años. Un modelo LSTM predice la evolución del riesgo para las próximas 72 horas.',
    detail: 'Random Forest · LSTM · Scikit-learn',
  },
  {
    num: '04',
    label: 'Detección de Anomalías',
    title: 'Red de seguridad ante lo inédito',
    desc: 'Un Isolation Forest detecta cuando las condiciones de una zona están fuera de lo normal para esa época del año, actuando como corrección ante situaciones sin precedente histórico.',
    detail: 'Isolation Forest · Anomaly Detection',
  },
  {
    num: '05',
    label: 'NLP y LLM',
    title: 'Comunicación adaptada a cada usuario',
    desc: 'LangChain genera automáticamente reportes técnicos para coordinadores, directivas operativas para brigadistas y mensajes en lenguaje cotidiano para la comunidad.',
    detail: 'LangChain · SpaCy · LLM',
  },
  {
    num: '06',
    label: 'Alerta Multicanal',
    title: 'Acción antes del fuego',
    desc: 'Las alertas llegan por app móvil a brigadistas, por dashboard web a coordinadores, y por correo o SMS a ciudadanos suscriptores de la comunidad afectada.',
    detail: 'Firebase · SendGrid · Twilio',
  },
]

const RISK_LEVELS = [
  { level: 'BAJO', color: '#22c55e', desc: 'Condiciones normales' },
  { level: 'MEDIO', color: '#eab308', desc: 'Monitoreo activo' },
  { level: 'ALTO', color: '#f97316', desc: 'Alerta activada' },
  { level: 'CRÍTICO', color: '#ef4444', desc: 'Respuesta inmediata' },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="hiw">
      <div className="container">
        <div className="hiw__header">
          <span className="tag">Sistema</span>
          <h2 className="section-title">Cómo <span>funciona</span></h2>
          <p className="section-subtitle">
            Un pipeline de inteligencia artificial que transforma datos meteorológicos
            en tiempo real en alertas preventivas accionables para brigadas, coordinadores y comunidades.
          </p>
        </div>
        <div className="hiw__pipeline">
          {STEPS.map((step, i) => (
            <div key={i} className="pipeline-step">
              <div className="pipeline-step__connector">
                <div className="step-circle">
                  <span>{step.num}</span>
                </div>
                {i < STEPS.length - 1 && <div className="step-arrow" />}
              </div>
              <div className="pipeline-step__card">
                <div className="step-tag">{step.label}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                <div className="step-detail">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="hiw__risk">
          <h3 className="risk__title">Niveles de Clasificación de Riesgo</h3>
          <div className="risk__levels">
            {RISK_LEVELS.map((r, i) => (
              <div key={i} className="risk-level" style={{ '--c': r.color }}>
                <div className="risk-level__bar" />
                <div className="risk-level__pulse" />
                <span className="risk-level__name">{r.level}</span>
                <span className="risk-level__desc">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}