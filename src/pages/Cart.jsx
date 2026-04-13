import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/AppContext';

export default function Cart() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  
  const FREE_SHIPPING_THRESHOLD = 15000;
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 2000;
  const finalTotal = total + shipping;
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
        <div style={{ background: '#F0F7FF', width: 120, height: 120, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <ShoppingBag size={48} color="#017BFE" />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.5px' }}>Votre panier est vide</h2>
        <p style={{ color: '#666', marginBottom: 32, maxWidth: 300 }}>Il semble que vous n'ayez pas encore trouvé votre bonheur.</p>
        <Link to="/catalogue" style={{ background: '#017BFE', color: 'white', padding: '16px 40px', borderRadius: 16, textDecoration: 'none', fontWeight: 800, fontSize: 16, boxShadow: '0 10px 20px rgba(1,123,254,0.2)' }}>
          Découvrir la collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', fontFamily: 'Poppins, sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>Mon <span style={{ color: '#017BFE' }}>Panier</span></h1>
          <p style={{ color: '#666', fontSize: 14 }}>Vous avez {items.length} article(s) dans votre sélection.</p>
        </div>
        <button onClick={clearCart} style={{ background: '#FFF1F1', border: 'none', color: '#EF4444', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, transition: '0.2s' }}>
          <Trash2 size={16} /> Vider
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
        
        {/* LISTE DES PRODUITS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'white', borderRadius: 24, padding: 20, border: '1px solid #F0F0F0', display: 'flex', gap: 24, alignItems: 'center', transition: 'transform 0.2s' }}>
              <div style={{ width: 110, height: 110, borderRadius: 18, overflow: 'hidden', background: '#F9FAFB', flexShrink: 0 }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{item.name}</h3>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Taille: <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{item.size || 'Unique'}</span></p>
                <p style={{ fontSize: 18, fontWeight: 900, color: '#017BFE' }}>{item.price?.toLocaleString('fr-FR')} FCFA</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
                <button onClick={() => removeItem(item.id)} style={{ background: '#F9FAFB', border: 'none', width: 32, height: 32, borderRadius: 10, cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={16} />
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', borderRadius: 12, padding: 4 }}>
                  <button 
                    onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} 
                    style={{ width: 30, height: 30, border: 'none', background: 'white', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ width: 40, textAlign: 'center', fontSize: 15, fontWeight: 800 }}>{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, item.qty + 1)} 
                    style={{ width: 30, height: 30, border: 'none', background: 'white', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RÉCAPITULATIF STATIQUE */}
        <aside style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: 'white', borderRadius: 28, padding: 32, border: '1px solid #F0F0F0', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 24 }}>Résumé</h2>
            
            {/* Barre de progression livraison */}
            <div style={{ marginBottom: 30 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                <span style={{ color: shipping === 0 ? '#02AB84' : '#666' }}>
                  {shipping === 0 ? 'Livraison gratuite offerte !' : `Encore ${(FREE_SHIPPING_THRESHOLD - total).toLocaleString()} FCFA`}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 6, background: '#F0F0F0', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: shipping === 0 ? '#02AB84' : '#017BFE', transition: '0.4s ease' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: 15 }}>
                <span>Sous-total</span>
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{total.toLocaleString()} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: 15 }}>
                <span>Frais de livraison</span>
                <span style={{ fontWeight: 700, color: shipping === 0 ? '#02AB84' : '#1A1A1A' }}>
                  {shipping === 0 ? 'Gratuit' : `${shipping.toLocaleString()} FCFA`}
                </span>
              </div>
              <div style={{ height: '1px', background: '#F0F0F0', margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 900 }}>
                <span>Total</span>
                <span style={{ color: '#017BFE' }}>{finalTotal.toLocaleString()} FCFA</span>
              </div>
            </div>

            <Link to="/commande" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#0D0D0D', color: 'white', borderRadius: 18, padding: '18px', fontWeight: 800, fontSize: 16, textDecoration: 'none', marginBottom: 16, transition: '0.2s' }}>
              Commander maintenant <ArrowRight size={20} />
            </Link>
            
            <Link to="/catalogue" style={{ display: 'block', textAlign: 'center', color: '#888', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              Continuer mes achats
            </Link>
          </div>
          
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12, padding: '0 10px', color: '#888' }}>
             <Truck size={18} />
             <p style={{ fontSize: 12, lineHeight: 1.4 }}>Livraison estimée sous 48h à 72h ouvrées à Cotonou et environs.</p>
          </div>
        </aside>

      </div>
    </div>
  );
}