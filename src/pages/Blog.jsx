import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, ArrowRight, BookOpen, 
  Palette, Shirt, Heart, Globe, Gamepad2, 
  Home as HomeIcon, Search, ChevronRight, TrendingUp 
} from 'lucide-react';

const POSTS = [
  { id: 1, title: 'Les tendances de la mode personnalisée en 2025', category: 'Mode', date: '15 mars 2025', excerpt: 'Découvrez les grandes tendances qui vont marquer le monde de l\'impression à la demande cette année...', icon: Palette, readTime: '5 min', tag: 'Tendances', color: '#017BFE' },
  { id: 2, title: 'Comment choisir le bon tissu pour vos t-shirts', category: 'Conseils', date: '8 mars 2025', excerpt: 'Coton, polyester, mixte... Votre choix de matière influence la qualité de l\'impression et le confort...', icon: Shirt, readTime: '4 min', tag: 'Guide', color: '#02AB84' },
  { id: 3, title: '5 idées de cadeaux personnalisés pour la Saint-Valentin', category: 'Idées', date: '1 mars 2025', excerpt: 'Exprimez votre amour avec des cadeaux uniques : mugs, t-shirts, coques personnalisées...', icon: Heart, readTime: '3 min', tag: 'Cadeaux', color: '#F43F5E' },
  { id: 4, title: 'L\'impression à la demande au Bénin : état des lieux', category: 'Marché', date: '22 fév 2025', excerpt: 'Le marché de la personnalisation est en plein essor en Afrique de l\'Ouest. Printed se positionne...', icon: Globe, readTime: '6 min', tag: 'Marché', color: '#8B5CF6' },
  { id: 5, title: 'Les meilleurs designs Otaku pour 2025', category: 'Gaming', date: '15 fév 2025', excerpt: 'Notre sélection des personnages et designs anime les plus demandés sur notre plateforme...', icon: Gamepad2, readTime: '4 min', tag: 'Otaku', color: '#E6B95E' },
  { id: 6, title: 'DIY : Personnalisez votre intérieur avec Printed', category: 'DIY', date: '5 fév 2025', excerpt: 'Coussins, tableaux, textiles de maison... Comment créer un intérieur unique grâce à l\'impression...', icon: HomeIcon, readTime: '5 min', tag: 'DIY', color: '#FF7E33' },
];

const CATEGORIES = ['Tous', 'Mode', 'Conseils', 'Idées', 'DIY', 'Marché', 'Gaming'];

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

export default function Blog() {
  const [activeCat, setActiveCat] = useState('Tous');
  const parallaxFeatured = useParallax(0.04);
  const featured = POSTS[0];

  const glassStyle = {
    background: 'white',
    borderRadius: 24,
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ background: '#FCFDFF', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', color: '#0D0D0D' }}>
      
      {/* ── HEADER ── */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: 8, 
          background: 'rgba(1,123,254,0.08)', padding: '8px 20px', 
          borderRadius: 40, color: '#017BFE', fontSize: 13, fontWeight: 700, marginBottom: 16 
        }}>
          <BookOpen size={16} /> LE JOURNAL PRINTED
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-2px' }}>
          L'actu de la <span style={{ background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Personnalisation</span>
        </h1>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Tendances, guides pratiques et inspirations pour créer des articles qui vous ressemblent.
        </p>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 100px' }}>
        
        {/* ── FEATURED POST (PARALLAX) ── */}
        <div ref={parallaxFeatured} style={{ marginBottom: 60, transition: 'transform 0.1s ease-out' }}>
          <Link to={`/blog/${featured.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #0D0D0D 0%, #017BFE 100%)', 
              borderRadius: 32, 
              padding: '60px 48px', 
              display: 'grid', 
              gridTemplateColumns: '1fr 300px', 
              gap: 40, 
              alignItems: 'center', 
              color: 'white',
              boxShadow: '0 30px 60px -12px rgba(1,123,254,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: 12, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  ✨ À LA UNE
                </span>
                <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, margin: '20px 0', lineHeight: 1.2 }}>{featured.title}</h2>
                <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 32, lineHeight: 1.7, maxWidth: 500 }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
                    <Calendar size={14} /> {featured.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
                    <Clock size={14} /> {featured.readTime} de lecture
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                <div style={{ width: 180, height: 180, borderRadius: 40, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <featured.icon size={80} color="white" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* ── FILTERS ── */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48, justifyContent: 'center' }}>
          {CATEGORIES.map(c => (
            <button 
              key={c} 
              onClick={() => setActiveCat(c)}
              style={{ 
                padding: '10px 24px', borderRadius: 16, border: '1px solid', 
                borderColor: activeCat === c ? '#017BFE' : '#EEE',
                background: activeCat === c ? '#017BFE' : 'white', 
                color: activeCat === c ? 'white' : '#666', 
                fontWeight: 700, cursor: 'pointer', fontSize: 14,
                transition: 'all 0.2s',
                boxShadow: activeCat === c ? '0 10px 20px -5px rgba(1,123,254,0.3)' : 'none'
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── BLOG GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
          {POSTS.slice(1).map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div 
                className="hover-lift"
                style={{ ...glassStyle, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ height: 200, background: `${post.color}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 80, height: 80, borderRadius: 24, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
                    <post.icon size={40} color={post.color} />
                  </div>
                  <div style={{ position: 'absolute', top: 20, left: 20, background: 'white', padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800, color: post.color, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    {post.tag}
                  </div>
                </div>

                <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontSize: 12, color: '#aaa', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={14} /> {post.date}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, lineHeight: 1.4, color: '#0D0D0D' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#017BFE', fontWeight: 800, fontSize: 14 }}>
                    Lire l'article <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: '#0D0D0D', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ color: 'white', fontSize: 32, fontWeight: 900, marginBottom: 16 }}>Ne manquez aucune tendance</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 40 }}>Inscrivez-vous à notre newsletter pour recevoir nos guides exclusifs et nos offres spéciales.</p>
          <div style={{ display: 'flex', gap: 12, background: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)' }}>
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              style={{ flex: 1, background: 'none', border: 'none', padding: '0 20px', color: 'white', outline: 'none', fontFamily: 'Poppins' }} 
            />
            <button style={{ background: '#017BFE', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 14, fontWeight: 800, cursor: 'pointer' }}>
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}