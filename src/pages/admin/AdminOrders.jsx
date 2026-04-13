import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Search, Eye, CheckCircle2, Clock, 
  Truck, AlertCircle, Calendar, 
  Filter, MoreHorizontal, CreditCard, 
  ArrowUpRight, Package, User
} from 'lucide-react';

const ORDERS = Array.from({ length: 12 }, (_, i) => ({
  id: `PRT-${String(1000 + i).padStart(6, '0')}`,
  customer: ['Ayo Kossou', 'Fatou Mensah', 'Koffi Diabate', 'Marie Adjaho', 'Jean Agossa'][i % 5],
  product: ['T-Shirt Zoro', 'Mug Anime', 'Pack Entreprise', 'Sweat Otaku', 'Coque Phone'][i % 5],
  amount: [10000, 8000, 150000, 15000, 5000][i % 5],
  status: ['Livré', 'En production', 'Expédié', 'En attente', 'Annulé'][i % 5],
  date: `${22 - i} Mars 2025`,
  payment: ['Mobile Money', 'Carte Bancaire', 'Virement'][i % 3],
  initials: ['AK', 'FM', 'KD', 'MA', 'JA'][i % 5]
}));

const STATUS_THEMES = { 
  'Livré': { color: '#02AB84', bg: '#E6F6F2', icon: CheckCircle2 }, 
  'En production': { color: '#E6B95E', bg: '#FFF9EB', icon: Clock }, 
  'Expédié': { color: '#017BFE', bg: '#EBF4FF', icon: Truck }, 
  'En attente': { color: '#64748B', bg: '#F1F5F9', icon: AlertCircle },
  'Annulé': { color: '#EF4444', bg: '#FEF2F2', icon: Package }
};

export default function AdminOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const statuses = ['Tous', 'En attente', 'En production', 'Expédié', 'Livré', 'Annulé'];
  
  const filtered = ORDERS.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === 'Tous' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div style={{ padding: '10px 0' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>Commandes</h1>
            <p style={{ color: '#64748B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Package size={16} /> {ORDERS.length} commandes enregistrées au total
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
             <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 14, border: '1px solid #E2E8F0', background: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                <Calendar size={18} /> Période
             </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 32 }}>
          {statuses.slice(1).map(s => {
            const count = ORDERS.filter(o => o.status === s).length;
            const theme = STATUS_THEMES[s];
            const isSelected = statusFilter === s;
            
            return (
              <div 
                key={s} 
                onClick={() => setStatusFilter(s)} 
                style={{ 
                  background: isSelected ? theme.bg : 'white', 
                  borderRadius: 24, padding: 20, cursor: 'pointer', 
                  border: `2px solid ${isSelected ? theme.color : 'transparent'}`,
                  transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected ? `0 10px 20px ${theme.color}15` : '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                   <div style={{ color: theme.color }}><theme.icon size={20} /></div>
                   <ArrowUpRight size={14} color={theme.color} style={{ opacity: isSelected ? 1 : 0 }} />
                </div>
                <p style={{ fontSize: 24, fontWeight: 900, color: theme.color }}>{count}</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: isSelected ? theme.color : '#94A3B8', marginTop: 4 }}>{s}</p>
              </div>
            );
          })}
        </div>

        {/* Table Container */}
        <div style={{ background: 'white', borderRadius: 32, padding: 24, border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          
          {/* Internal Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div style={{ position: 'relative', width: '350px' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Rechercher un client, un ID..."
                style={{ 
                  width: '100%', border: 'none', background: '#F8FAFC', borderRadius: 14, 
                  padding: '14px 14px 14px 48px', fontSize: 14, outline: 'none', fontWeight: 500
                }} 
              />
            </div>
            <div style={{ display: 'flex', background: '#F8FAFC', padding: '6px', borderRadius: 16, gap: 4 }}>
              {['Tous', 'En attente', 'Livré'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  style={{ 
                    border: 'none', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', background: statusFilter === tab ? 'white' : 'transparent',
                    color: statusFilter === tab ? '#017BFE' : '#64748B',
                    boxShadow: statusFilter === tab ? '0 4px 10px rgba(0,0,0,0.05)' : 'none',
                    transition: '0.2s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ color: '#94A3B8', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', textAlign: 'left' }}>
                <th style={{ padding: '0 20px' }}>ID & Client</th>
                <th>Produit</th>
                <th>Montant</th>
                <th>Paiement</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right', padding: '0 20px' }}>Détails</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} style={{ transition: '0.2s' }}>
                  <td style={{ padding: '16px 20px', background: '#F8FAFC', borderRadius: '20px 0 0 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ 
                        width: 36, height: 36, borderRadius: 10, 
                        background: 'linear-gradient(135deg, #017BFE, #00C2FF)', 
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: 11, fontWeight: 900 
                      }}>
                        {order.initials}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>{order.customer}</p>
                        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>{order.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC', fontSize: 13, fontWeight: 600 }}>{order.product}</td>
                  <td style={{ background: '#F8FAFC', fontSize: 14, fontWeight: 900 }}>{order.amount.toLocaleString()} F</td>
                  <td style={{ background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B' }}>
                       <CreditCard size={14} />
                       <span style={{ fontSize: 12, fontWeight: 600 }}>{order.payment}</span>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC' }}>
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: 8, 
                      color: STATUS_THEMES[order.status].color,
                      background: 'white', padding: '6px 12px', borderRadius: 12,
                      width: 'fit-content', border: '1px solid rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_THEMES[order.status].color }} />
                      <span style={{ fontSize: 11, fontWeight: 800 }}>{order.status.toUpperCase()}</span>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC', borderRadius: '0 20px 20px 0', textAlign: 'right', padding: '0 20px' }}>
                    <button style={{ 
                      width: 36, height: 36, borderRadius: 12, border: 'none', background: 'white', 
                      color: '#017BFE', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                      justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' 
                    }}>
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
             <p style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>{filtered.length} commande(s) affichée(s)</p>
             <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3].map(p => (
                  <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: p === 1 ? '#017BFE' : '#F8FAFC', color: p === 1 ? 'white' : '#64748B', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{p}</button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}