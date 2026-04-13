import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, ArrowRight,
  Facebook, Instagram, Youtube,
  ShoppingBag, Palette, BookOpen, Building2,
  MessageCircle, HelpCircle, RotateCcw, FileText,
  Shield, ScrollText, Cookie, ChevronRight,
} from 'lucide-react';
import { IMG } from '../../utils/constants';

const FOOTER_COLS = [
  {
    title: 'À propos',
    icon: BookOpen,
    links: [
      { label: 'Notre blog',       path: '/blog',       icon: BookOpen },
      { label: 'Comment ça marche',path: '/blog',       icon: HelpCircle },
      { label: 'Notre mission',    path: '/entreprise', icon: Building2 },
      { label: 'Témoignages',      path: '/blog',       icon: MessageCircle },
    ],
  },
  {
    title: 'Boutique',
    icon: ShoppingBag,
    links: [
      { label: 'Nouveautés',       path: '/catalogue',       icon: ShoppingBag },
      { label: 'Best-sellers',     path: '/catalogue',       icon: ShoppingBag },
      { label: 'Personnalisation', path: '/personnalisation', icon: Palette },
      { label: 'Entreprises',      path: '/entreprise',       icon: Building2 },
    ],
  },
  {
    title: 'Support & Aide',
    icon: HelpCircle,
    links: [
      { label: 'FAQ',                  path: '/contact',   icon: HelpCircle },
      { label: 'Suivi de commande',    path: '/commandes', icon: RotateCcw },
      { label: 'Politique de retour',  path: '/contact',   icon: RotateCcw },
      { label: 'Nous contacter',       path: '/contact',   icon: MessageCircle },
    ],
  },
  {
    title: 'Légal',
    icon: Shield,
    links: [
      { label: 'Mentions légales',          path: '#', icon: FileText },
      { label: 'CGV',                       path: '#', icon: ScrollText },
      { label: 'Politique de confidentialité', path: '#', icon: Shield },
      { label: 'Cookies',                   path: '#', icon: Cookie },
    ],
  },
];

const SOCIALS = [
  { icon: Facebook,  label: 'Facebook',  href: '#', color: '#1877F2' },
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E4405F' },
  { icon: Youtube,   label: 'TikTok',    href: '#', color: '#FF0050' },
];

const CONTACTS = [
  { icon: MapPin, text: 'Abomey-Calavi, Bénin' },
  { icon: Phone,  text: '+229 01 00 00 00 00' },
  { icon: Mail,   text: 'mailprinted@gmail.com' },
];

export default function Footer() {
  const [email,  setEmail]  = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubDone(true); setEmail(''); }
  };

  return (
    <footer style={{ background: '#0D0D0D', color: 'white', marginTop: 'auto', position: 'relative', overflow: 'hidden' }}>

      {/* Mesh décoratif */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 50% at 10% 20%, rgba(1,123,254,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 90% 80%, rgba(0,194,255,0.08) 0%, transparent 60%)
        `,
      }} />

      {/* ── Bande newsletter ───────────────────────────────────────────────── */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '48px 24px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
        }}>
          <div className="reveal">
            <p style={{ fontSize: 12, fontWeight: 700, color: '#017BFE', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>
              Newsletter
            </p>
            <h3 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.3, marginBottom: 8 }}>
              Restez dans la boucle{' '}
              <span style={{ background: 'linear-gradient(135deg, #017BFE, #00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Printed
              </span>
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Tendances, promos exclusives et nouveautés directement dans votre boîte mail.
            </p>
          </div>

          <div className="reveal">
            {subDone ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(2,171,132,0.12)',
                border: '1px solid rgba(2,171,132,0.3)',
                borderRadius: 16, padding: '20px 24px',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#02AB84', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRight size={18} color="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Vous êtes inscrit !</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>Bienvenue dans la communauté Printed.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSub} style={{ display: 'flex', gap: 0, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    background: 'transparent', padding: '16px 20px',
                    fontSize: 14, color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
                    border: 'none', cursor: 'pointer',
                    padding: '0 24px', color: 'white',
                    fontWeight: 700, fontSize: 13,
                    fontFamily: 'Poppins, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 8,
                    transition: 'opacity 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  S'inscrire <ArrowRight size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Corps principal ─────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '56px 24px 40px',
        display: 'grid',
        gridTemplateColumns: '260px repeat(4, 1fr)',
        gap: 40,
      }}>

        {/* Brand column */}
        <div className="reveal">
          <Link to="/" style={{ display: 'inline-block', marginBottom: 20 }}>
            <img
              src={IMG.logo}
              alt="Printed"
              style={{ height: 44, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
          </Link>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 24 }}>
            L'impression à la demande au Bénin. Personnalisez, commandez, exprimez-vous.
          </p>

          {/* Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {CONTACTS.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <c.icon size={14} color="#017BFE" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{c.text}</span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 10 }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s var(--ease-spring)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = s.color;
                  e.currentTarget.style.borderColor = s.color;
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.1)';
                  e.currentTarget.style.boxShadow = `0 6px 16px ${s.color}44`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <s.icon size={15} color="white" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col, ci) => (
          <div key={col.title} className="reveal" style={{ animationDelay: `${ci * 60}ms` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <col.icon size={14} color="#017BFE" />
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                {col.title}
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 13, color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    padding: '6px 0',
                    transition: 'color 0.2s, gap 0.2s',
                    borderRadius: 6,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.gap = '12px';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.gap = '8px';
                  }}
                >
                  <ChevronRight size={12} style={{ flexShrink: 0, opacity: 0.4 }} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bas de page ─────────────────────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '20px 24px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Printed. Tous droits réservés. — Abomey-Calavi, Bénin
          </p>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            Fait avec
            <span style={{ color: '#E5A6A8' }}>♥</span>
            au Bénin
          </p>
        </div>
      </div>
    </footer>
  );
}