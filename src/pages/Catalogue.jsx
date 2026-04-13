import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  X, ChevronDown, Search, 
  SlidersHorizontal, LayoutGrid, ArrowUpDown, 
  Package, ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../utils/constants';
import pp from '../assets/images/pp.png';

// ── Hook Parallax (Même logique que sur Home) ────────────────────────────────
function useParallax(speed = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);
  return ref;
}

// ── Données de filtrage ──────────────────────────────────────────────────────
const COLORS_LIST = ['Blanc', 'Noir', 'Bleu', 'Rouge', 'Vert', 'Jaune', 'Rose'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const glassStyle = {
  background: 'white',
  borderRadius: 24,
  border: '1px solid rgba(0,0,0,0.05)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
};

const gradientText = {
  background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 16, borderBottom: '1px solid #F3F4F6', paddingBottom: 16 }}>
      <button 
        onClick={() => setOpen(!open)} 
        style={{ 
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          background: 'none', border: 'none', cursor: 'pointer', 
          padding: '8px 0', fontWeight: 700, fontSize: 14, color: '#0D0D0D',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        {title} 
        <div style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: '#017BFE' }}>
          <ChevronDown size={16} />
        </div>
      </button>
      {open && <div style={{ paddingTop: 12 }}>{children}</div>}
    </div>
  );
}

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [filters, setFilters] = useState({ category: [], priceRange: null, size: [], color: [] });
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const PER_PAGE = 9;

  // Activation de l'effet parallax
  const parallaxRef = useParallax(0.05);

  const toggleFilter = (key, value) => {
    setFilters(prev => {
      const arr = prev[key] || [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
    setPage(1);
  };

const filtered = useMemo(() => {
  let p = [...MOCK_PRODUCTS];

  // 🔍 Search
  if (searchQuery) {
    p = p.filter(x =>
      x.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 📂 Catégories
  if (filters.category.length) {
    p = p.filter(x =>
      filters.category.includes(x.category)
    );
  }

  // 🎨 Couleurs (⚠️ MOCK_PRODUCTS n'a pas de color)
  if (filters.color.length) {
    p = p.filter(x =>
      filters.color.includes(x.color)
    );
  }

  // 📏 Tailles (⚠️ pas dans MOCK_PRODUCTS non plus)
  if (filters.size.length) {
    p = p.filter(x =>
      filters.size.includes(x.size)
    );
  }

  // 💰 Prix (si tu ajoutes priceRange plus tard)
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    p = p.filter(x => x.price >= min && x.price <= max);
  }

  // 🔃 Tri
  if (sortBy === 'price-asc') {
    p.sort((a, b) => a.price - b.price);
  }

  if (sortBy === 'price-desc') {
    p.sort((a, b) => b.price - a.price);
  }

  return p;
}, [filters, sortBy, searchQuery]);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div style={{ background: '#FCFDFF', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', overflowX: 'hidden' }}>
      <section style={{ padding: '60px 24px 40px', textAlign: 'center', background: 'white', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#0D0D0D', marginBottom: 16, letterSpacing: '-2px' }}>
          Notre <span style={gradientText}>Catalogue</span>
        </h1>
        
        {searchQuery && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(1,123,254,0.08)', padding: '8px 20px', borderRadius: 40, marginBottom: 30 }}>
            <Search size={16} color="#017BFE" />
            <span style={{ fontSize: 14, color: '#017BFE', fontWeight: 600 }}>Résultats pour "{searchQuery}"</span>
          </div>
        )}

        {/* --- Image PP avec effet Parallax --- */}
        <div style={{ 
          maxWidth: 1200, 
          margin: '20px auto 0', 
          padding: '0 24px',
          perspective: '1000px'
        }}>
          <div ref={parallaxRef} style={{ transition: 'transform 0.1s ease-out', willChange: 'transform' }}>
            <img 
              src={pp} 
              alt="Bannière Catalogue" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 40,
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.15)',
                display: 'block'
              }} 
            />
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '40px auto 80px', padding: '0 24px', display: 'flex', gap: 32 }}>
        {showFilters && (
          <aside style={{ width: 280, flexShrink: 0 }}>
            <div style={{ ...glassStyle, padding: 24, position: 'sticky', top: 100 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <SlidersHorizontal size={18} color="#017BFE" /> Filtres
                </h3>
              </div>

              <FilterSection title="Catégories">
                {CATEGORIES.map(c => (
                  <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: filters.category.includes(c.id) ? '#017BFE' : '#555' }}>
                    <div style={{ 
                      width: 18, height: 18, border: '2px solid #EEE', borderRadius: 6, 
                      background: filters.category.includes(c.id) ? '#017BFE' : 'white', 
                      borderColor: filters.category.includes(c.id) ? '#017BFE' : '#EEE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      {filters.category.includes(c.id) && <Check size={12} color="white" strokeWidth={3} />}
                    </div>
                    <input type="checkbox" checked={filters.category.includes(c.id)} onChange={() => toggleFilter('category', c.id)} style={{ display: 'none' }} />
                    {c.label}
                  </label>
                ))}
              </FilterSection>

              <FilterSection title="Couleurs">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {COLORS_LIST.map(c => (
                    <button key={c} onClick={() => toggleFilter('color', c)} style={{ padding: '8px 14px', borderRadius: 12, border: '1px solid', borderColor: filters.color.includes(c) ? '#017BFE' : '#EEE', background: filters.color.includes(c) ? 'rgba(1,123,254,0.05)' : 'white', color: filters.color.includes(c) ? '#017BFE' : '#666', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>{c}</button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ ...glassStyle, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
            <button onClick={() => setShowFilters(!showFilters)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F9FAFB', border: '1px solid #EEE', borderRadius: 14, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
              <LayoutGrid size={18} /> {showFilters ? 'Masquer filtres' : 'Afficher filtres'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ArrowUpDown size={16} color="#888" />
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: 'none', background: 'none', fontWeight: 700, fontSize: 14, outline: 'none', cursor: 'pointer', color: '#0D0D0D' }}>
                <option value="default">Trier par : Pertinence</option>
                <option value="price-asc">Prix : Croissant</option>
                <option value="price-desc">Prix : Décroissant</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {paginated.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          {paginated.length === 0 && (
            <div style={{ ...glassStyle, textAlign: 'center', padding: '100px 40px', marginTop: 40 }}>
              <Package size={48} color="#017BFE" style={{ marginBottom: 20, opacity: 0.2 }} />
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0D0D0D' }}>Aucun produit ne correspond à vos critères</h3>
              <p style={{ color: '#666', marginTop: 8 }}>Essayez de modifier vos filtres ou votre recherche.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 80 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: 48, height: 48, borderRadius: 16, border: '1px solid #EEE', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 1 ? 0.5 : 1 }}><ChevronLeft size={20} /></button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i+1} onClick={() => setPage(i+1)} style={{ width: 48, height: 48, borderRadius: 16, border: 'none', background: page === i+1 ? '#017BFE' : 'white', color: page === i+1 ? 'white' : '#0D0D0D', cursor: 'pointer', fontWeight: 800, boxShadow: page === i+1 ? '0 10px 20px -5px rgba(1,123,254,0.4)' : 'none', border: page === i+1 ? 'none' : '1px solid #EEE' }}>{i+1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: 48, height: 48, borderRadius: 16, border: '1px solid #EEE', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === totalPages ? 0.5 : 1 }}><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}