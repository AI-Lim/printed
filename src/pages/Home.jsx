import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, ChevronRight, Check, ArrowRight,
  Truck, Palette, BadgeCheck, Headphones,
  Plus, MessageCircle, Zap, TrendingUp,
  ShoppingBag, Users, Award,
} from 'lucide-react';
import { IMG, MOCK_PRODUCTS } from '../utils/constants';
import ProductCard from '../components/ui/ProductCard';
import photoHero from '../assets/images/photo.png'; // L'importation correcte
// ── Données ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Ayo K.',   rating: 5,   text: 'Qualité impressionnante ! Mon t-shirt Otaku est exactement comme sur la preview. Livraison rapide au Bénin !' },
  { name: 'Fatou M.', rating: 5,   text: "Super service ! J'ai commandé des mugs personnalisés pour notre entreprise. Le résultat est impeccable." },
  { name: 'Koffi D.', rating: 4.8, text: "L'outil de personnalisation est très simple à utiliser. Je recommande Printed à tous mes amis !" },
];

const FAQ_ITEMS = [
  { q: 'Comment personnaliser un article ?',        a: "Choisissez un produit, téléchargez votre image ou choisissez parmi nos modèles, prévisualisez en temps réel, puis commandez !" },
  { q: 'Quels sont les délais de livraison ?',      a: '3 à 7 jours ouvés au Bénin. Pour Cotonou et environs : 24–48h possible.' },
  { q: 'Quels moyens de paiement acceptez-vous ?',  a: 'Mobile Money (MTN, Moov, Celtiis) et carte bancaire (Visa/Mastercard).' },
  { q: 'Quels types d\'articles proposez-vous ?',   a: 'Vêtements (T-shirts, sweats, pantalons), accessoires (mugs, casquettes, sacs) et objets personnalisés.' },
  { q: 'Comment contacter le service client ?',     a: 'Par email à mailprinted@gmail.com, par téléphone +229 01 00 00 00 00, ou via notre formulaire de contact.' },
];

const WHY_US = [
  { icon: Truck,      title: 'Livraison rapide',         desc: 'Recevez vos commandes dans les meilleurs délais, directement chez vous.', color: '#017BFE', bg: '#E5F4FF' },
  { icon: Palette,    title: 'Personnalisation illimitée',desc: 'Ajoutez vos images, textes et designs sans aucune restriction.',          color: '#02AB84', bg: '#E5F9F4' },
  { icon: BadgeCheck, title: 'Impression de qualité',    desc: "Techniques d'impression durables et matériaux de premier choix.",         color: '#E6B95E', bg: '#FFF8E5' },
  { icon: Headphones, title: 'Support réactif',          desc: 'Une équipe à votre écoute pour répondre à toutes vos questions.',         color: '#8B5CF6', bg: '#F5F0FF' },
];

const STATS = [
  { icon: Users,     value: '2 000+', label: 'Clients satisfaits' },
  { icon: ShoppingBag, value: '8 000+', label: 'Articles produits' },
  { icon: Award,     value: '4.9/5',  label: 'Note moyenne' },
  { icon: Zap,       value: '48h',    label: 'Délai express' },
];

// ── Composant compteur animé ──────────────────────────────────────────────────
function AnimatedStat({ value, label, icon: Icon, color }) {
  return (
    <div className="reveal" style={{
      textAlign: 'center',
      padding: '32px 20px',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <Icon size={22} color={color} />
      </div>
      <p style={{
        fontSize: 32, fontWeight: 900, color: '#0D0D0D',
        fontFamily: 'Poppins, sans-serif', marginBottom: 4,
        background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{value}</p>
      <p style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{label}</p>
    </div>
  );
}

// ── Parallax hook ─────────────────────────────────────────────────────────────
function useParallax(speed = 0.15) {
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState('Tout');
  const [openFaq,   setOpenFaq]   = useState(null);

  const parallaxHero = useParallax(0.08);

  const tabs = ['Tout', 'Plus vendu', 'Populaire'];
  const featured = MOCK_PRODUCTS.slice(0, 5);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="mesh-bg" style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Orbes décoratifs */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '10%', right: '8%',
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(1,123,254,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} className="floatSlow" />
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '15%', left: '5%',
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} className="float" />

        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '80px 24px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 64, alignItems: 'center', width: '100%',
        }}>
          {/* Texte */}
          <div className="slideInLeft">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(1,123,254,0.08)',
              border: '1px solid rgba(1,123,254,0.2)',
              borderRadius: 28, padding: '6px 16px',
              marginBottom: 24,
            }}>
              <Zap size={13} color="#017BFE" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Impression à la demande — Bénin
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 24,
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-2px',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Personnalisez</span>
              <br />votre style,
              <br />
              <span style={{ color: '#0D0D0D' }}>exprimez-vous.</span>
            </h1>

            <p style={{
              fontSize: 16, color: '#555', marginBottom: 40,
              lineHeight: 1.8, maxWidth: 480,
            }}>
              Vêtements, mugs, accessoires — chaque article à votre image. Créez, commandez, recevez en 48h.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/personnalisation" className="btn-primary" style={{ fontSize: 15, padding: '15px 36px' }}>
                Créer mon design <ChevronRight size={18} />
              </Link>
              <Link
                to="/catalogue"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  border: '2px solid rgba(1,123,254,0.3)', color: '#017BFE',
                  padding: '13px 28px', borderRadius: 40,
                  fontWeight: 700, textDecoration: 'none', fontSize: 15,
                  transition: 'all 0.25s',
                  background: 'rgba(1,123,254,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#017BFE'; e.currentTarget.style.background = 'rgba(1,123,254,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(1,123,254,0.3)'; e.currentTarget.style.background = 'rgba(1,123,254,0.04)'; }}
              >
                Voir le catalogue
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, marginTop: 40, flexWrap: 'wrap' }}>
              {[
                { icon: Check, text: 'Livraison 48h' },
                { icon: Check, text: 'Mobile Money accepté' },
                { icon: Check, text: 'Qualité garantie' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#017BFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <b.icon size={10} color="white" />
                  </div>
                  <span style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visuel hero avec image unique photo.png */}
          <div
            ref={parallaxHero}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="slideInRight"
          >
            <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ 
                    position: 'absolute', top: '5%', right: '-5%', width: '100%', height: '100%', 
                    background: 'linear-gradient(135deg, #017BFE, #00C2FF)', borderRadius: 32, 
                    opacity: 0.1, transform: 'rotate(3deg)', zIndex: -1 
                }} />
                <img 
  src={photoHero} 
  alt="Printed Hero" 
  style={{ 
    width: '100%', 
    maxWidth: 500, 
    borderRadius: 32, 
    boxShadow: '0 25px 50px -12px rgba(1, 123, 254, 0.25)' 
  }} 
