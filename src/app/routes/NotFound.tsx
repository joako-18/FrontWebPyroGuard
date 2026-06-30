import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe o no tienes los permisos necesarios para verla.</p>
      <Link to="/" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#e53e3e', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Volver al Inicio
      </Link>
    </div>
  );
}
