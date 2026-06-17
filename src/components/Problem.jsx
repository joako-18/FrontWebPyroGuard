import './Problem.css'

const PROBLEMS = [
  {
    icon: '⏰',
    title: 'Detección tardía',
    desc: 'Los sistemas actuales detectan el fuego cuando ya está activo. En ese momento la capacidad de contención es mínima y los daños al ecosistema son inevitables.',
  },
  {
    icon: '🧑‍🚒',
    title: 'Vigilancia manual',
    desc: 'Torres de observación con personal humano y revisión esporádica de reportes. Un método costoso, impreciso y completamente incapaz de escalar al territorio.',
  },
  {
    icon: '🌡️',
    title: 'Datos climáticos subutilizados',
    desc: 'Las APIs meteorológicas públicas entregan datos de temperatura, humedad y viento en tiempo real que nunca se explotan para generar alertas preventivas automatizadas.',
  },
  {
    icon: '💸',
    title: 'Costo desproporcionado',
    desc: 'Por cada peso invertido en prevención se ahorran entre 7 y 10 pesos en combate y recuperación. El paradigma reactivo es técnica y económicamente ineficiente.',
  },
  {
    icon: '🏘️',
    title: 'Comunidades sin información',
    desc: 'Las comunidades rurales que habitan zonas forestales y que son quienes primero perciben el riesgo no tienen acceso a información técnica en tiempo real sobre su entorno.',
  },
  {
    icon: '📡',
    title: 'Falta de coordinación',
    desc: 'Brigadas, coordinadores y ciudadanos operan con información fragmentada y sin un canal unificado que conecte la alerta técnica con la acción en campo y la comunidad.',
  },
]

export default function Problem() {
  return (
    <section id="problematica" className="problem">
      <div className="container">
        <div className="problem__header">
          <span className="tag">Problemática</span>
          <h2 className="section-title">El fuego espera.<br /><span>México no puede.</span></h2>
          <p className="section-subtitle">
            México pierde en promedio más de <strong>400,000 hectáreas</strong> de superficie
            forestal al año. Los datos climáticos para anticiparlo existen y son gratuitos.
            Nadie los está usando de forma inteligente.
          </p>
        </div>
        <div className="problem__grid">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="problem-card" style={{ '--delay': `${i * 0.1}s` }}>
              <div className="problem-card__icon">{p.icon}</div>
              <h3 className="problem-card__title">{p.title}</h3>
              <p className="problem-card__desc">{p.desc}</p>
              <div className="problem-card__line" />
            </div>
          ))}
        </div>
        <div className="problem__highlight">
          <div className="highlight-bar" />
          <blockquote>
            "La prevención de incendios forestales es significativamente más eficiente
            y menos costosa que su combate."
          </blockquote>
          <cite>— FAO, Organización de las Naciones Unidas para la Alimentación y la Agricultura</cite>
        </div>
      </div>
    </section>
  )
}