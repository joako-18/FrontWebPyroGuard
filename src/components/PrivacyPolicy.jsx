import './PrivacyPolicy.css'

const SECTIONS = [
  {
    id: 'quienes-somos',
    title: '¿Quiénes somos?',
    content: (
      <>
        <p>
          <strong>PyroGuard AI</strong>, con domicilio en Carretera Tuxtla Gutierrez. - Portillo Zaragoza Km 21+500, Las Brisas, 29150 Suchiapa, Chis,
          es el responsable del uso y protección de sus datos personales, y al respecto
          le informamos lo siguiente.
        </p>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: '¿Para qué utilizaremos sus datos personales?',
    content: (
      <>
        <p>Los datos personales que recabamos de usted los utilizaremos para las siguientes finalidades <strong>necesarias para el servicio que solicita:</strong></p>
        <ul>
          <li>Crear y administrar su cuenta de usuario dentro de la plataforma PyroGuard AI según el rol que le corresponda: brigadista, coordinador, analista técnico, administrador o suscriptor comunitario.</li>
          <li>Enviarle alertas de riesgo de incendio forestal geolocalizadas por notificación push, correo electrónico o mensaje SMS según las zonas forestales que usted seleccionó al momento de registrarse o suscribirse.</li>
          <li>Registrar y almacenar las observaciones técnicas, reportes de campo y avistamientos que usted ingrese al sistema para su uso operativo dentro del proyecto de prevención de incendios forestales.</li>
          <li>Transmitir su ubicación GPS en tiempo real al coordinador de protección civil asignado mientras usted tenga una intervención activa o haya activado el botón de emergencia, con el único fin de garantizar su seguridad en campo.</li>
          <li>Generar y enviarle reportes técnicos, directivas de acción preventiva y resúmenes de riesgo correspondientes a las zonas bajo su responsabilidad o de su interés.</li>
        </ul>
        <p>De manera adicional, utilizaremos su información personal para las siguientes finalidades <strong>no necesarias para el servicio solicitado</strong>, pero que nos permiten brindarle una mejor atención:</p>
        <ul>
          <li>Analizar patrones de uso de la plataforma para mejorar las funcionalidades y la experiencia de los distintos tipos de usuarios.</li>
          <li>Enviarle comunicados informativos sobre actualizaciones del sistema, nuevas funcionalidades o contenido educativo relacionado con la prevención de incendios forestales en su región.</li>
        </ul>
        <div className="privacy__notice">
          <span className="privacy__notice-icon">ℹ️</span>
          <p>En caso de que no desee que sus datos personales sean tratados para los fines adicionales, puede comunicarlo enviando un correo a <strong>privacidad@pyroguardai.mx</strong> con el asunto <em>"Negativa de finalidades adicionales"</em> indicando su nombre completo y correo registrado. Atenderemos su solicitud en un plazo máximo de 5 días hábiles.</p>
        </div>
        <p>La negativa para el uso de sus datos personales para estas finalidades adicionales no podrá ser motivo para negarle los servicios que solicita.</p>
      </>
    ),
  },
  {
    id: 'datos',
    title: '¿Qué datos personales utilizaremos?',
    content: (
      <>
        <p>Para llevar a cabo las finalidades descritas, utilizaremos los siguientes datos personales:</p>
        <ul>
          <li>Nombre completo.</li>
          <li>Correo electrónico.</li>
          <li>Número de teléfono celular.</li>
          <li>Ubicación geográfica en tiempo real durante el uso de la aplicación móvil.</li>
          <li>Fotografías adjuntas a reportes de campo o avistamientos que usted comparta voluntariamente.</li>
          <li>Información sobre su rol, organización o comunidad a la que pertenece.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'terceros',
    title: '¿Con quién compartimos su información?',
    content: (
      <>
        <p>Sus datos personales pueden ser compartidos con los siguientes terceros proveedores de servicios tecnológicos estrictamente necesarios para el funcionamiento de la plataforma:</p>
        <div className="privacy__providers">
          <div className="privacy__provider">
            <span className="privacy__provider-name">Proveedor Cloud</span>
            <span className="privacy__provider-desc">Almacenamiento seguro de datos e infraestructura del sistema.</span>
          </div>
          <div className="privacy__provider">
            <span className="privacy__provider-name">Firebase — Google</span>
            <span className="privacy__provider-desc">Envío de notificaciones push a dispositivos móviles.</span>
          </div>
          <div className="privacy__provider">
            <span className="privacy__provider-name">SendGrid</span>
            <span className="privacy__provider-desc">Envío de correos electrónicos de alerta y notificación.</span>
          </div>
          <div className="privacy__provider">
            <span className="privacy__provider-name">Twilio</span>
            <span className="privacy__provider-desc">Envío de mensajes SMS a suscriptores comunitarios.</span>
          </div>
        </div>
        <p>Dichos terceros se comprometen a guardar estricta confidencialidad respecto a sus datos personales y a utilizarlos únicamente para los fines para los que fueron compartidos.</p>
      </>
    ),
  },
  {
    id: 'arco',
    title: '¿Cómo puede ejercer sus derechos ARCO?',
    content: (
      <>
        <p>Usted tiene derecho a:</p>
        <div className="privacy__arco">
          <div className="privacy__arco-item">
            <span className="privacy__arco-letter">A</span>
            <div>
              <strong>Acceso</strong>
              <p>Conocer qué datos personales tenemos de usted y para qué los usamos.</p>
            </div>
          </div>
          <div className="privacy__arco-item">
            <span className="privacy__arco-letter">R</span>
            <div>
              <strong>Rectificación</strong>
              <p>Corregir sus datos cuando sean inexactos o incompletos.</p>
            </div>
          </div>
          <div className="privacy__arco-item">
            <span className="privacy__arco-letter">C</span>
            <div>
              <strong>Cancelación</strong>
              <p>Solicitar que eliminemos sus datos cuando no sean necesarios para las finalidades señaladas.</p>
            </div>
          </div>
          <div className="privacy__arco-item">
            <span className="privacy__arco-letter">O</span>
            <div>
              <strong>Oposición</strong>
              <p>Oponerse al tratamiento de sus datos para fines específicos.</p>
            </div>
          </div>
        </div>
        <p>Para ejercer cualquiera de estos derechos envíe su solicitud a:</p>
        <div className="privacy__contact">
          <span>📧 <strong>privacidad@pyroguardai.mx</strong></span>
          <span>Asunto: <em>Solicitud de derechos ARCO</em></span>
          <span>Respuesta en un plazo máximo de <strong>20 días hábiles</strong>.</span>
        </div>
      </>
    ),
  },
  {
    id: 'cambios',
    title: 'Cambios al aviso de privacidad',
    content: (
      <>
        <p>
          El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones
          derivadas de nuevas disposiciones legales o de los servicios que ofrecemos. Nos
          comprometemos a mantenerlo actualizado y a notificarle cualquier cambio a través de
          un aviso visible en el portal web y en la aplicación móvil antes de que los cambios
          entren en vigor.
        </p>
        <p>
          Este aviso fue elaborado en cumplimiento de la <strong>Ley Federal de Protección de
          Datos Personales en Posesión de los Particulares</strong> y su Reglamento, así como
          de los Lineamientos del Aviso de Privacidad emitidos por el <strong>INAI</strong>.
        </p>
      </>
    ),
  },
  {
    id: 'consulta',
    title: '¿Dónde puede consultar el aviso de privacidad integral?',
    content: (
      <>
        <p>
          Para conocer mayor información sobre los términos y condiciones en que serán tratados
          sus datos personales, como los terceros con quienes compartimos su información personal
          y la forma en que podrá ejercer sus derechos ARCO, puede consultar el aviso de
          privacidad integral en los siguientes medios:
        </p>
        <ul>
          <li>Portal web público de PyroGuard AI en la sección <strong>"Aviso de Privacidad"</strong> ubicada en el pie de página, accesible desde cualquier dispositivo sin necesidad de iniciar sesión.</li>
        </ul>
      </>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="privacy">
      <div className="privacy__hero">
        <div className="privacy__hero-bg" />
        <div className="container privacy__hero-content">
          <a href="/" className="privacy__back">
            ← Volver al inicio
          </a>
          <div className="privacy__hero-badge">
            <span className="badge-dot" />
            Documento Legal
          </div>
          <h1 className="privacy__title">Aviso de <span>Privacidad</span></h1>
          <p className="privacy__subtitle">
            PyroGuard AI — Última actualización: Junio de 2026
          </p>
        </div>
      </div>

      <div className="container privacy__body">
        <aside className="privacy__sidebar">
          <nav className="privacy__nav">
            <span className="privacy__nav-label">Contenido</span>
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="privacy__nav-link">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="privacy__content">
          {SECTIONS.map(s => (
            <section key={s.id} id={s.id} className="privacy__section">
              <h2 className="privacy__section-title">{s.title}</h2>
              <div className="privacy__section-body">
                {s.content}
              </div>
            </section>
          ))}
        </main>
      </div>

      <div className="fire-divider" />
      <div className="container privacy__footer">
        <span>🔥 PyroGuard <em>AI</em> — Todos los derechos reservados · Chiapas, México · 2026</span>
        <a href="/" className="privacy__footer-link">Volver al inicio</a>
      </div>
    </div>
  )
}