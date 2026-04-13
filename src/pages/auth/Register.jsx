import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import { IMG } from '../../utils/constants';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', accept: false });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError('Les mots de passe ne correspondent pas.');
    if (!form.accept) return setError('Veuillez accepter les CGU.');
    const result = register({ name: form.name, email: form.email });
    if (result.success) navigate('/');
  };

  const inp = { width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Poppins, sans-serif' };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Créez un compte</h1>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 24 }}>Profitez de nos services et exprimez votre style</p>
          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#ef4444' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Nom complet', key: 'name', type: 'text', icon: User, placeholder: 'Jean Dupont' },
              { label: 'Mail', key: 'email', type: 'email', icon: Mail, placeholder: 'votre@email.com' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                <div style={{ position: 'relative' }}>
                  <f.icon size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} required style={inp} />
                </div>
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mots de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" required style={{ ...inp, paddingRight: 38 }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPwd ? <EyeOff size={16} color="#999" /> : <Eye size={16} color="#999" />}
                </button>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Confirmer le mots de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input type="password" value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••" required style={inp} />
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 24 }}>
              <input type="checkbox" checked={form.accept} onChange={e => setForm(p => ({ ...p, accept: e.target.checked }))} style={{ accentColor: '#017BFE', marginTop: 2 }} />
              <span>J'ai lu et accepté les <Link to="#" style={{ color: '#017BFE' }}>conditions générales d'utilisation</Link></span>
            </label>
            <button type="submit" style={{ width: '100%', background: '#017BFE', color: 'white', border: 'none', borderRadius: 20, padding: '13px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Créer mon compte
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 13, marginTop: 20 }}>
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" style={{ color: '#017BFE', fontWeight: 600 }}>Connectez-vous</Link>
          </p>
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 60, right: 60, width: 70, height: 70, background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 80, left: 80, fontSize: 50, opacity: 0.6 }}>⭐</div>
        <img src={IMG.logoWhite || IMG.logo} alt="Printed" style={{ height: 70, marginBottom: 32, filter: 'brightness(10)' }} />
        <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white', textAlign: 'center', fontFamily: "'Mochiy Pop One', sans-serif" }}>Print Your Style</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: 16, textAlign: 'center', fontSize: 15, lineHeight: 1.7 }}>Créez un compte pour profiter de nos services et exprimer votre style</p>
      </div>
    </div>
  );
}
