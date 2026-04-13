import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, Globe } from 'lucide-react';

// ── Hook Parallax (Même logique et vitesse que sur Home) ─────────────────────
function useParallax(speed = 0.08) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
}

export default function Contact() {
  const [form, setForm] = useState({ nom: '', tel: '', email: '', interet: '', sujet: '', message: '' });
  const [sent, setSent] = useState(false);
  const parallaxHeader = useParallax(0.05); // Parallax léger sur le titre

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setSent(true); 
  };

  // Styles réutilisables "ADN Home"
  const glassStyle = {
    background: 'white',
    borderRadius: 24,
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #E5E7EB',
    borderRadius: 14,
    fontSize: 14,
    outline: 'none',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.2s ease',
    background: '#F9FAFB' // Léger gris pour le fond de l'input
  };

  const gradientText = {
    background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div style={{ background: '#FCFDFF', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', color: '#0D0D0D' }}>
      
      {/* ── HEADER (Style pur, fond blanc comme Home) ── */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <div ref={parallaxHeader} style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-2px' }}>
            Parlons de votre <span style={gradientText}>Projet</span>
          </h1>
          <p style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Une question ? Un devis spécifique ? Notre équipe vous répond sous 24h.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '60px auto 100px', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 40, alignItems: 'start' }}>
        
        {/* ── FORMULAIRE (Style Glassmorphism) ── */}
        <div style={glassStyle}>
          <div style={{ padding: '48px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 80, height: 80, background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <CheckCircle2 size={40} color="#10B981" />
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0D0D0D', marginBottom: 12 }}>Message reçu !</h2>
                <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 32 }}>Merci {form.nom}. Nous avons bien reçu votre demande et reviendrons vers vous très vite.</p>
                <button 
                  onClick={() => { setSent(false); setForm({ nom: '', tel: '', email: '', interet: '', sujet: '', message: '' }); }}
                  style={{ background: '#0D0D0D', color: 'white', border: 'none', borderRadius: 14, padding: '14px 28px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, letterSpacing: '-0.5px' }}>Envoyez un message</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#374151' }}>Nom complet</label>
                    <input required style={inputStyle} value={form.nom} onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} placeholder="Ex: Jean Dupont" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#374151' }}>Téléphone</label>
                    <input required style={inputStyle} value={form.tel} onChange={e => setForm(p => ({ ...p, tel: e.target.value }))} placeholder="+229 00 00 00 00" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#374151' }}>Email</label>
                    <input required type="email" style={inputStyle} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="jean@exemple.com" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#374151' }}>Sujet d'intérêt</label>
                    <select style={inputStyle} value={form.interet} onChange={e => setForm(p => ({ ...p, interet: e.target.value }))}>
                      <option value="">Choisir...</option>
                      <option>Commande Particulier</option>
                      <option>Pack Entreprise</option>
                      <option>Devenir Partenaire</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#374151' }}>Message</label>
                  <textarea 
                    required 
                    rows={5} 
                    style={{ ...inputStyle, resize: 'none' }} 
                    value={form.message} 
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))} 
                    placeholder="Décrivez votre projet en quelques mots..."
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ 
                    width: '100%', background: '#017BFE', color: 'white', border: 'none', 
                    borderRadius: 16, padding: '16px', fontWeight: 800, fontSize: 15, 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#0066D6'}
                  onMouseLeave={e => e.currentTarget.style.background = '#017BFE'}
                >
                  Envoyer le message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── INFO DE CONTACT (Cartes séparées, style Glassmorphism comme Home) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Carte Principale Bleue (Comme le call-to-action de la Home) */}
          <div style={{ 
            background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)', 
            borderRadius: 24, padding: '40px', color: 'white',
            boxShadow: '0 20px 40px rgba(1,123,254,0.15)'
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32 }}>Coordonnées</h2>
            
            {[
              { icon: Phone, title: 'Téléphone', info: '+229 01 00 00 00 00', sub: 'WhatsApp disponible' },
              { icon: Mail, title: 'Email', info: 'hello@printed.bj', sub: 'Support 24/7' },
              { icon: MapPin, title: 'Siège social', info: 'Abomey-Calavi, Bénin', sub: 'Quartier Zogbadjè' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 32, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <item.icon size={24} color="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{item.title}</p>
                  <p style={{ fontSize: 14, opacity: 0.9 }}>{item.info}</p>
                  <p style={{ fontSize: 11, opacity: 0.6, fontWeight: 500 }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Carte Horaires (Style Glassmorphism Blanc) */}
          <div style={{ ...glassStyle, padding: '32px' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, color: '#017BFE' }}>
              <Clock size={20} /> Horaires d'ouverture
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666', fontWeight: 500 }}>Lundi - Vendredi</span>
                <span style={{ fontWeight: 700 }}>08:00 - 18:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666', fontWeight: 500 }}>Samedi</span>
                <span style={{ fontWeight: 700 }}>09:00 - 16:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#EF4444' }}>
                <span style={{ fontWeight: 500 }}>Dimanche</span>
                <span style={{ fontWeight: 700 }}>Fermé</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}