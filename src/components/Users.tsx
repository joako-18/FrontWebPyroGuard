import './Users.css'

const USERS = [
  {
    role: 'Brigadista de Campo',
    icon: '🧑‍🚒',
    color: '#FF6A00',
    features: [
      'Mapa de riesgo en tiempo real',
      'Alertas push geolocalizadas',
      'Registro de observaciones GPS',
      'Directivas técnicas por zona',
      'Modo offline con sincronización',
      'Botón de emergencia con GPS',
      'Navegación hacia zona asignada',
    ],
  },
  {
    role: 'Coordinador de Protección Civil',
    icon: '🏛️',
    color: '#FF4500',
    features: [
      'Panel web con mapa interactivo',
      'Series de tiempo y predicción 72h',
      'Reportes PDF automatizados',
      'Asignación y seguimiento de brigadas',
      'Resumen diario por correo',
      'Mensajería interna hacia brigadas',
      'Panel de estadísticas ejecutivas',
    ],
  },
  {
    role: 'Analista Técnico',
    icon: '📊',
    color: '#FFB347',
    features: [
      'Exploración de patrones históricos',
      'Ajuste de umbrales por zona',
      'Monitoreo de rendimiento del modelo',
      'Etiquetado manual de datos',
      'Programación de reentrenamiento',
      'Análisis de estacionalidad del riesgo',
    ],
  },
  {
    role: 'Administrador del Sistema',
    icon: '⚙️',
    color: '#FFE566',
    features: [
      'Gestión de usuarios y permisos',
      'Configuración de zonas en el mapa',
      'Log de auditoría completo',
      'Panel de salud de servicios',
      'Gestión de fuentes meteorológicas',
      'Publicación de comunicados oficiales',
    ],
  },
  {
    role: 'Comunidad',
    icon: '🏘️',
    color: '#22c55e',
    features: [
      'Consulta de riesgo sin registro',
      'Mapa público simplificado',
      'Suscripción a alertas por SMS o correo',
      'Reporte de avistamiento de humo o fuego',
      'Historial de alertas por zona',
      'Sección educativa de prevención',
      'Condiciones meteorológicas en lenguaje simple',
    ],
  },
]

export default function Users() {
  return (
    <section id="usuarios" className="users">
      <div className="container">
        <div className="users__header">
          <span className="tag">Usuarios</span>
          <h2 className="section-title">Diseñado para<br /><span>quienes protegen</span></h2>
          <p className="section-subtitle">
            Cinco perfiles de usuario con funcionalidades específicas para cada
            rol en la cadena de prevención, respuesta y comunicación comunitaria.
          </p>
        </div>
        <div className="users__grid">
          {USERS.map((u, i) => (
            <div key={i} className="user-card" style={{ '--uc': u.color } as React.CSSProperties}>
              <div className="user-card__header">
                <span className="user-card__icon">{u.icon}</span>
                <h3 className="user-card__role">{u.role}</h3>
              </div>
              <ul className="user-card__features">
                {u.features.map((f, j) => (
                  <li key={j}>
                    <span className="check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="users__org">
          <div className="org-item">
            <span className="org-icon">🌲</span>
            <div>
              <strong>Conafor</strong>
              <span>Comisión Nacional Forestal</span>
            </div>
          </div>
          <div className="org-sep">·</div>
          <div className="org-item">
            <span className="org-icon">🏞️</span>
            <div>
              <strong>Protección Civil</strong>
              <span>Estatal y Municipal</span>
            </div>
          </div>
          <div className="org-sep">·</div>
          <div className="org-item">
            <span className="org-icon">🏘️</span>
            <div>
              <strong>Comunidades Rurales</strong>
              <span>Ejidatarios y agricultores</span>
            </div>
          </div>
          <div className="org-sep">·</div>
          <div className="org-item">
            <span className="org-icon">🔬</span>
            <div>
              <strong>Investigadores</strong>
              <span>Ecología y gestión de riesgos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}