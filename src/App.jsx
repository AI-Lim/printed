import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider, AuthProvider, useAuth } from './context/AppContext';
import { useEffect, useRef } from 'react';
import Navbar  from './components/layout/Navbar';
import Footer  from './components/layout/Footer';

// ── Public pages ──────────────────────────────────────────────────────────────
import Home            from './pages/Home';
import Catalogue       from './pages/Catalogue';
import ProductDetail   from './pages/ProductDetail';
import Contact         from './pages/Contact';
import Cart            from './pages/Cart';
import Checkout        from './pages/Checkout';
import Personnalisation from './pages/Personnalisation';
import Blog            from './pages/Blog';
import Entreprise      from './pages/Entreprise';
import NotFound        from './pages/NotFound';

// ── Auth pages ────────────────────────────────────────────────────────────────
import Login           from './pages/auth/Login';
import Register        from './pages/auth/Register';
import ForgotPassword  from './pages/auth/ForgotPassword';

// ── Client pages ──────────────────────────────────────────────────────────────
import Profile         from './pages/client/Profile';
import OrderTracking from './pages/client/OrderTracking';

// ── Admin pages ───────────────────────────────────────────────────────────────
import Dashboard       from './pages/admin/Dashboard';
import AdminProducts   from './pages/admin/AdminProducts';
import AdminOrders     from './pages/admin/AdminOrders';
import AdminUsers      from './pages/admin/AdminUsers';
import AdminStats      from './pages/admin/AdminStats';
import AdminSettings   from './pages/admin/AdminSettings';

// ── Guards ────────────────────────────────────────────────────────────────────
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/connexion" replace />;
}

function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/connexion" replace />;
  if (!isAdmin)         return <Navigate to="/"           replace />;
  return children;
}

// ── Scroll to top on route change ─────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// ── Scroll reveal observer ────────────────────────────────────────────────────
function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const refresh = () =>
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));

    refresh();
    // Re-scan après chaque navigation (contenu dynamique)
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}

// ── Cursor glow (desktop uniquement) ─────────────────────────────────────────
function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Seulement sur les appareils avec pointeur précis
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

// ── Navbar scroll effect ──────────────────────────────────────────────────────
function NavbarScroll() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('navbar-scrolled');
      else                      header.classList.remove('navbar-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

// ── Page wrapper avec animation d'entrée ──────────────────────────────────────
function PageWrapper({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

// ── Layout wrapper (Navbar + Footer) ─────────────────────────────────────────
function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <PageWrapper>{children}</PageWrapper>
      </main>
      <Footer />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <CursorGlow />
          <ScrollToTop />
          <ScrollReveal />
          <NavbarScroll />

          <Routes>
            {/* Auth — full screen, no layout */}
            <Route path="/connexion"           element={<Login />} />
            <Route path="/inscription"         element={<Register />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />

            {/* Admin — own layout (sidebar) */}
            <Route path="/admin"                element={<RequireAdmin><Dashboard /></RequireAdmin>} />
            <Route path="/admin/produits"       element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
            <Route path="/admin/commandes"      element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
            <Route path="/admin/utilisateurs"   element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
            <Route path="/admin/statistiques"   element={<RequireAdmin><AdminStats /></RequireAdmin>} />
            <Route path="/admin/parametres"     element={<RequireAdmin><AdminSettings /></RequireAdmin>} />

            {/* Public pages — avec Navbar + Footer */}
            <Route path="/"                 element={<Layout><Home /></Layout>} />
            <Route path="/catalogue"        element={<Layout><Catalogue /></Layout>} />
            <Route path="/produit/:id"      element={<Layout><ProductDetail /></Layout>} />
            <Route path="/personnalisation" element={<Layout><Personnalisation /></Layout>} />
            <Route path="/blog"             element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id"         element={<Layout><Blog /></Layout>} />
            <Route path="/entreprise"       element={<Layout><Entreprise /></Layout>} />
            <Route path="/contact"          element={<Layout><Contact /></Layout>} />
            <Route path="/panier"           element={<Layout><Cart /></Layout>} />
            <Route path="/commande"         element={<Layout><RequireAuth><Checkout /></RequireAuth></Layout>} />

            {/* Protected client pages */}
            <Route path="/profil"    element={<Layout><RequireAuth><Profile /></RequireAuth></Layout>} />
            <Route path="/suivi/:id" element={<Layout><RequireAuth><OrderTracking /></RequireAuth></Layout>} />
            {/* 404 */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}