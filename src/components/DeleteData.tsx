import { useState } from 'react'
import './DeleteData.css'

const DATA_TYPES = [
  {
    icon: '🗑️',
    label: 'Datos que se eliminan completamente',
    color: '#ef4444',
    items: [
      'Nombre completo y correo electrónico',
      'Número de teléfono registrado',
      'Historial de alertas recibidas',
      'Observaciones técnicas registradas en campo',
      'Reportes de avistamiento enviados',
      'Preferencias de notificación',
      'Historial de zonas suscritas',
    ],
  },
  {
    icon: '🔒',
    label: 'Datos que se conservan temporalmente',
    color: '#f97316',
    items: [
      'Log de auditoría del sistema — conservado 12 meses por obligación de seguridad',
      'Registros de intervenciones completadas — conservados 6 meses para reportes institucionales',
      'Datos anonimizados de actividad — conservados indefinidamente sin vinculación a tu identidad',
    ],
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Redacta tu solicitud',
    desc: 'Envía un correo electrónico a la dirección oficial de PyroGuard AI con el asunto indicado.',
  },
  {
    num: '02',
    title: 'Incluye los datos requeridos',
    desc: 'En el cuerpo del correo incluye tu nombre completo, el correo con el que te registraste en la app y una breve descripción de tu solicitud.',
  },
  {
    num: '03',
    title: 'Espera la confirmación',
    desc: 'Recibirás un correo de confirmación en un plazo máximo de 5 días hábiles con el acuse de recibo de tu solicitud.',
  },
  {
    num: '04',
    title: 'Eliminación ejecutada',
    desc: 'La eliminación de tus datos se completará en un plazo máximo de 30 días naturales a partir de la confirmación.',
  },
]

export default function DeleteData() {
  const [copied, setCopied] = useState(false)

  const email = 'privacidad@pyroguardai.mx'
  const subject = 'Solicitud de eliminación de cuenta — PyroGuard AI'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleMailto = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      'Nombre completo: \nCorreo registrado en la app: \nSolicitud: Deseo eliminar mi cuenta y datos personales de PyroGuard AI.'
    )}`
  }

  return (
    <div className="delete">
      {}
      <div className="delete__hero">
        <div className="delete__hero-bg" />
        <div className="container delete__hero-content">
          <a href="/" className="delete__back">← Volver al inicio</a>
          <div className="delete__hero-badge">
            <span className="badge-dot" />
            Privacidad y Datos
          </div>
          <h1 className="delete__title">Eliminar tu <span>cuenta</span></h1>
          <p className="delete__subtitle">
            PyroGuard AI · Aplicación móvil para brigadistas y comunidades forestales
          </p>
          <p className="delete__intro">
            Tienes derecho a solicitar la eliminación de tu cuenta y tus datos personales
            en cualquier momento. En esta página encontrarás los pasos exactos para hacerlo,
            qué datos se eliminan y cuáles se conservan temporalmente por obligaciones legales.
          </p>
        </div>
      </div>

      <div className="container delete__body">

        {}
        <div className="delete__app-notice">
          <span className="delete__app-icon">📱</span>
          <div>
            <strong>PyroGuard AI</strong>
            <p>Aplicación desarrollada por el equipo PyroGuard AI — Universidad Politécnica de Chiapas. Disponible en Google Play Store bajo el nombre <strong>PyroGuard AI</strong>.</p>
          </div>
        </div>

        {}
        <div className="delete__section">
          <h2 className="delete__section-title">
            <span className="delete__section-num">01</span>
            Cómo solicitar la eliminación de tu cuenta
          </h2>
          <p className="delete__section-desc">
            La eliminación de cuenta se realiza enviando un correo electrónico a nuestro equipo de privacidad.
            No existe eliminación automática desde la app en esta versión. Sigue estos pasos:
          </p>
          <div className="delete__steps">
            {STEPS.map((s, i) => (
              <div key={i} className="delete__step">
                <div className="delete__step-num">{s.num}</div>
                <div className="delete__step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="delete__email-box">
          <div className="delete__email-header">
            <span className="delete__email-icon">✉️</span>
            <div>
              <span className="delete__email-label">Correo oficial para solicitudes</span>
              <span className="delete__email-address">{email}</span>
              <span className="delete__email-subject">Asunto: {subject}</span>
            </div>
          </div>
          <div className="delete__email-actions">
            <button className="delete__btn-primary" onClick={handleMailto}>
              Enviar solicitud por correo
            </button>
            <button className="delete__btn-ghost" onClick={handleCopy}>
              {copied ? '✓ Copiado' : 'Copiar correo'}
            </button>
          </div>
        </div>

        {}
        <div className="delete__section">
          <h2 className="delete__section-title">
            <span className="delete__section-num">02</span>
            Qué datos se eliminan y cuáles se conservan
          </h2>
          <p className="delete__section-desc">
            Al procesar tu solicitud de eliminación, aplicamos las siguientes políticas
            según el tipo de dato:
          </p>
          <div className="delete__data-grid">
            {DATA_TYPES.map((d, i) => (
              <div key={i} className="delete__data-card" style={{ '--dc': d.color } as React.CSSProperties}>
                <div className="delete__data-header">
                  <span className="delete__data-icon">{d.icon}</span>
                  <h3 className="delete__data-label">{d.label}</h3>
                </div>
                <ul className="delete__data-list">
                  {d.items.map((item, j) => (
                    <li key={j}>
                      <span className="delete__data-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="delete__section">
          <h2 className="delete__section-title">
            <span className="delete__section-num">03</span>
            Periodos de retención
          </h2>
          <div className="delete__retention">
            <div className="delete__retention-item">
              <span className="delete__retention-time">30 días</span>
              <span className="delete__retention-desc">Plazo máximo para completar la eliminación de tus datos desde la confirmación de la solicitud.</span>
            </div>
            <div className="delete__retention-sep" />
            <div className="delete__retention-item">
              <span className="delete__retention-time">6 meses</span>
              <span className="delete__retention-desc">Conservación de registros de intervenciones completadas para reportes institucionales de protección civil.</span>
            </div>
            <div className="delete__retention-sep" />
            <div className="delete__retention-item">
              <span className="delete__retention-time">12 meses</span>
              <span className="delete__retention-desc">Conservación del log de auditoría de seguridad por obligación legal antes de su eliminación definitiva.</span>
            </div>
          </div>
        </div>

        {}
        <div className="delete__notice">
          <span className="delete__notice-icon">ℹ️</span>
          <div>
            <strong>¿Tienes dudas adicionales?</strong>
            <p>
              Para cualquier consulta sobre el tratamiento de tus datos personales puedes
              consultar nuestro{' '}
              <a href="/aviso-de-privacidad">Aviso de Privacidad completo</a>{' '}
              o escribirnos directamente a{' '}
              <strong>privacidad@pyroguardai.mx</strong>.
              Daremos respuesta en un plazo máximo de 5 días hábiles.
            </p>
          </div>
        </div>

      </div>

      <div className="fire-divider" />
      <div className="container delete__footer">
        <span>🔥 PyroGuard <em>AI</em> — Todos los derechos reservados · Chiapas, México · 2026</span>
        <a href="/" className="delete__footer-link">Volver al inicio</a>
      </div>
    </div>
  )
}