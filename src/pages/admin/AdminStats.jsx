import AdminLayout from './AdminLayout';
import { 
  TrendingUp, Calendar, Download, 
  ArrowUpRight, ArrowDownRight, 
  BarChart3, PieChart, Info, ChevronRight 
} from 'lucide-react';

const MONTHLY = [
  { month: 'Oct', rev: 450000, orders: 45 }, { month: 'Nov', rev: 680000, orders: 68 },
  { month: 'Déc', rev: 920000, orders: 92 }, { month: 'Jan', rev: 750000, orders: 75 },
  { month: 'Fév', rev: 890000, orders: 89 }, { month: 'Mar', rev: 1250000, orders: 125 },
];
const maxRev = Math.max(...MONTHLY.map(m => m.rev));

export default function AdminStats() {
  return (
    <AdminLayout>
      <div style={{ padding: '10px 0' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>Rapports & Insights</h1>
            <p style={{ color: '#64748B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart3 size={18} /> Analyse détaillée des performances commerciales
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
             <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 14, border: '1px solid #E2E8F0', background: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                <Calendar size={18} /> Année 2025
             </button>
             <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 14, border: 'none', background: '#017BFE', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14, boxShadow: '0 10px 20px rgba(1,123,254,0.2)' }}>
                <Download size={18} /> PDF
             </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 32 }}>
          
          {/* Main Chart Card */}
          <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 4 }}>Chiffre d'Affaires</h2>
                <p style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>Revenus mensuels bruts (FCFA)</p>
              </div>
              <div style={{ background: '#F8FAFC', padding: '6px', borderRadius: 12, display: 'flex', gap: 4 }}>
                <button style={{ border: 'none', background: 'white', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Ventes</button>
                <button style={{ border: 'none', background: 'transparent', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#64748B' }}>Commandes</button>
              </div>
            </div>

            {/* Chart Area */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 280, position: 'relative', paddingBottom: 20 }}>
              {MONTHLY.map((m, i) => {
                const height = (m.rev / maxRev) * 200;
                const isActive = i === MONTHLY.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <div style={{ 
                        width: '100%', 
                        maxWidth: 40,
                        height: height, 
                        background: isActive ? 'linear-gradient(180deg, #017BFE 0%, #0055FF 100%)' : '#F1F5F9', 
                        borderRadius: '12px 12px 6px 6px',
                        transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        position: 'relative',
                        boxShadow: isActive ? '0 10px 20px rgba(1,123,254,0.2)' : 'none'
                      }}>
                        {isActive && (
                          <div style={{ position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)', background: '#1A1A1A', color: 'white', padding: '4px 8px', borderRadius: 8, fontSize: 10, fontWeight: 800 }}>
                            {Math.round(m.rev/1000)}k
                          </div>
                        )}
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#1A1A1A' : '#94A3B8' }}>{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Top Categories Card */}
            <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900 }}>Catégories</h3>
                <PieChart size={18} color="#94A3B8" />
              </div>
              {[
                { name: 'Otaku 🎌', pct: 35, color: '#017BFE' },
                { name: 'Nature 🌿', pct: 22, color: '#02AB84' },
                { name: 'Gaming 🎮', pct: 18, color: '#8B5CF6' },
                { name: 'Autres', pct: 25, color: '#E2E8F0' },
              ].map((c, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                    <span style={{ fontWeight: 700 }}>{c.name}</span>
                    <span style={{ fontWeight: 800, color: c.color === '#E2E8F0' ? '#94A3B8' : c.color }}>{c.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: '#F8FAFC', borderRadius: 10 }}>
                    <div style={{ height: '100%', width: `${c.pct}%`, background: c.color, borderRadius: 10 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Methods */}
            <div style={{ background: '#1A1A1A', borderRadius: 32, padding: 32, color: 'white' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Info size={16} /> Méthodes de paiement
              </h3>
              {[
                { name: 'Mobile Money', pct: 82, color: '#02AB84' },
                { name: 'Carte Bancaire', pct: 12, color: '#017BFE' },
                { name: 'Autres', pct: 6, color: '#475569' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, opacity: 0.8 }}>{m.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 800 }}>{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Table Report */}
        <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9', marginTop: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 900 }}>Historique Détaillé</h2>
            <button style={{ background: 'none', border: 'none', color: '#017BFE', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              Rapport complet <ChevronRight size={18} />
            </button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ color: '#94A3B8', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', textAlign: 'left' }}>
                <th style={{ padding: '0 20px' }}>Période</th>
                <th>Volume</th>
                <th>Revenu Net</th>
                <th>Moyenne / Commande</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY.map((m, i) => {
                const growth = i > 0 ? ((m.rev - MONTHLY[i-1].rev) / MONTHLY[i-1].rev * 100) : 0;
                return (
                  <tr key={i} style={{ transition: '0.2s' }}>
                    <td style={{ padding: '18px 20px', background: '#F8FAFC', borderRadius: '16px 0 0 16px', fontWeight: 800 }}>
                      {m.month} 2025
                    </td>
                    <td style={{ background: '#F8FAFC', fontWeight: 600 }}>
                      <span style={{ background: 'white', padding: '4px 10px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                        {m.orders} commandes
                      </span>
                    </td>
                    <td style={{ background: '#F8FAFC', fontSize: 15, fontWeight: 900, color: '#017BFE' }}>
                      {m.rev.toLocaleString()} <span style={{ fontSize: 11, fontWeight: 600 }}>FCFA</span>
                    </td>
                    <td style={{ background: '#F8FAFC', color: '#64748B', fontWeight: 600 }}>
                      {Math.round(m.rev / m.orders).toLocaleString()} F
                    </td>
                    <td style={{ background: '#F8FAFC', borderRadius: '0 16px 16px 0' }}>
                      {i > 0 ? (
                        <div style={{ 
                          display: 'flex', alignItems: 'center', gap: 6, 
                          color: growth >= 0 ? '#02AB84' : '#EF4444',
                          fontWeight: 800, fontSize: 13
                        }}>
                          {growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {Math.abs(Math.round(growth))}%
                        </div>
                      ) : <span style={{ color: '#94A3B8' }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}