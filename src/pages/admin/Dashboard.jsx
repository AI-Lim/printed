import AdminLayout from './AdminLayout';
import { 
  TrendingUp, ShoppingBag, Users, Package, 
  ArrowUp, MoreVertical, Calendar, Search,
  Filter, Download, ChevronRight
} from 'lucide-react';

const STATS = [
  { label: 'Chiffre d\'affaires', value: '1 250 000', unit: 'FCFA', change: '+12.5%', icon: TrendingUp, color: '#017BFE' },
  { label: 'Commandes', value: '148', unit: 'Reçues', change: '+8%', icon: ShoppingBag, color: '#02AB84' },
  { label: 'Nouveaux Clients', value: '312', unit: 'Inscrits', change: '+5%', icon: Users, color: '#E6B95E' },
  { label: 'Produits Actifs', value: '64', unit: 'Articles', change: '+3', icon: Package, color: '#8B5CF6' },
];

const RECENT_ORDERS = [
  { id: 'PRT-001', customer: 'Ayo Kossou', product: 'T-Shirt Zoro', amount: 10000, status: 'Livré', date: 'Auj. 14:22', img: 'A' },
  { id: 'PRT-002', customer: 'Fatou Mensah', product: 'Mug Personnalisé', amount: 8000, status: 'En production', date: 'Auj. 11:05', img: 'F' },
  { id: 'PRT-003', customer: 'Koffi Diabate', product: 'Pack Entreprise', amount: 150000, status: 'Expédié', date: 'Hier 16:30', img: 'K' },
  { id: 'PRT-004', customer: 'Marie Adjaho', product: 'Sweat Otaku', amount: 15000, status: 'En attente', date: 'Hier 10:00', img: 'M' },
];

const STATUS_THEMES = { 
  'Livré': { color: '#02AB84', bg: '#E6F6F2' }, 
  'En production': { color: '#E6B95E', bg: '#FFF9EB' }, 
  'Expédié': { color: '#017BFE', bg: '#EBF4FF' }, 
  'En attente': { color: '#64748B', bg: '#F1F5F9' } 
};

export default function Dashboard() {
  return (
    <AdminLayout>
      <div style={{ padding: '20px 0' }}>
        
        {/* Header avec Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>Vue d'ensemble</h1>
            <p style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} /> Statistiques mises à jour le 26 Mars 2024
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
             <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 14, border: '1px solid #E2E8F0', background: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                <Download size={18} /> Rapport
             </button>
             <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, border: 'none', background: '#017BFE', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14, boxShadow: '0 10px 20px rgba(1,123,254,0.2)' }}>
                Nouvelle Vente
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 28, padding: 28, border: '1px solid #F1F5F9', transition: '0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ width: 50, height: 50, borderRadius: 16, background: s.color + '10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={24} color={s.color} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#02AB84', background: '#E6F6F2', padding: '4px 10px', borderRadius: 10 }}>{s.change}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <p style={{ fontSize: 26, fontWeight: 900, color: '#1A1A1A' }}>{s.value}</p>
                <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>{s.unit}</span>
              </div>
              <p style={{ fontSize: 14, color: '#64748B', marginTop: 4, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 32 }}>
          
          {/* Recent orders Section */}
          <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900 }}>Commandes récentes</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input placeholder="Chercher..." style={{ padding: '10px 12px 10px 36px', borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13, outline: 'none', width: 180 }} />
                </div>
                <button style={{ width: 40, height: 40, borderRadius: 12, border: '1px solid #E2E8F0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Filter size={18} color="#64748B" />
                </button>
              </div>
            </div>

            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                <thead>
                  <tr style={{ color: '#94A3B8', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', textAlign: 'left' }}>
                    <th style={{ padding: '0 12px' }}>Client</th>
                    <th>Produit</th>
                    <th>Montant</th>
                    <th>Statut</th>
                    <th style={{ textAlign: 'right', padding: '0 12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map(order => (
                    <tr key={order.id} style={{ transition: '0.2s', cursor: 'pointer' }}>
                      <td style={{ padding: '16px 12px', background: '#F8FAFC', borderRadius: '16px 0 0 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#017BFE', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>
                            {order.img}
                          </div>
                          <div>
                            <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{order.customer}</p>
                            <p style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{order.id}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ background: '#F8FAFC', fontSize: 14, fontWeight: 600 }}>{order.product}</td>
                      <td style={{ background: '#F8FAFC', fontSize: 14, fontWeight: 800 }}>{order.amount.toLocaleString()} F</td>
                      <td style={{ background: '#F8FAFC' }}>
                        <span style={{ 
                          background: STATUS_THEMES[order.status].bg, 
                          color: STATUS_THEMES[order.status].color, 
                          padding: '6px 14px', borderRadius: 10, fontSize: 11, fontWeight: 800 
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ background: '#F8FAFC', borderRadius: '0 16px 16px 0', textAlign: 'right', padding: '0 12px' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (Side Cards) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Top Products */}
            <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9' }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24 }}>Top Performances</h2>
              {[
                { name: 'T-Shirt Zoro', sold: 48, color: '#017BFE' },
                { name: 'Mug Anime', sold: 36, color: '#02AB84' },
                { name: 'Sweat Nature', sold: 24, color: '#E6B95E' },
                { name: 'Coque Phone', sold: 12, color: '#8B5CF6' },
              ].map((p, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#017BFE' }}>{p.sold} <span style={{ fontWeight: 500, color: '#94A3B8' }}>Ventes</span></span>
                  </div>
                  <div style={{ height: 8, background: '#F1F5F9', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(p.sold/50)*100}%`, background: p.color, borderRadius: 10 }} />
                  </div>
                </div>
              ))}
              <button style={{ width: '100%', marginTop: 10, padding: '14px', borderRadius: 14, border: '1px dashed #E2E8F0', background: 'none', color: '#64748B', fontWeight: 700, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Voir l'inventaire <ChevronRight size={16} />
              </button>
            </div>

            {/* Premium Revenue Card */}
            <div style={{ 
              background: 'linear-gradient(225deg, #017BFE 0%, #0055FF 100%)', 
              borderRadius: 32, padding: 32, color: 'white', position: 'relative', overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(1,123,254,0.3)'
            }}>
              {/* Cercle décoratif */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
              
              <h3 style={{ fontSize: 14, fontWeight: 700, opacity: 0.9, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <TrendingUp size={16} /> REVENUS DU MOIS
              </h3>
              <p style={{ fontSize: 36, fontWeight: 900, marginBottom: 8, letterSpacing: '-1px' }}>1 250 000 <span style={{ fontSize: 16, fontWeight: 600, opacity: 0.8 }}>FCFA</span></p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', width: 'fit-content', padding: '6px 12px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                <ArrowUp size={14} /> +12% par rapport à Février
              </div>
              
              <div style={{ marginTop: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 12, opacity: 0.8, fontWeight: 600 }}>Objectif : 2M FCFA</p>
                <span style={{ fontSize: 12, fontWeight: 900 }}>62%</span>
              </div>
              <div style={{ marginTop: 10, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 10 }}>
                <div style={{ height: '100%', width: '62%', background: 'white', borderRadius: 10 }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}