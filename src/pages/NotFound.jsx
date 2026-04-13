import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: 100, marginBottom: 24 }}>404</div>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, color: '#017BFE' }}>Page introuvable</h1>
      <p style={{ color: '#666', marginBottom: 32, fontSize: 16 }}>La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" style={{ background: '#017BFE', color: 'white', padding: '14px 32px', borderRadius: 28, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>
        Retour à l'accueil
      </Link>
    </div>
  );
}
