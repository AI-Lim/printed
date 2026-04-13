import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Plus, Search, Edit, Trash2, 
  Package, Filter, Download, ChevronRight,
  MoreHorizontal, Star, Box
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../utils/constants';

export default function AdminProducts() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: '', type: '' });

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => { 
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== id)); 
    }
  };

  const handleOpenForm = (product = null) => {
    if (product) {
      setEditProduct(product);
      setForm({ name: product.name, price: product.price, category: product.category, type: product.type });
    } else {
      setEditProduct(null);
      setForm({ name: '', price: '', category: '', type: '' });
    }
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '10px 0' }}>
        
        {/* Header avec Titre et Action Principale */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>Catalogue Produits</h1>
            <p style={{ color: '#64748B', fontWeight: 500 }}>Gérez votre inventaire et vos designs disponibles</p>
          </div>
          <button 
            onClick={() => handleOpenForm()} 
            style={{ 
              background: '#017BFE', color: 'white', border: 'none', borderRadius: 16, 
              padding: '14px 28px', cursor: 'pointer', fontWeight: 800, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 20px rgba(1,123,254,0.2)' 
            }}
          >
            <Plus size={20} /> Nouveau Produit
          </button>
        </div>

        {/* Barre de contrôle (Recherche & Filtres) */}
        <div style={{ 
          background: 'white', borderRadius: 24, padding: '12px 16px', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 32, border: '1px solid #F1F5F9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Rechercher par nom, catégorie..."
              style={{ 
                width: '100%', border: 'none', background: '#F8FAFC', borderRadius: 14, 
                padding: '14px 14px 14px 48px', fontSize: 14, outline: 'none', fontWeight: 500
              }} 
            />
          </div>
          <div style={{ display: 'flex', gap: 12, marginLeft: 20 }}>
            <button style={{ padding: '12px', borderRadius: 14, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer' }}>
              <Filter size={20} color="#64748B" />
            </button>
            <button style={{ padding: '12px', borderRadius: 14, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer' }}>
              <Download size={20} color="#64748B" />
            </button>
          </div>
        </div>

        {/* Liste des Produits */}
        <div style={{ background: 'white', borderRadius: 32, padding: 24, border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ color: '#94A3B8', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', textAlign: 'left' }}>
                <th style={{ padding: '0 20px' }}>Produit</th>
                <th>Détails</th>
                <th>Prix</th>
                <th>Statut</th>
                <th style={{ textAlign: 'right', padding: '0 20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ transition: '0.2s' }}>
                  <td style={{ padding: '16px 20px', background: '#F8FAFC', borderRadius: '20px 0 0 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 60, height: 60, borderRadius: 16, overflow: 'hidden', background: 'white', border: '1px solid #EEE' }}>
                        <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 800, margin: 0, color: '#1A1A1A' }}>{p.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                          <Star size={12} fill="#FFB800" stroke="none" />
                          <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{p.rating?.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                       <span style={{ background: '#E0F2FE', color: '#017BFE', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{p.type}</span>
                       <span style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>{p.category}</span>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC', fontSize: 16, fontWeight: 900, color: '#1A1A1A' }}>
                    {p.price?.toLocaleString()} F
                  </td>
                  <td style={{ background: '#F8FAFC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#02AB84' }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#02AB84' }}>En stock</span>
                    </div>
                  </td>
                  <td style={{ background: '#F8FAFC', borderRadius: '0 20px 20px 0', textAlign: 'right', padding: '0 20px' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleOpenForm(p)} 
                        style={{ width: 38, height: 38, borderRadius: 12, border: 'none', background: 'white', color: '#017BFE', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        style={{ width: 38, height: 38, borderRadius: 12, border: 'none', background: 'white', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
            <p style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>Affichage de {filtered.length} produits</p>
            <div style={{ display: 'flex', gap: 8 }}>
               <button style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #E2E8F0', background: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Précédent</button>
               <button style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: '#017BFE', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Suivant</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Formulaire (Version Design Wow) */}
      {showForm && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(13, 13, 13, 0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 
        }}>
          <div style={{ 
            background: 'white', borderRadius: 32, padding: 40, width: '100%', maxWidth: 550, 
            boxShadow: '0 30px 60px rgba(0,0,0,0.2)', position: 'relative' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
               <div style={{ width: 44, height: 44, borderRadius: 14, background: '#EBF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package color="#017BFE" size={24} />
               </div>
               <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.5px' }}>
                {editProduct ? 'Modifier le produit' : 'Nouveau produit'}
               </h2>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, marginBottom: 8, color: '#475569' }}>Nom de l'article</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ex: T-Shirt Zoro Noir" required
                    style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 14, padding: '14px', fontSize: 14, outline: 'none', background: '#F8FAFC' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, marginBottom: 8, color: '#475569' }}>Prix (FCFA)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="10000" required
                    style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 14, padding: '14px', fontSize: 14, outline: 'none', background: '#F8FAFC' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, marginBottom: 8, color: '#475569' }}>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                    style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 14, padding: '14px', fontSize: 14, outline: 'none', background: '#F8FAFC' }}>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Mug">Mug</option>
                    <option value="Sweat">Sweat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 800, marginBottom: 8, color: '#475569' }}>Image du produit</label>
                <div style={{ 
                  border: '2px dashed #E2E8F0', borderRadius: 16, padding: '30px', 
                  textAlign: 'center', cursor: 'pointer', background: '#F8FAFC', transition: '0.2s'
                }}>
                   <Plus size={24} color="#94A3B8" style={{ marginBottom: 8 }} />
                   <p style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>Cliquez pour uploader ou glissez l'image</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '16px', borderRadius: 16, border: '1px solid #E2E8F0', background: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Annuler</button>
                <button type="submit" style={{ flex: 1, padding: '16px', borderRadius: 16, border: 'none', background: '#017BFE', color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: 15, boxShadow: '0 10px 20px rgba(1,123,254,0.2)' }}>Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}