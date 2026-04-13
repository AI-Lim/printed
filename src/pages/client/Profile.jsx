import { useState } from 'react';
import { 
  User, Package, Heart, Settings, Bell, LogOut, 
  MapPin, CreditCard, ShieldCheck, 
  Zap, Clock, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../utils/constants';

const ORDERS = [
  { id: 'PRT-001234', date: '12 mars 2025', status: 'Livré', total: 25000, items: 2 },
  { id: 'PRT-001100', date: '28 fév 2025', status: 'En production', total: 10000, items: 1 },
  { id: 'PRT-000987', date: '10 fév 2025', status: 'Expédié', total: 18000, items: 3 },
];

const STATUS_THEMES = { 
  'Livré': { color: '#02AB84', bg: '#ECFDF5' }, 
  'En production': { color: '#E6B95E', bg: '#FFFBEB' }, 
  'Expédié': { color: '#017BFE', bg: '#EFF6FF' }, 
  'Annulé': { color: '#EF4444', bg: '#FEF2F2' } 
};

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profil');
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });

  if (!user) { navigate('/connexion'); return null; }

  const glassStyle = {
    background: 'white',
    borderRadius: 24,
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #E5E7EB',
    borderRadius: 14,
    fontSize: 14,
    outline: 'none',
    fontFamily: 'Poppins, sans-serif',
    background: '#F9FAFB',
    transition: 'all 0.2s'
  };

  const TABS = [
    { id: 'profil', label: 'Mon profil', icon: User },
    { id: 'commandes', label: 'Commandes', icon: Package },
    { id: 'favoris', label: 'Mes favoris', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div style={{ background: '#FCFDFF', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* ── HEADER DE PAGE ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 8 }}>Mon <span style={{ color: '#017BFE' }}>Espace</span></h1>
            <p style={{ color: '#666', fontSize: 14 }}>Gérez vos commandes et vos préférences de style.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#F4F7FF', padding: '8px 20px', borderRadius: 40 }}>
             <ShieldCheck size={16} color="#017BFE" />
             <span style={{ fontSize: 12, fontWeight: 700, color: '#017BFE' }}>Compte vérifié</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
        
        {/* ── SIDEBAR ── */}
        <aside>
          <div style={{ ...glassStyle, padding: 32, textAlign: 'center', marginBottom: 24 }}>
            <div style={{ 
              width: 80, height: 80, borderRadius: '50%', 
              background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 16px', fontSize: 32, color: 'white', fontWeight: 900,
              boxShadow: '0 10px 20px rgba(1,123,254,0.2)'
            }}>
              {user.name ? user.name[0] : 'U'}
            </div>
            <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{user.name}</p>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{user.email}</p>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ display: 'block', background: '#0D0D0D', color: 'white', padding: '10px', borderRadius: 12, textDecoration: 'none', fontSize: 12, fontWeight: 800 }}>
                PANEL ADMINISTRATION
              </Link>
            )}
          </div>

          <div style={{ ...glassStyle, overflow: 'hidden', padding: '10px' }}>
            {TABS.map(t => (
              <button 
                key={t.id} 
                onClick={() => setTab(t.id)} 
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', 
                  border: 'none', borderRadius: 14,
                  background: tab === t.id ? '#F0F7FF' : 'transparent', 
                  cursor: 'pointer', fontSize: 14, 
                  fontWeight: tab === t.id ? 800 : 500, 
                  color: tab === t.id ? '#017BFE' : '#555', 
                  transition: 'all 0.2s'
                }}
              >
                <t.icon size={18} /> {t.label}
              </button>
            ))}
            <div style={{ height: '1px', background: '#F0F0F0', margin: '10px 0' }} />
            <button 
              onClick={() => { logout(); navigate('/'); }} 
              style={{ 
                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', 
                border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, 
                fontWeight: 600, color: '#EF4444' 
              }}
            >
              <LogOut size={18} /> Se déconnecter
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ ...glassStyle, padding: 48, minHeight: 600 }}>
          
          {tab === 'profil' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 32, letterSpacing: '-0.5px' }}>Informations personnelles</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {[
                  { label: 'Nom complet', key: 'name' },
                  { label: 'Téléphone', key: 'phone' },
                  { label: 'Adresse Email', key: 'email', span: 2 },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.span ? `span ${f.span}` : undefined }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#374151' }}>{f.label}</label>
                    <input 
                      value={form[f.key]} 
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
              <button style={{ 
                marginTop: 40, background: '#017BFE', color: 'white', border: 'none', 
                borderRadius: 16, padding: '16px 40px', fontWeight: 800, cursor: 'pointer', 
                fontSize: 15, boxShadow: '0 10px 20px rgba(1,123,254,0.15)' 
              }}>
                Enregistrer les modifications
              </button>
            </div>
          )}

          {tab === 'commandes' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 32 }}>Historique d'achats</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {ORDERS.map(order => (
                  <div key={order.id} style={{ ...glassStyle, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #F0F0F0', boxShadow: 'none' }}>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                      <div style={{ width: 50, height: 50, borderRadius: 12, background: '#F4F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={24} color="#017BFE" />
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 16 }}>{order.id}</p>
                        <p style={{ fontSize: 13, color: '#888' }}>{order.date} · {order.items} article{order.items > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        background: STATUS_THEMES[order.status].bg, 
                        color: STATUS_THEMES[order.status].color, 
                        padding: '6px 14px', borderRadius: 40, fontSize: 12, fontWeight: 800 
                      }}>{order.status}</span>
                      <p style={{ fontSize: 15, fontWeight: 900, marginTop: 8, marginBottom: 12 }}>{order.total.toLocaleString('fr-FR')} FCFA</p>
                      <button 
                        onClick={() => navigate(`/suivi/${order.id}`)}
                        style={{ 
                          background: '#0D0D0D', color: 'white', border: 'none', borderRadius: 10, 
                          padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', 
                          display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto'
                        }}
                      >
                        Suivre le colis <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'favoris' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 32 }}>Ma Wishlist</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
                {MOCK_PRODUCTS.slice(0, 3).map(p => (
                  <Link key={p.id} to={`/produit/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ ...glassStyle, overflow: 'hidden', padding: 12, boxShadow: 'none', border: '1px solid #F0F0F0' }}>
                      <div style={{ height: 180, background: '#F9FAFB', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{p.name}</p>
                      <p style={{ fontSize: 14, color: '#017BFE', fontWeight: 900 }}>{p.price?.toLocaleString('fr-FR')} FCFA</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 32 }}>Activités récentes</h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { title: 'Commande expédiée !', desc: 'Votre commande #PRT-001100 est en route.', time: 'Il y a 2h', read: false, icon: Zap },
                  { title: 'Nouveau code promo', desc: 'Profitez de -20% avec le code PRINTED20', time: 'Hier', read: true, icon: CreditCard },
                  { title: 'Commande livrée', desc: 'Votre commande #PRT-001234 a été livrée.', time: '12 mars', read: true, icon: CheckCircle2 },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: '1px solid #F0F0F0', opacity: n.read ? 0.6 : 1 }}>
                    <div style={{ 
                      width: 44, height: 44, borderRadius: 12, background: n.read ? '#F4F4F4' : '#EFF6FF', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                    }}>
                      <n.icon size={20} color={n.read ? '#AAA' : '#017BFE'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <p style={{ fontWeight: 800, fontSize: 15 }}>{n.title}</p>
                        <span style={{ fontSize: 11, color: '#AAA', fontWeight: 600 }}>{n.time}</span>
                      </div>
                      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'parametres' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 32 }}>Préférences du compte</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Notifications email', desc: 'Recevoir le suivi de commande par email' },
                  { label: 'Suivi SMS', desc: 'Alertes de livraison sur votre mobile' },
                  { label: 'Newsletter', desc: 'Inspiration et offres exclusives' },
                ].map((s, i) => (
                  <div key={i} style={{ ...glassStyle, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'none', border: '1px solid #F0F0F0' }}>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{s.label}</p>
                      <p style={{ fontSize: 12, color: '#888' }}>{s.desc}</p>
                    </div>
                    <div style={{ width: 44, height: 24, borderRadius: 20, background: '#017BFE', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', right: 3, top: 3, width: 18, height: 18, borderRadius: '50%', background: 'white' }} />
                    </div>
                  </div>
                ))}
                
                <div style={{ marginTop: 40, padding: 32, background: '#FFF1F1', borderRadius: 20, border: '1px solid #FFE4E4' }}>
                  <p style={{ fontWeight: 900, color: '#EF4444', marginBottom: 8, fontSize: 16 }}>Zone critique</p>
                  <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>La suppression est définitive. Toutes vos données seront effacées.</p>
                  <button style={{ background: 'white', border: '1px solid #EF4444', color: '#EF4444', borderRadius: 12, padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 800 }}>
                    SUPPRIMER MON COMPTE
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}