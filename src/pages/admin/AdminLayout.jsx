import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart2, Settings, LogOut, ChevronRight, Bell } from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import { ASSETS } from '../../utils/constants';

const MENU = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/produits', label: 'Produits', icon: Package },
  { path: '/admin/commandes', label: 'Commandes', icon: ShoppingBag },
  { path: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  { path: '/admin/statistiques', label: 'Statistiques', icon: BarChart2 },
  { path: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F4F4' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#232323', color: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 40 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={ASSETS.logo} alt="Printed" style={{ height: 36, filter: 'brightness(10)' }} />
          <span style={{ fontWeight: 700, fontSize: 14, opacity: 0.8 }}>Admin</span>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {MENU.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, marginBottom: 4,
                textDecoration: 'none', color: active ? '#017BFE' : 'rgba(255,255,255,0.7)',
                background: active ? 'rgba(1,123,254,0.15)' : 'transparent',
                fontWeight: active ? 700 : 500, fontSize: 14, transition: 'all 0.2s'
              }}>
                <item.icon size={18} />
                {item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '8px 16px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#017BFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{user?.name?.[0]}</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{user?.name}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Administrateur</p>
            </div>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: 12, color: '#ef4444', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            <LogOut size={16} /> Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{ background: 'white', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 30 }}>
          <div>
            <p style={{ fontSize: 12, color: '#888' }}>Tableau de bord</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#232323' }}>
              {MENU.find(m => m.path === location.pathname)?.label || 'Admin'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ background: '#F4F4F4', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} />
              <span style={{ position: 'absolute', top: 4, right: 4, width: 10, height: 10, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            <Link to="/" style={{ background: '#017BFE', color: 'white', padding: '8px 16px', borderRadius: 20, textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>
              ← Voir le site
            </Link>
          </div>
        </header>
        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