/>
                
                {/* Badge flottant conservé pour le style */}
                <div className="float pulseGlow" style={{
                  position: 'absolute', top: 20, right: -20,
                  background: 'white', borderRadius: 16,
                  padding: '10px 16px',
                  boxShadow: '0 8px 32px rgba(1,123,254,0.2)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <Star size={14} fill="#E6B95E" stroke="#E6B95E" />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0D0D0D' }}>4.9</span>
                  <span style={{ fontSize: 11, color: '#888' }}>/ 5</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? '1px solid #F0F0F0' : 'none' }}>
              <AnimatedStat {...s} color={['#017BFE','#02AB84','#E6B95E','#8B5CF6'][i]} />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Grille photos */}
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { img: IMG.product1, radius: '24px 8px 8px 24px', delay: '0ms' },
              { img: IMG.product2, radius: '8px 24px 24px 8px', delay: '80ms' },
              { img: IMG.product3, radius: '8px 24px 24px 8px', delay: '160ms' },
              { img: IMG.product4, radius: '24px 8px 8px 24px', delay: '240ms' },
            ].map((item, i) => (
              <div
                key={i}
                className="img-zoom-container hover-lift"
                style={{
                  borderRadius: item.radius, overflow: 'hidden',
                  height: 200, background: '#F0F0F0',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  animationDelay: item.delay,
                }}
              >
                <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity='0'} />
              </div>
            ))}
          </div>

          {/* Texte */}
          <div className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
              À propos de nous
            </p>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, marginBottom: 20, lineHeight: 1.2, letterSpacing: '-1px' }}>
              <span style={{ background: 'linear-gradient(135deg, #017BFE, #00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Printed</span>
              {' '}—{' '}L'impression à la demande au Bénin
            </h2>
            <p style={{ color: '#666', lineHeight: 1.9, marginBottom: 32, fontSize: 15 }}>
              Printed se positionne comme une solution innovante sur le marché béninois, offrant aux clients la possibilité de visualiser, personnaliser et commander des articles directement en ligne — vêtements, accessoires ou objets du quotidien.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36 }}>
              {['Livraison rapide', 'Qualité premium', 'Support 24/7', 'Satisfaction garantie'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Check size={12} color="white" />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>{item}</span>
                </div>
              ))}
            </div>

            <Link to="/entreprise" className="btn-secondary" style={{ fontSize: 14 }}>
              En savoir plus <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          POURQUOI NOUS
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#F8FBFF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }} className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
              Notre différence
            </p>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1px' }}>
              Pourquoi choisir Printed ?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }} className="stagger">
            {WHY_US.map((item, i) => (
              <div
                key={i}
                className="reveal hover-lift"
                style={{
                  borderRadius: 24, background: 'white',
                  padding: '36px 28px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  cursor: 'default',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: 18,
                  background: item.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 22,
                  transition: 'transform 0.3s var(--ease-spring)',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(-8deg) scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
                >
                  <item.icon size={26} color={item.color} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0D0D0D', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: 'linear-gradient(135deg, #017BFE, #00C2FF)', padding: '18px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{
              color: 'white', fontWeight: 700, fontSize: 16,
              fontFamily: 'Poppins, sans-serif',
              marginRight: 48, whiteSpace: 'nowrap', opacity: 0.9,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              Printed <span style={{ opacity: 0.5 }}>✦</span> Print your style <span style={{ opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          PRODUITS
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, flexWrap: 'wrap', gap: 16 }} className="reveal">
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
                Notre sélection
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px' }}>
                Nos meilleurs produits
              </h2>
            </div>
            <Link
              to="/catalogue"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: '#017BFE', textDecoration: 'none',
                fontWeight: 700, fontSize: 14,
                borderBottom: '2px solid rgba(1,123,254,0.3)',
                paddingBottom: 2,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#017BFE'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(1,123,254,0.3)'}
            >
              Voir tout le catalogue <ArrowRight size={15} />
            </Link>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36 }} className="reveal">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  padding: '8px 20px', borderRadius: 28,
                  border: activeTab === t ? 'none' : '1px solid #E5E7EB',
                  cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  background: activeTab === t ? 'linear-gradient(135deg, #017BFE, #00C2FF)' : 'white',
                  color: activeTab === t ? 'white' : '#666',
                  transition: 'all 0.25s var(--ease-spring)',
                  boxShadow: activeTab === t ? '0 4px 12px rgba(1,123,254,0.3)' : 'none',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 24 }} className="stagger">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          AVIS
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: '#F8FBFF', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(1,123,254,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }} className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>Témoignages</p>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1px' }}>
              Ce qu'ils disent de nous
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }} className="stagger">
            {REVIEWS.map((r, i) => (
              <div key={i} className="reveal hover-lift" style={{
                background: 'white', borderRadius: 24, padding: 28,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)',
                animationDelay: `${i * 80}ms`,
              }}>
                {/* Étoiles */}
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} fill="#E6B95E" stroke="#E6B95E" />
                  ))}
                  <span style={{ fontSize: 12, color: '#888', marginLeft: 6, fontWeight: 700 }}>{r.rating}</span>
                </div>

                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
                  "{r.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 16, color: 'white',
                  }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#0D0D0D' }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: '#888' }}>Client vérifié</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          <div className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, marginBottom: 40, letterSpacing: '-1px' }}>
              Questions fréquentes
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 16, overflow: 'hidden',
                    border: `1px solid ${openFaq === i ? 'rgba(1,123,254,0.2)' : '#F0F0F0'}`,
                    background: openFaq === i ? 'rgba(1,123,254,0.02)' : 'white',
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: '100%', padding: '18px 20px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 14, fontWeight: 600, textAlign: 'left',
                      fontFamily: 'Poppins, sans-serif', color: '#0D0D0D',
                      gap: 12,
                    }}
                  >
                    <span>{item.q}</span>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: openFaq === i ? '#017BFE' : '#F4F4F4',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.25s, transform 0.3s var(--ease-spring)',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      <Plus size={14} color={openFaq === i ? 'white' : '#555'} />
                    </span>
                  </button>

                  <div style={{
                    maxHeight: openFaq === i ? 200 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s var(--ease-out)',
                  }}>
                    <p style={{ padding: '0 20px 18px', fontSize: 14, color: '#666', lineHeight: 1.8 }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA contact */}
          <div className="reveal" style={{ position: 'sticky', top: 100 }}>
            <div style={{
              background: 'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)',
              borderRadius: 32, padding: '48px 40px',
              color: 'white', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-30%', right: '-20%',
                width: 200, height: 200, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: '-20%', left: '-10%',
                width: 150, height: 150, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
              }} />

              <div style={{
                width: 64, height: 64, borderRadius: 20,
                background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <MessageCircle size={28} color="white" />
              </div>

              <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, fontFamily: 'Poppins, sans-serif' }}>
                Vous avez encore des questions ?
              </h3>
              <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 32, lineHeight: 1.7 }}>
                Notre équipe est disponible du lundi au samedi, 8h–18h. Réponse garantie sous 24h.
              </p>

              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'white', color: '#017BFE',
                  padding: '14px 32px', borderRadius: 40,
                  textDecoration: 'none', fontWeight: 800, fontSize: 15,
                  transition: 'transform 0.2s var(--ease-spring), box-shadow 0.2s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
              >
                Nous contacter <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '120px 24px', background: '#0D0D0D', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(1,123,254,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }} className="reveal">
          <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>
            Prêt à vous lancer ?
          </p>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900, color: 'white',
            marginBottom: 24, lineHeight: 1.1, letterSpacing: '-2px',
          }}>
            Créez votre produit{' '}
            <span style={{
              background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>unique</span>{' '}
            dès maintenant.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', marginBottom: 48, lineHeight: 1.8 }}>
            Rejoignez des milliers de clients qui expriment leur style avec Printed.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/personnalisation" className="btn-primary" style={{ fontSize: 16, padding: '16px 40px' }}>
              Commencer maintenant <ChevronRight size={18} />
            </Link>
            <Link
              to="/catalogue"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', padding: '14px 32px', borderRadius: 40,
                fontWeight: 700, textDecoration: 'none', fontSize: 15,
                transition: 'border-color 0.2s, background 0.2s',
                background: 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}