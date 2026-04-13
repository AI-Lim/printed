import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { IMG } from '../../utils/constants';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '']);
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const inp = { width: '100%', padding: '11px 12px 11px 38px', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, outline: 'none', fontFamily: 'Poppins, sans-serif', background: 'transparent' };

  const containerStyle = {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(135deg, #CBF6FD 0%, #E5F4FF 50%, white 100%)',
    padding: 24, position: 'relative', overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: 80, left: 100, fontSize: 60, opacity: 0.4 }}>⭐</div>
      <div style={{ position: 'absolute', bottom: 100, right: 100, width: 70, height: 70, background: 'rgba(1,123,254,0.1)', borderRadius: '50%' }} />

      <div style={{ background: 'white', borderRadius: 24, padding: 48, maxWidth: 480, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <img src={IMG.logo} alt="Printed" style={{ height: 50, marginBottom: 32 }} />

        {step === 1 && (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Réinitialisez votre mot de passe</h1>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>Entrez votre adresse email pour recevoir un code de vérification.</p>
            <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <div style={{ position: 'relative', textAlign: 'left', marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Mail</label>
                <Mail size={16} color="#999" style={{ position: 'absolute', left: 0, top: '65%', transform: 'translateY(-50%)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required style={inp} />
              </div>
              <button type="submit" style={{ width: '100%', background: '#017BFE', color: 'white', border: 'none', borderRadius: 28, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                Envoyer le code
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Vérifiez votre code</h1>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>Entrez le code de vérification envoyé à <strong>{email}</strong>. Ce code est valide pendant 10 minutes.</p>
            <form onSubmit={e => { e.preventDefault(); setStep(3); }}>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
                {code.map((digit, i) => (
                  <input key={i} type="text" maxLength={1} value={digit}
                    onChange={e => { const n = [...code]; n[i] = e.target.value; setCode(n); if (e.target.value && i < 4) e.target.nextElementSibling?.focus(); }}
                    style={{ width: 52, height: 60, border: '2px solid #017BFE', borderRadius: 12, textAlign: 'center', fontSize: 24, fontWeight: 700, outline: 'none', fontFamily: 'Poppins, sans-serif' }} />
                ))}
              </div>
              <button type="submit" style={{ width: '100%', background: '#017BFE', color: 'white', border: 'none', borderRadius: 28, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                Vérifier le code
              </button>
            </form>
            <p style={{ marginTop: 16, fontSize: 13, color: '#666' }}>
              Vous n'avez pas reçu de code ?{' '}
              <button onClick={() => {}} style={{ background: 'none', border: 'none', color: '#017BFE', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}>Renvoyer</button>
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Choisissez un nouveau mot de passe</h1>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>Votre mot de passe doit être sécurisé et facile à retenir.</p>
            <form onSubmit={e => { e.preventDefault(); setStep(4); }}>
              {[{ label: 'Nouveau mots de passe', key: newPwd, set: setNewPwd }, { label: 'Confirmer le mots de passe', key: confirmPwd, set: setConfirmPwd }].map((f, i) => (
                <div key={i} style={{ textAlign: 'left', marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input type="password" value={f.key} onChange={e => f.set(e.target.value)} required
                    style={{ width: '100%', padding: '11px 12px', border: 'none', borderBottom: '1.5px solid #ddd', fontSize: 14, outline: 'none', fontFamily: 'Poppins, sans-serif', background: 'transparent' }} />
                </div>
              ))}
              <button type="submit" style={{ width: '100%', background: '#017BFE', color: 'white', border: 'none', borderRadius: 28, padding: '14px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                Réinitialiser le mot de passe
              </button>
            </form>
          </>
        )}

        {step === 4 && (
          <>
            <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, color: '#02AB84' }}>Mot de passe réinitialisé !</h1>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
            <Link to="/connexion" style={{ display: 'block', background: '#017BFE', color: 'white', borderRadius: 28, padding: '14px', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
              Se connecter
            </Link>
          </>
        )}

        <Link to="/connexion" style={{ display: 'block', marginTop: 20, fontSize: 13, color: '#888', textDecoration: 'none' }}>← Retour à la connexion</Link>
      </div>
    </div>
  );
}
