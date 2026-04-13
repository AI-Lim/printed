// ─── Image assets (local) ─────────────────────────────────────────────────────
export const ASSETS = {
  logo:       '/assets/images/logo.png',
  logoWhite:  '/assets/images/logo-white.png',
  zoro:       '/assets/images/zoro.png',
  sneaker:    '/assets/images/sneaker.png',
  mug:        '/assets/images/mug.png',
  tshirt1:    '/assets/images/tshirt1.png',
  tshirt2:    '/assets/images/tshirt2.png',
  sweater:    '/assets/images/sweater.png',
  hoodie:     '/assets/images/hoodie.png',
  product1:   '/assets/images/product1.png',
  product2:   '/assets/images/product2.png',
  product3:   '/assets/images/product3.png',
  product4:   '/assets/images/product4.png',
  tiktok:     '/assets/images/tiktok.png',
  instagram:  '/assets/images/instagram.png',
  facebook:   '/assets/images/facebook.png',
};

// Figma CDN fallbacks (expirent après 7 jours)
export const FIGMA_ASSETS = {
  logo:       'https://www.figma.com/api/mcp/asset/fb703a11-8945-49e5-be70-9814970bf88f',
  logoWhite:  'https://www.figma.com/api/mcp/asset/3e30f348-fb29-4c40-8988-6b3b722579fe',
  zoro:       'https://www.figma.com/api/mcp/asset/c7c096e9-7f73-47b0-9a55-39a614fcceb9',
  sneaker:    'https://www.figma.com/api/mcp/asset/065959bc-5bff-4da1-ae57-ba24139469d7',
  mug:        'https://www.figma.com/api/mcp/asset/d21582a2-c950-4b60-a5a5-5db4c3cc359e',
  tshirt1:    'https://www.figma.com/api/mcp/asset/e9863045-3aaf-4e18-82f2-1c937c51825c',
  tshirt2:    'https://www.figma.com/api/mcp/asset/d2eeed57-6822-4bf7-b966-11bd0f35d65c',
  sweater:    'https://www.figma.com/api/mcp/asset/8dc5c13f-802e-41b4-9a32-ee51e554046d',
  hoodie:     'https://www.figma.com/api/mcp/asset/4402dcc5-0a2f-4167-bed8-14e3060d5558',
  product1:   'https://www.figma.com/api/mcp/asset/9000d1e2-1826-4fc2-83a7-9aade1ec67bf',
  product2:   'https://www.figma.com/api/mcp/asset/3c68f0e0-f2d9-4fce-b9be-1a1ecbdced3b',
  product3:   'https://www.figma.com/api/mcp/asset/605b8b83-e030-44ce-b4d6-ad4c02e506e9',
  product4:   'https://www.figma.com/api/mcp/asset/5b587098-e938-4cba-8cf8-7121fe5bd8bc',
  tiktok:     'https://www.figma.com/api/mcp/asset/621d250d-050b-474f-bc84-18345bee3637',
  instagram:  'https://www.figma.com/api/mcp/asset/3f4cc9d3-3365-43f1-862a-2d4ad303d5bf',
  facebook:   'https://www.figma.com/api/mcp/asset/605e2303-8759-4a60-8707-78bf84836f15',
};

// ✅ Pointe vers le local
export const IMG = ASSETS;

// ─── Colors ────────────────────────────────────────────────────────────────────
export const COLORS = {
  primary:      '#017BFE',
  primaryLight: '#CBF6FD',
  primaryDark:  '#0056b3',
  accent:       '#00C2FF',
  dark:         '#232323',
  grayLight:    '#F4F4F4',
  success:      '#02AB84',
  warning:      '#E6B95E',
  danger:       '#E5A6A8',
  white:        '#ffffff',
};

// ─── Navigation ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Accueil',          path: '/' },
  { label: 'Catalogue',        path: '/catalogue' },
  { label: 'Personnalisation', path: '/personnalisation' },
  { label: 'Entreprise',       path: '/entreprise' },
  { label: 'Blog',             path: '/blog' },
  { label: 'Contact',          path: '/contact' },
];

// ─── Product categories ────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'nature',       label: 'Nature',             color: '#02AB84' },
  { id: 'animaux',      label: 'Animaux',            color: '#E6B95E' },
  { id: 'dessin-anime', label: 'Dessin Animé',       color: '#E5A6A8' },
  { id: 'otaku',        label: 'Otaku',              color: '#017BFE' },
  { id: 'abstrait',     label: 'Abstrait',           color: '#8B5CF6' },
  { id: 'motivation',   label: 'Motivation',         color: '#F59E0B' },
  { id: 'musique',      label: 'Musique',            color: '#EC4899' },
  { id: 'cinema',       label: 'Cinéma & Séries',    color: '#10B981' },
  { id: 'sport',        label: 'Sports',             color: '#EF4444' },
  { id: 'gaming',       label: 'Gaming',             color: '#6366F1' },
  { id: 'culture',      label: 'Culture & Tradition',color: '#D97706' },
  { id: 'religion',     label: 'Religion',           color: '#7C3AED' },
];

// ─── Product types ─────────────────────────────────────────────────────────────
export const PRODUCT_TYPES = [
  'T-Shirt', 'Sweat', 'Pull', 'Chemise', 'Débardeur',
  'Pantalon', 'Short', 'Jupe', 'Legging',
  'Casquette', 'Chapeau', 'Chaussettes',
  'Sneakers', 'Sandales',
  'Mug', 'Tasse', 'Gourde',
  'Coque téléphone', 'Tapis de souris',
  'Sac en toile', 'Sac à dos',
  'Carnet', 'Cahier',
];

// ─── Mock products ─────────────────────────────────────────────────────────────
const PRODUCT_NAMES  = ['T-Shirt Zoro', 'Mug Anime', 'Sneakers Custom', 'Sweat Nature', 'Coque Phone', 'Sac Otaku'];
const PRODUCT_PRICES = [10000, 8000, 25000, 15000, 5000, 12000];
const PRODUCT_IMGS   = [
  ASSETS.product1, ASSETS.product2, ASSETS.product3,
  ASSETS.product4, ASSETS.zoro,     ASSETS.mug,
];

export const MOCK_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id:           i + 1,
  name:         PRODUCT_NAMES[i % 6],
  price:        PRODUCT_PRICES[i % 6],
  rating:       4.5 + Math.random() * 0.5,
  category:     CATEGORIES[i % CATEGORIES.length].id,
  type:         PRODUCT_TYPES[i % PRODUCT_TYPES.length],
  image:        PRODUCT_IMGS[i % 6],
  isNew:        i < 4,
  isPromo:      i >= 4 && i < 8,
  discount:     i >= 4 && i < 8 ? 15 : 0,
  isEvent:      i === 10 || i === 11,
  isComingSoon: i > 20,
  isBestSeller: i >= 12 && i < 18,
}));
