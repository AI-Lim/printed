import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Search, UserX, Shield, UserCheck, 
  Mail, Calendar, ShoppingBag, 
  MoreHorizontal, Filter, ChevronRight,
  UserCircle
} from 'lucide-react';

const USERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1, 
  name: ['Ayo Kossou', 'Fatou Mensah', 'Koffi Diabate', 'Marie Adjaho', 'Jean Agossa', 'Alice Dossou', 'Paul Noukpo', 'Emma Ahyi', 'Marc Zinsou', 'Clara Adjovi'][i],
  email: `user${i + 1}@example.com`, 
  role: i === 0 ? 'admin' : 'client',
  orders: Math.floor(Math.random() * 10), 
  joined: `${Math.floor(Math.random() * 28) + 1} Janv 2025`,
  status: i % 7 === 0 ? 'Suspendu' : 'Actif',
  avatarColor: ['#017BFE', '#02AB84', '#8B5CF6', '#E6B95E', '#F43F5E'][i % 5]
}));

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tous');

  const filtered = USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search);
    const matchRole = roleFilter === 'Tous' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <AdminLayout>
      <div style={{ padding: '10px 0' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>Communauté</h1>
            <p style={{ color: '#64748B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserCircle size={18} /> Gestion des comptes et permissions
            </p>
          </div>
          <button style={{ 
            background: 'white', border: '1px solid #E2E8F0', borderRadius: 14, 
            padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
          }}>
            <Filter size={18} /> Exporter la liste
          </button>
        </div>

        {/* Analytics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}>
          {[
            { label: 'Total Membres', value: USERS.length, color: '#017BFE', icon: UserCheck },
            { label: 'Clients Actifs', value: USERS.filter(u => u.status === 'Actif').length, color: '#02AB84', icon: ShoppingBag },
            { label: 'Administrateurs', value: USERS.filter(u => u.role === 'admin').length, color: '#E6B95E', icon: Shield },
          ].map((s, i) => (
            <div key={i} style={{ 
              background: 'white', borderRadius: 28, padding: 28, border: '1px solid #F1F5F9',
              display: 'flex', alignItems: 'center', gap: 20
            }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: s.color + '10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.icon size={26} color={s.color} />
              </div>
              <div>
                <p style={{ fontSize: 28, fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 13, color: '#64748B', marginTop: 6, fontWeight: 600 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Chercher un nom ou email..."
                style={{ 
                  width: '100%', border: 'none', background: '#F8FAFC', borderRadius: 16, 
                  padding: '16px 16px 16px 52px', fontSize: 14, outline: 'none', fontWeight: 500
                }} 
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Tous', 'admin', 'client'].map(r => (
                <button 
                  key={r} 
                  onClick={() => setRoleFilter(r)} 
                  style={{ 
                    padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', 
                    fontSize: 13, fontWeight: 700, textTransform: 'capitalize',
                    background: roleFilter === r ? '#1A1A1A' : '#F1F5F9', 
                    color: roleFilter === r ? 'white' : '#64748B',
                    transition: '0.2s'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
            <thead>
              <tr style={{ color: '#94A3B8', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', textAlign: 'left' }}>
                <th style={{ padding: '0 20px' }}>Utilisateur</th>
                <th>Rôle</th>
                <th>Activité</th>
                <th>Inscrit le</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right', padding: '0 20px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} style={{ transition: '0.2s' }}>
                  <td style={{ padding: '16px 20px', background: '#F8FAFC', borderRadius: '20px 0 0 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ 
                        width: 44, height: 44, borderRadius: 14, 
                        background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}99)`, 
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: 14, fontWeight: 900, boxShadow: `0 4px 12px ${user.avatarColor}30`
                      }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 800, margin: 0, color: '#1A1A1A' }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC' }}>
                    <span style={{ 
                      background: user.role === 'admin' ? '#1A1A1A' : 'white', 
                      color: user.role === 'admin' ? 'white' : '#1A1A1A', 
                      padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', gap: 6, width: 'fit-content',
                      border: '1px solid #E2E8F0', textTransform: 'uppercase'
                    }}>
                      {user.role === 'admin' && <Shield size={12} />} {user.role}
                    </span>
                  </td>
                  <td style={{ background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ShoppingBag size={14} color="#64748B" />
                      <span style={{ fontSize: 13, fontWeight: 800 }}>{user.orders} <span style={{ fontWeight: 500, color: '#94A3B8' }}>achats</span></span>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC', color: '#64748B', fontSize: 13, fontWeight: 600 }}>
                    {user.joined}
                  </td>
                  <td style={{ background: '#F8FAFC' }}>
                    <span style={{ 
                      background: user.status === 'Actif' ? '#E6F6F2' : '#FEF2F2', 
                      color: user.status === 'Actif' ? '#02AB84' : '#EF4444', 
                      padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800 
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ background: '#F8FAFC', borderRadius: '0 20px 20px 0', textAlign: 'right', padding: '0 20px' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                       <button style={{ width: 38, height: 38, borderRadius: 12, border: 'none', background: 'white', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MoreHorizontal size={18} />
                       </button>
                       <button style={{ width: 38, height: 38, borderRadius: 12, border: 'none', background: '#FEF2F2', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UserX size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
             <button style={{ 
               background: 'none', border: 'none', color: '#017BFE', fontWeight: 800, 
               fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 
             }}>
                Afficher plus de membres <ChevronRight size={18} />
             </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}