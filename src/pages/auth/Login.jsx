import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import { IMG } from '../../utils/constants';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } else {
      setError(result.error);
    }
  };

  const inp = { width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 14, outline: 'none', fontFamily: 'Poppins, sans-serif' };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff' }}>
      {/* Left decorative */}
      <div style={{ background: 'linear-gradient(135deg, #CBF6FD 0%, #E5F4FF 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 60, left: 60, width: 70, height: 70, background: '#CBF6FD', borderRadius: '50%', border: '6px solid white' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 80, width: 125, height: 63, background: '#E6B95E', borderRadius: 44, border: '6px solid white' }} />
        <div style={{ position: 'absolute', top: 120, right: 40, fontSize: 40 }}>⭐</div>
        <div style={{ position: 'absolute', bottom: 200, left: 40, fontSize: 50 }}>⭐</div>
        <img src={IMG.logo} alt="Printed" style={{ height: 60, marginBottom: 32 }} />
        <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: 'center', color: '#017BFE', fontFamily: "'Mochiy Pop One', sans-serif", lineHeight: 1.4 }}>Print Your Style</h2>
        <p style={{ textAlign: 'center', color: '#555', marginTop: 16, fontSize: 15 }}>Personnalisez, commandez, exprimez-vous.</p>
      </div>

      {/* Right form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Connectez-vous</h1>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 32 }}>
            Vous n'avez pas encore de compte ?{' '}
            <Link to="/inscription" style={{ color: '#017BFE', fontWeight: 600 }}>Inscrivez-vous</Link>
          </p>

          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#ef4444' }}>{error}</div>}

          <div style={{ background: '#CBF6FD', borderRadius: 12, padding: '10px 16px', marginBottom: 20, fontSize: 12, color: '#333' }}>
            <strong>Demo :</strong> admin@printed.bj / admin123 · client@printed.bj / client123
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mail</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="votre@email.com" required style={inp} />
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Mots de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#999" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••" required style={{ ...inp, paddingRight: 38 }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPwd ? <EyeOff size={16} color="#999" /> : <Eye size={16} color="#999" />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.remember} onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))} style={{ accentColor: '#017BFE' }} />
                Se rappeler de moi
              </label>
              <Link to="/mot-de-passe-oublie" style={{ fontSize: 13, color: '#017BFE', textDecoration: 'none' }}>Mot de passe oublié ?</Link>
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', background: '#017BFE', color: 'white', border: 'none', borderRadius: 20, padding: '13px', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#999', margin: '24px 0' }}>Ou</p>
          <button style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 20, padding: '13px', background: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>G</span> Continuer avec Google
          </button>
        </div>
      </div>
    </div>
  );
}
