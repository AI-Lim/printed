import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, UserCircle, Search, Menu, X,
  LogOut, LayoutDashboard, PackageSearch, UserCog,
  ChevronRight, Sparkles,
} from 'lucide-react';
import { useCart, useAuth } from '../../context/AppContext';
import { IMG, NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { count }  = useCart();
  const { user, logout, isAdmin } = useAuth();

  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [query,        setQuery]        = useState('');
  const [cartBump,     setCartBump]     = useState(false);

  const userMenuRef  = useRef(null);
  const searchRef    = useRef(null);
  const prevCount    = useRef(count);

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Fermer le menu mobile sur changement de route
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Animation "bump" du panier quand un article est ajouté
  useEffect(() => {
    if (count > prevCount.current) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 400);
    }
    prevCount.current = count;
  }, [count]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
      setMobileOpen(false);
    }
  };

  const closeAll = () => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  };

  // ── Styles ─────────────────────────────────────────────────────────────────
  const iconBtn = {
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.2s var(--ease-spring), box-shadow 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  };

  const navLinkStyle = (active) => ({
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    color: active ? '#017BFE' : '#232323',
    position: 'relative',
    padding: '4px 0',
    transition: 'color 0.2s ease',
    letterSpacing: '0.01em',
  });

  return (
    <header style={{
      background: '#F4F4F4',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 24px',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>

        {/* ── Logo ─────────────────────────────────────────────────────────── */}
        <Link to="/" onClick={closeAll} style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <img
            src={IMG.logo}
            alt="Printed"
            style={{ height: 40, objectFit: 'contain', transition: 'transform 0.2s var(--ease-spring)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>

        {/* ── Nav desktop ──────────────────────────────────────────────────── */}
        <nav style={{ display: 'flex', gap: 20, flex: 1 }} className="hide-mobile">
          {NAV_LINKS.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={navLinkStyle(active)}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#017BFE'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#232323'; }}
              >
                {link.label}
                {/* Underline animée */}
                <span style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  height: 2,
                  width: active ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #017BFE, #00C2FF)',
                  borderRadius: 2,
                  transition: 'width 0.3s var(--ease-out)',
                }} />
              </Link>
            );
          })}
        </nav>

        {/* ── Search desktop ───────────────────────────────────────────────── */}
        <div ref={searchRef} style={{ position: 'relative' }} className="hide-mobile">
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: 28,
              padding: '0 8px 0 16px',
              boxShadow: '0 4px 20px rgba(1,123,254,0.15)',
              animation: 'scaleIn 0.2s var(--ease-spring)',
              width: 240,
            }}>
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 13,
                  fontFamily: 'Poppins, sans-serif',
                  background: 'transparent',
                  padding: '8px 0',
                }}
              />
              <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 6 }}>
                <Search size={15} color="#017BFE" />
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}>
                <X size={14} color="#999" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              style={iconBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(1,123,254,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
              aria-label="Rechercher"
            >
              <Search size={17} color="#232323" />
            </button>
          )}
        </div>

        {/* ── Actions ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          {/* Bouton personnalisation (desktop) */}
          <Link
            to="/personnalisation"
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
              color: 'white',
              borderRadius: 28,
              padding: '7px 16px',
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              transition: 'transform 0.2s var(--ease-spring), box-shadow 0.2s',
              boxShadow: '0 4px 12px rgba(1,123,254,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(1,123,254,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 4px 12px rgba(1,123,254,0.3)'; }}
          >
           
            Créer
          </Link>

          {/* User dropdown */}
          <div ref={userMenuRef} style={{ position: 'relative' }}>
            <button
              style={{
                ...iconBtn,
                background: user ? 'linear-gradient(135deg, #017BFE, #00C2FF)' : 'white',
              }}
              onClick={() => setUserMenuOpen(o => !o)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(1,123,254,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
              aria-label="Mon compte"
            >
              {user
                ? <span style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>{user.name[0].toUpperCase()}</span>
                : <UserCircle size={18} color="#232323" />
              }
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 10px)',
                background: 'white',
                borderRadius: 18,
                boxShadow: '0 12px 48px rgba(0,0,0,0.14)',
                padding: '6px 0',
                minWidth: 210,
                zIndex: 100,
                animation: 'scaleIn 0.2s var(--ease-spring)',
                transformOrigin: 'top right',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                {user ? (
                  <>
                    {/* Header */}
                    <div style={{
                      padding: '12px 16px 14px',
                      borderBottom: '1px solid #f0f0f0',
                      background: 'linear-gradient(135deg, #F4F9FF, #EBF5FF)',
                      borderRadius: '16px 16px 0 0',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontWeight: 800, fontSize: 15,
                        }}>
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: 13, color: '#232323' }}>{user.name}</p>
                          <p style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    {[
                      { to: '/profil',    icon: UserCog,        label: 'Mon profil' },
                      { to: '/commandes', icon: PackageSearch,  label: 'Mes commandes' },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeAll}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 16px', fontSize: 13, color: '#333',
                          textDecoration: 'none', transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F7FAFE'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <item.icon size={15} color="#017BFE" />
                        {item.label}
                        <ChevronRight size={13} color="#ccc" style={{ marginLeft: 'auto' }} />
                      </Link>
                    ))}

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={closeAll}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 16px', fontSize: 13, color: '#017BFE',
                          textDecoration: 'none', fontWeight: 700, transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F0F8FF'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <LayoutDashboard size={15} color="#017BFE" />
                        Panel Admin
                        <ChevronRight size={13} color="#ccc" style={{ marginLeft: 'auto' }} />
                      </Link>
                    )}

                    <div style={{ borderTop: '1px solid #f0f0f0', marginTop: 4 }}>
                      <button
                        onClick={() => { logout(); closeAll(); navigate('/'); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 16px', fontSize: 13, color: '#ef4444',
                          background: 'none', border: 'none', cursor: 'pointer',
                          width: '100%', transition: 'background 0.15s',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FFF5F5'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <LogOut size={15} />
                        Se déconnecter
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '8px 0' }}>
                    <Link
                      to="/connexion"
                      onClick={closeAll}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 16px', fontSize: 13, color: '#333',
                        textDecoration: 'none', transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F7FAFE'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <UserCircle size={15} color="#017BFE" />
                      Se connecter
                    </Link>
                    <Link
                      to="/inscription"
                      onClick={closeAll}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 16px', fontSize: 13, color: '#017BFE',
                        textDecoration: 'none', fontWeight: 700, transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F0F8FF'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Sparkles size={15} />
                      Créer un compte
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Panier */}
          <Link
            to="/panier"
            onClick={closeAll}
            style={{
              ...iconBtn,
              textDecoration: 'none',
              transform: cartBump ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s var(--ease-spring), box-shadow 0.2s',
            }}
            onMouseEnter={e => { if (!cartBump) { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(1,123,254,0.2)'; }}}
            onMouseLeave={e => { if (!cartBump) { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}}
            aria-label="Panier"
          >
            <ShoppingCart size={17} color={count > 0 ? '#017BFE' : '#232323'} />
            {count > 0 && (
              <span style={{
                position: 'absolute',
                top: -4, right: -4,
                background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
                color: 'white',
                borderRadius: '50%',
                width: 18, height: 18,
                fontSize: 10, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #F4F4F4',
                animation: cartBump ? 'scaleIn 0.3s var(--ease-spring)' : 'none',
              }}>
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Hamburger mobile */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(o => !o)}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s var(--ease-spring)',
            }}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span style={{
              transition: 'transform 0.3s var(--ease-spring), opacity 0.2s',
              display: 'flex',
              transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}>
              {mobileOpen ? <X size={20} color="#232323" /> : <Menu size={20} color="#232323" />}
            </span>
          </button>
        </div>
      </div>

      {/* ── Menu mobile ────────────────────────────────────────────────────── */}
      <div style={{
        background: 'white',
        borderTop: '1px solid #eee',
        padding: mobileOpen ? '16px 24px 20px' : '0 24px',
        maxHeight: mobileOpen ? '600px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s var(--ease-out), padding 0.3s ease',
      }}>
        {/* Search mobile */}
        <form onSubmit={handleSearch} style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={15} color="#999" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            style={{
              width: '100%',
              border: '1.5px solid #eee',
              borderRadius: 28,
              padding: '10px 16px 10px 40px',
              fontSize: 13,
              outline: 'none',
              fontFamily: 'Poppins, sans-serif',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = '#017BFE'}
            onBlur={e  => e.target.style.borderColor = '#eee'}
          />
        </form>

        {/* Nav links */}
        {NAV_LINKS.map((link, i) => {
          const active = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 14,
                fontWeight: 600,
                color: active ? '#017BFE' : '#232323',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid #f5f5f5',
                transition: 'color 0.2s',
                animationDelay: `${i * 40}ms`,
              }}
            >
              {link.label}
              {active && <ChevronRight size={15} color="#017BFE" />}
            </Link>
          );
        })}

        {/* Auth buttons */}
        {!user && (
          <div style={{ display: 'flex', gap: 12, paddingTop: 16 }}>
            <Link
              to="/connexion"
              onClick={closeAll}
              style={{
                flex: 1, textAlign: 'center', padding: '11px',
                borderRadius: 28, border: '2px solid #017BFE',
                color: '#017BFE', textDecoration: 'none',
                fontWeight: 700, fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              onClick={closeAll}
              style={{
                flex: 1, textAlign: 'center', padding: '11px',
                borderRadius: 28,
                background: 'linear-gradient(135deg, #017BFE, #00C2FF)',
                color: 'white', textDecoration: 'none',
                fontWeight: 700, fontSize: 13,
                boxShadow: '0 4px 12px rgba(1,123,254,0.3)',
              }}
            >
              S'inscrire
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}