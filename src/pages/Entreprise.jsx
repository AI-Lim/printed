import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Award, TrendingUp, Check, 
  ChevronRight, Briefcase, GraduationCap, Store, 
  PartyPopper, Trophy, Mic2, ArrowRight, Zap
} from 'lucide-react';

const OFFERS = [
  { title: 'Pack Starter', price: '50 000', articles: '10 articles', features: ['Personnalisation complète', 'Livraison incluse', 'Facture professionnelle', 'Support dédié'], color: '#F0F7FF', textColor: '#017BFE' },
  { title: 'Pack Business', price: '150 000', articles: '30+ articles', features: ['Tout du Starter', 'Remise 15%', 'Délai prioritaire', 'Devis personnalisé', 'Logo haute résolution'], color: '#017BFE', featured: true, textColor: '#FFFFFF' },
  { title: 'Pack Enterprise', price: 'Sur devis', articles: '100+ articles', features: ['Tout du Business', 'Remise 25%', 'Account manager', 'Stock géré', 'Multi-site possible'], color: '#0D0D0D', textColor: '#FFFFFF' },
];

// ── Hook Parallax ─────────────────────────────────────────────────────────────
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

export default function Entreprise() {
  const parallaxHero = useParallax(0.05);

  const containerStyle = {
    fontFamily: 'Poppins, sans-serif',
    color: '#0D0D0D',
    background: '#FCFDFF',
    overflowX: 'hidden'
  };

  const glassCard = {
    background: 'white',
    borderRadius: 24,
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      {/* ── HERO SECTION ── */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0D0D0D 0%, #017BFE 100%)', 
        padding: '120px 24px', 
        color: 'white', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Cercles décoratifs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        
        <div ref={parallaxHero} style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 8, 
                background: 'rgba(255,255,255,0.1)', padding: '8px 20px', 
                borderRadius: 40, marginBottom: 24, fontSize: 13, fontWeight: 600,
                backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)'
            }}>
                <Briefcase size={16} /> Solutions B2B & Événementiel
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, marginBottom: 24, lineHeight: 1.1, letterSpacing: '-2px' }}>
                Habillez votre <span style={{ color: '#00C2FF' }}>Réussite</span>.
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, marginBottom: 40, lineHeight: 1.7, maxWidth: 650, margin: '0 auto 40px' }}>
                De la startup au grand groupe, Printed accompagne les entreprises béninoises dans la création de textiles et goodies premium à leur image.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary" style={{ background: 'white', color: '#017BFE', padding: '16px 40px', borderRadius: 16, fontSize: 16, fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                    Demander un devis <ArrowRight size={20} />
                </Link>
            </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section style={{ marginTop: -50, padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { icon: Building2, stat: '50+', label: 'Entreprises clientes', color: '#017BFE' },
            { icon: Users, stat: '5 000+', label: 'Articles produits', color: '#02AB84' },
            { icon: Award, stat: '4.9/5', label: 'Satisfaction client', color: '#E6B95E' },
            { icon: Zap, stat: '48h', label: 'Délai express', color: '#8B5CF6' },
          ].map((s, i) => (
            <div key={i} className="hover-lift" style={{ ...glassCard, padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <s.icon size={24} color={s.color} />
              </div>
              <p style={{ fontSize: 32, fontWeight: 900, color: '#0D0D0D', marginBottom: 4 }}>{s.stat}</p>
              <p style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OFFERS SECTION ── */}
      <section style={{ maxWidth: 1200, margin: '100px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-1px' }}>
                Des Packs <span style={{ color: '#017BFE' }}>Sur-mesure</span>
            </h2>
            <p style={{ color: '#666', fontSize: 16 }}>Une tarification dégressive adaptée à votre volume de commande.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'center' }}>
          {OFFERS.map((offer, i) => (
            <div key={i} className="hover-lift" style={{ 
                ...glassCard, 
                overflow: 'hidden', 
                border: offer.featured ? '2px solid #017BFE' : '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                transform: offer.featured ? 'scale(1.05)' : 'scale(1)',
                zIndex: offer.featured ? 2 : 1
            }}>
              {offer.featured && (
                <div style={{ background: '#017BFE', color: 'white', textAlign: 'center', padding: '8px', fontSize: 12, fontWeight: 800, letterSpacing: '1px' }}>
                    <TrendingUp size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> OFFRE LA PLUS DEMANDÉE
                </div>
              )}
              
              <div style={{ background: offer.color, padding: 40, color: offer.textColor }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{offer.title}</h3>
                <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 24 }}>{offer.articles}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 36, fontWeight: 900 }}>{offer.price}</span>
                    {offer.price !== 'Sur devis' && <span style={{ fontSize: 14, fontWeight: 700, opacity: 0.8 }}>FCFA</span>}
                </div>
              </div>

              <div style={{ padding: 40, background: 'white' }}>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 40 }}>
                  {offer.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, fontSize: 15, color: '#444' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={14} color="#017BFE" strokeWidth={3} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10,
                    background: offer.featured ? '#017BFE' : '#0D0D0D', 
                    color: 'white', padding: '16px', borderRadius: 16, 
                    textDecoration: 'none', fontWeight: 800, fontSize: 15,
                    transition: 'all 0.2s'
                }}>
                  Sélectionner ce pack <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section style={{ background: '#F4F9FF', padding: '100px 24px', borderRadius: '60px 60px 0 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>Ils nous font confiance</h2>
            <p style={{ color: '#666' }}>Quel que soit votre secteur, nous avons une solution textile.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: GraduationCap, title: 'Écoles & Universités', desc: 'Uniformes, clubs et promos.', color: '#017BFE' },
              { icon: Store, title: 'PME & Startups', desc: 'Welcome packs et tenues staff.', color: '#02AB84' },
              { icon: PartyPopper, title: 'Événementiel', desc: 'Festivals, mariages et galas.', color: '#E6B95E' },
              { icon: Trophy, title: 'Clubs Sportifs', desc: 'Maillots et équipements.', color: '#F43F5E' },
              { icon: Mic2, title: 'Artistes & Merch', desc: 'Collections et tournées.', color: '#8B5CF6' },
            ].map((u, i) => (
              <div key={i} className="hover-lift" style={{ background: 'white', borderRadius: 24, padding: 32, textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${u.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <u.icon size={32} color={u.color} />
                </div>
                <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{u.title}</h4>
                <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '100px 24px', textAlign: 'center', background: 'white' }}>
        <div style={{ 
            maxWidth: 900, margin: '0 auto', background: '#0D0D0D', borderRadius: 40, padding: '64px 32px', color: 'white',
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(1,123,254,0.1)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16 }}>Prêt à lancer votre projet ?</h2>
            <p style={{ opacity: 0.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
                Nos conseillers vous accompagnent du choix du textile à la validation du BAT.
            </p>
            <Link to="/contact" style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#017BFE', color: 'white', padding: '18px 48px', borderRadius: 16, 
                textDecoration: 'none', fontWeight: 800, fontSize: 16,
                boxShadow: '0 15px 30px rgba(1,123,254,0.3)'
            }}>
                Parler à un expert <ArrowRight size={20} />
            </Link>
        </div>
      </section>
    </div>
  );
}