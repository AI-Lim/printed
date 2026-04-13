import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useCart } from '../../context/AppContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [liked,  setLiked]  = useState(false);
  const [added,  setAdded]  = useState(false);
  const [hovered,setHovered] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...product, _key: `${product.id}-` });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(l => !l);
  };

  return (
    <Link to={`/produit/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 17, overflow: 'hidden', background: 'white',
          boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.14)' : '0 4px 15px rgba(0,0,0,0.07)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          position: 'relative', cursor: 'pointer', height: '100%',
        }}>

        {/* Badge */}
        {product.isNew && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#017BFE', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, zIndex: 2 }}>
            NOUVEAU
          </span>
        )}
        {product.isBestSeller && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#E6B95E', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, zIndex: 2 }}>
            BEST SELLER
          </span>
        )}

        {/* Like button */}
        <button onClick={handleLike} style={{
          position: 'absolute', top: 10, right: 10, zIndex: 2,
          background: 'white', border: 'none', borderRadius: '50%',
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <Heart size={14} fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : '#aaa'} />
        </button>

        {/* Image */}
        <div style={{ height: 210, background: '#F9F9F9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px 14px' }}>
          <p style={{ fontSize: 14, fontFamily: "'Mochiy Pop One', sans-serif", marginBottom: 6, lineHeight: 1.3 }}>
            <span style={{ color: '#232323' }}>{product.name.split(' ')[0]} </span>
            <span style={{ color: '#017BFE' }}>{product.name.split(' ').slice(1).join(' ')}</span>
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
            <Star size={12} fill="#E6B95E" stroke="#E6B95E" />
            <span style={{ fontSize: 11, color: '#888' }}>{product.rating?.toFixed(1)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#017BFE', fontFamily: 'Poppins, sans-serif' }}>
              {product.price?.toLocaleString('fr-FR')} FCFA
            </span>
            <button onClick={handleAdd} style={{
              background: added ? '#02AB84' : '#017BFE',
              color: 'white', border: 'none', borderRadius: 20,
              padding: '7px 13px', fontSize: 11, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
              transition: 'background 0.25s',
              fontFamily: 'Poppins, sans-serif',
            }}>
              {added ? <><Check size={11} /> Ajouté</> : <><ShoppingCart size={11} /> Ajouter</>}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
