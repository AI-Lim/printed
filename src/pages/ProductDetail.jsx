import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ChevronRight, Check, Truck, Shield, RefreshCw, Info } from 'lucide-react';
import { MOCK_PRODUCTS } from '../utils/constants';
import { useCart } from '../context/AppContext';
import ProductCard from '../components/ui/ProductCard';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  
  // Simulation de récupération de données
  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id)) || MOCK_PRODUCTS[0];
  const related = MOCK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  // States
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImg, setSelectedImg] = useState(0);

  // On simule une galerie (en prod, proviendrait de product.images)
  const images = [product.image, product.image, product.image];

  const handleAdd = () => {
    addItem({ ...product, size: selectedSize }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Breadcrumb - Navigation simplifiée */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888', marginBottom: 40 }}>
        <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Accueil</Link>
        <ChevronRight size={14} />
        <Link to="/catalogue" style={{ color: '#888', textDecoration: 'none' }}>Catalogue</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#017BFE', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 60, marginBottom: 100 }}>
        
        {/* GALERIE PHOTOS */}
        <section>
          <div style={{ 
            borderRadius: 32, overflow: 'hidden', background: '#F8FAFC', 
            height: 550, position: 'relative', border: '1px solid #F1F5F9' 
          }}>
            <img 
              src={images[selectedImg]} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
            />
            <button 
              onClick={() => setLiked(!liked)} 
              style={{ 
                position: 'absolute', top: 20, right: 20, background: 'white', border: 'none', 
                borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', 
                justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' 
              }}
            >
              <Heart size={20} fill={liked ? '#EF4444' : 'none'} stroke={liked ? '#EF4444' : '#1A1A1A'} />
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {images.map((img, i) => (
              <button 
                key={i} 
                onMouseEnter={() => setSelectedImg(i)}
                style={{ 
                  width: 90, height: 90, borderRadius: 16, overflow: 'hidden', 
                  border: `2px solid ${selectedImg === i ? '#017BFE' : 'transparent'}`, 
                  padding: 0, cursor: 'pointer', background: '#F8FAFC' 
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </section>

        {/* INFORMATIONS PRODUIT */}
        <section>
          <div style={{ marginBottom: 30 }}>
            {product.isNew && (
              <span style={{ background: '#E0F2FE', color: '#017BFE', fontSize: 12, fontWeight: 800, padding: '6px 16px', borderRadius: 40, display: 'inline-block', marginBottom: 16 }}>
                NOUVEAUTÉ
              </span>
            )}
            <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: '-1px', lineHeight: 1.1 }}>
              {product.name}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={18} fill={s <= 4 ? '#FFB800' : 'none'} stroke={s <= 4 ? '#FFB800' : '#CBD5E1'} />
                ))}
              </div>
              <span style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>(24 avis clients)</span>
            </div>
          </div>

          <p style={{ fontSize: 32, fontWeight: 900, color: '#017BFE', marginBottom: 32 }}>
            {product.price?.toLocaleString()} FCFA
          </p>

          {/* SÉLECTION TAILLE */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 800, fontSize: 15 }}>Choisir une taille</span>
              <button style={{ background: 'none', border: 'none', color: '#64748B', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>
                Guide des tailles
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {SIZES.map(s => (
                <button 
                  key={s} 
                  onClick={() => setSelectedSize(s)} 
                  style={{ 
                    minWidth: 54, height: 54, borderRadius: 14, 
                    border: `2px solid ${selectedSize === s ? '#017BFE' : '#F1F5F9'}`, 
                    background: selectedSize === s ? '#017BFE' : 'white', 
                    color: selectedSize === s ? 'white' : '#1A1A1A', 
                    fontWeight: 700, cursor: 'pointer', transition: '0.2s'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITÉ & ACTIONS */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
            <div style={{ 
              display: 'flex', alignItems: 'center', background: '#F8FAFC', 
              borderRadius: 18, padding: '6px', border: '1px solid #F1F5F9' 
            }}>
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))} 
                style={{ width: 44, height: 44, border: 'none', background: 'white', borderRadius: 14, cursor: 'pointer', fontSize: 18, fontWeight: 700, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
              >
                −
              </button>
              <span style={{ width: 50, textAlign: 'center', fontSize: 16, fontWeight: 800 }}>{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)} 
                style={{ width: 44, height: 44, border: 'none', background: 'white', borderRadius: 14, cursor: 'pointer', fontSize: 18, fontWeight: 700, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAdd} 
              style={{ 
                flex: 1, background: added ? '#02AB84' : '#017BFE', color: 'white', 
                border: 'none', borderRadius: 18, padding: '0 32px', fontWeight: 800, 
                fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', gap: 12, transition: '0.3s',
                boxShadow: added ? 'none' : '0 10px 25px rgba(1, 123, 254, 0.25)'
              }}
            >
              {added ? <><Check size={20} /> Ajouté !</> : <><ShoppingCart size={20} /> Ajouter au panier</>}
            </button>
          </div>

          {/* RÉASSURANCE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, borderTop: '1px solid #F1F5F9', paddingTop: 32 }}>
            {[
              { icon: Truck, text: 'Livraison Express' },
              { icon: Shield, text: 'Garantie Qualité' },
              { icon: RefreshCw, text: 'Retour 14 jours' },
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center', padding: '12px', background: '#F8FAFC', borderRadius: 16 }}>
                <item.icon size={20} color="#017BFE" style={{ marginBottom: 8 }} />
                <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* TABS DÉTAILS */}
      <section style={{ marginBottom: 80 }}>
        <div style={{ display: 'flex', gap: 40, borderBottom: '1px solid #F1F5F9', marginBottom: 40 }}>
          {['description', 'caractéristiques', 'avis'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t)}
              style={{ 
                background: 'none', border: 'none', paddingBottom: 20, cursor: 'pointer', 
                fontSize: 16, fontWeight: 800, color: activeTab === t ? '#017BFE' : '#94A3B8',
                borderBottom: `3px solid ${activeTab === t ? '#017BFE' : 'transparent'}`,
                textTransform: 'capitalize', transition: '0.2s'
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 800, lineHeight: 1.8, color: '#475569' }}>
          {activeTab === 'description' && (
            <div className="fade-in">
              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Conçu pour allier style urbain et confort absolu. Ce modèle exclusif utilise un coton premium 
                qui respire, idéal pour le climat local. Chaque pièce est soigneusement vérifiée pour garantir 
                une tenue parfaite lavage après lavage.
              </p>
              <div style={{ background: '#F8FAFC', padding: 24, borderRadius: 20, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <Info color="#017BFE" size={24} />
                <p style={{ fontSize: 14, margin: 0 }}>
                  <strong>Note de l'atelier :</strong> Ce modèle taille normalement. Si vous hésitez entre deux tailles, 
                  nous vous conseillons de prendre la plus grande pour un look plus décontracté.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'caractéristiques' && (
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['100% Coton peigné', 'Grammage 180g/m²', 'Col rond renforcé', 'Coupe ajustée', 'Impression haute définition', 'Origine : Bénin'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 }}>
                  <Check size={16} color="#02AB84" strokeWidth={3} /> {item}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'avis' && <p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px' }}>Complétez votre look</h2>
          <Link to="/catalogue" style={{ color: '#017BFE', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>Voir tout</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 30 }}>
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

    </div>
  );
}