import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Type, Upload, Shapes, RotateCcw, ShoppingCart, Check,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  Trash2, Copy, MoveUp, MoveDown, ZoomIn, ZoomOut,
  RotateCw, FlipHorizontal, Minus, Plus, Palette,
  Search, Crown, Lock, X, Undo2, Redo2, Download,
  Sparkles, Layers,
} from 'lucide-react';
import { useCart } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../utils/constants';

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: 'T-Shirt',   price: 10000, sizes: ['XS','S','M','L','XL','XXL'],   emoji: '👕' },
  { id: 2, name: 'Sweat',     price: 15000, sizes: ['S','M','L','XL','XXL'],         emoji: '🧥' },
  { id: 3, name: 'Hoodie',    price: 18000, sizes: ['S','M','L','XL','XXL'],         emoji: '👕' },
  { id: 4, name: 'Pantalon',  price: 14000, sizes: ['XS','S','M','L','XL','XXL'],   emoji: '👖' },
  { id: 5, name: 'Sneakers',  price: 25000, sizes: ['38','39','40','41','42','43','44','45'], emoji: '👟' },
  { id: 6, name: 'Casquette', price: 7000,  sizes: ['Unique'],                       emoji: '🧢' },
];

// ─────────────────────────────────────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCT_COLORS = [
  { hex: '#FFFFFF', name: 'Blanc' },
  { hex: '#1C1C1C', name: 'Noir' },
  { hex: '#1D4ED8', name: 'Bleu' },
  { hex: '#DC2626', name: 'Rouge' },
  { hex: '#16A34A', name: 'Vert' },
  { hex: '#D97706', name: 'Orange' },
  { hex: '#7C3AED', name: 'Violet' },
  { hex: '#DB2777', name: 'Rose' },
  { hex: '#0891B2', name: 'Cyan' },
  { hex: '#92400E', name: 'Marron' },
  { hex: '#6B7280', name: 'Gris' },
  { hex: '#F9A8D4', name: 'Rose pâle' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SVG 3D MOCKUPS — vectoriels, style flat 3D / isométrique, sans zone imposée
// ─────────────────────────────────────────────────────────────────────────────

// Helper: darken a hex color for shadows/folds
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return { r, g, b };
};
const darken = (hex, amount = 30) => {
  const { r, g, b } = hexToRgb(hex);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  const toHex = (v) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r - amount)}${toHex(g - amount)}${toHex(b - amount)}`;
};
const lighten = (hex, amount = 30) => darken(hex, -amount);
const withAlpha = (hex, alpha) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
};

// Chaque mockup retourne un SVG JSX avec la couleur dynamique
const MockupTShirt = ({ color }) => {
  const base  = color;
  const dark  = darken(color, 40);
  const mid   = darken(color, 18);
  const light = lighten(color, 15);
  const shadow = 'rgba(0,0,0,0.10)';
  return (
    <svg viewBox="0 0 340 420" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
      <defs>
        <linearGradient id="tshirt-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid}/>
          <stop offset="45%" stopColor={light}/>
          <stop offset="100%" stopColor={mid}/>
        </linearGradient>
        <linearGradient id="tshirt-sleeve-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={dark}/>
          <stop offset="100%" stopColor={mid}/>
        </linearGradient>
        <linearGradient id="tshirt-sleeve-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid}/>
          <stop offset="100%" stopColor={dark}/>
        </linearGradient>
        <linearGradient id="tshirt-fold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
      </defs>

      {/* Manche gauche */}
      <path d="M30,80 L95,65 L120,130 L68,155 Z" fill="url(#tshirt-sleeve-l)" stroke={dark} strokeWidth="0.5"/>
      {/* Manche droite */}
      <path d="M310,80 L245,65 L220,130 L272,155 Z" fill="url(#tshirt-sleeve-r)" stroke={dark} strokeWidth="0.5"/>
      {/* Corps principal */}
      <path d="M68,155 L95,65 L120,55 L140,70 L170,60 L200,70 L220,55 L245,65 L272,155 L265,390 L75,390 Z"
            fill="url(#tshirt-body)" stroke={darken(color,20)} strokeWidth="0.6"/>
      {/* Overlay fold */}
      <path d="M68,155 L95,65 L120,55 L140,70 L170,60 L200,70 L220,55 L245,65 L272,155 L265,390 L75,390 Z"
            fill="url(#tshirt-fold)"/>
      {/* Col */}
      <path d="M140,70 Q170,100 200,70" fill="none" stroke={dark} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M140,70 Q170,88 200,70" fill={darken(color,25)} stroke={dark} strokeWidth="0.5"/>
      {/* Ligne couture épaule G */}
      <line x1="95" y1="65" x2="140" y2="70" stroke={dark} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5"/>
      {/* Ligne couture épaule D */}
      <line x1="245" y1="65" x2="200" y2="70" stroke={dark} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5"/>
      {/* Pli central subtil */}
      <line x1="170" y1="95" x2="170" y2="380" stroke={dark} strokeWidth="0.6" opacity="0.15"/>
      {/* Ombre bas */}
      <ellipse cx="170" cy="400" rx="85" ry="10" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
};

const MockupHoodie = ({ color }) => {
  const dark  = darken(color, 45);
  const mid   = darken(color, 20);
  const light = lighten(color, 12);
  return (
    <svg viewBox="0 0 340 440" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
      <defs>
        <linearGradient id="hood-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid}/>
          <stop offset="40%" stopColor={light}/>
          <stop offset="100%" stopColor={mid}/>
        </linearGradient>
        <linearGradient id="hood-capuche" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light}/>
          <stop offset="100%" stopColor={dark}/>
        </linearGradient>
      </defs>
      {/* Manches */}
      <path d="M28,110 L90,72 L118,145 L62,175 Z" fill={mid} stroke={dark} strokeWidth="0.5"/>
      <path d="M312,110 L250,72 L222,145 L278,175 Z" fill={mid} stroke={dark} strokeWidth="0.5"/>
      {/* Corps */}
      <path d="M62,175 L90,72 L118,60 L145,80 L170,68 L195,80 L222,60 L250,72 L278,175 L272,410 L68,410 Z"
            fill="url(#hood-body)" stroke={dark} strokeWidth="0.6"/>
      {/* Capuche */}
      <path d="M118,60 L140,20 L170,8 L200,20 L222,60 L195,80 L170,68 L145,80 Z"
            fill="url(#hood-capuche)" stroke={dark} strokeWidth="0.8"/>
      {/* Ouverture capuche */}
      <ellipse cx="170" cy="55" rx="26" ry="30" fill={darken(color,55)} stroke={dark} strokeWidth="1"/>
      {/* Cordon */}
      <path d="M152,82 Q148,90 144,100 L140,120" fill="none" stroke={darken(color,35)} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M188,82 Q192,90 196,100 L200,120" fill="none" stroke={darken(color,35)} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Poche kangourou */}
      <path d="M122,290 Q170,285 218,290 L222,360 Q170,368 118,360 Z" fill={darken(color,22)} stroke={dark} strokeWidth="0.8"/>
      <line x1="170" y1="286" x2="170" y2="368" stroke={dark} strokeWidth="0.7" opacity="0.5"/>
      {/* Bas côtes */}
      <rect x="68" y="400" width="204" height="14" rx="4" fill={darken(color,30)} stroke={dark} strokeWidth="0.5"/>
      {/* Poignets côtes */}
      <rect x="28" y="166" width="34" height="12" rx="4" fill={darken(color,30)} stroke={dark} strokeWidth="0.5" transform="rotate(-18 45 172)"/>
      <rect x="278" y="166" width="34" height="12" rx="4" fill={darken(color,30)} stroke={dark} strokeWidth="0.5" transform="rotate(18 295 172)"/>
      {/* Ombre sol */}
      <ellipse cx="170" cy="420" rx="88" ry="9" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
};

const MockupSweat = ({ color }) => {
  const dark  = darken(color, 40);
  const mid   = darken(color, 18);
  const light = lighten(color, 14);
  return (
    <svg viewBox="0 0 340 420" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
      <defs>
        <linearGradient id="sweat-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid}/>
          <stop offset="42%" stopColor={light}/>
          <stop offset="100%" stopColor={mid}/>
        </linearGradient>
      </defs>
      <path d="M30,95 L92,68 L118,140 L65,162 Z" fill={mid} stroke={dark} strokeWidth="0.5"/>
      <path d="M310,95 L248,68 L222,140 L275,162 Z" fill={mid} stroke={dark} strokeWidth="0.5"/>
      <path d="M65,162 L92,68 L118,56 L142,72 L170,62 L198,72 L222,56 L248,68 L275,162 L268,395 L72,395 Z"
            fill="url(#sweat-body)" stroke={dark} strokeWidth="0.6"/>
      {/* Col ras du cou */}
      <path d="M142,72 Q170,96 198,72" fill={darken(color,28)} stroke={dark} strokeWidth="1.5"/>
      <rect x="130" y="70" width="80" height="10" rx="5" fill={darken(color,28)} stroke={dark} strokeWidth="0.5"/>
      {/* Côtes bas */}
      <rect x="72" y="387" width="196" height="12" rx="4" fill={darken(color,28)} stroke={dark} strokeWidth="0.5"/>
      <rect x="30" y="154" width="36" height="11" rx="4" fill={darken(color,28)} stroke={dark} strokeWidth="0.5" transform="rotate(-14 48 160)"/>
      <rect x="274" y="154" width="36" height="11" rx="4" fill={darken(color,28)} stroke={dark} strokeWidth="0.5" transform="rotate(14 292 160)"/>
      <line x1="170" y1="90" x2="170" y2="380" stroke={dark} strokeWidth="0.5" opacity="0.12"/>
      <ellipse cx="170" cy="404" rx="85" ry="9" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
};

const MockupPantalon = ({ color }) => {
  const dark  = darken(color, 42);
  const mid   = darken(color, 20);
  const light = lighten(color, 10);
  return (
    <svg viewBox="0 0 280 480" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
      <defs>
        <linearGradient id="pant-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={dark}/>
          <stop offset="30%" stopColor={light}/>
          <stop offset="70%" stopColor={light}/>
          <stop offset="100%" stopColor={dark}/>
        </linearGradient>
      </defs>
      {/* Ceinture */}
      <rect x="40" y="20" width="200" height="32" rx="6" fill={darken(color,35)} stroke={dark} strokeWidth="0.8"/>
      {/* Boucle */}
      <rect x="126" y="24" width="28" height="22" rx="4" fill={darken(color,50)} stroke={dark} strokeWidth="1"/>
      <rect x="132" y="30" width="16" height="10" rx="2" fill="none" stroke={lighten(color,30)} strokeWidth="1.2"/>
      {/* Jambe gauche */}
      <path d="M40,52 L138,52 L132,300 L112,470 L40,470 L52,300 Z" fill="url(#pant-body)" stroke={dark} strokeWidth="0.6"/>
      {/* Jambe droite */}
      <path d="M142,52 L240,52 L228,300 L240,470 L168,470 L148,300 Z" fill="url(#pant-body)" stroke={dark} strokeWidth="0.6"/>
      {/* Séparation entre-jambe */}
      <path d="M138,52 Q140,160 138,300" fill="none" stroke={dark} strokeWidth="1.2"/>
      <path d="M142,52 Q140,160 142,300" fill="none" stroke={dark} strokeWidth="1.2"/>
      {/* Couture extérieure G */}
      <line x1="44" y1="55" x2="44" y2="465" stroke={darken(color,35)} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.5"/>
      {/* Couture extérieure D */}
      <line x1="236" y1="55" x2="236" y2="465" stroke={darken(color,35)} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.5"/>
      {/* Poche G */}
      <path d="M52,62 Q46,100 50,130" fill="none" stroke={dark} strokeWidth="1.2" opacity="0.6"/>
      {/* Poche D */}
      <path d="M228,62 Q234,100 230,130" fill="none" stroke={dark} strokeWidth="1.2" opacity="0.6"/>
      <ellipse cx="140" cy="476" rx="70" ry="8" fill="rgba(0,0,0,0.11)"/>
    </svg>
  );
};

const MockupSneaker = ({ color }) => {
  const dark  = darken(color, 45);
  const mid   = darken(color, 20);
  const light = lighten(color, 20);
  const sole  = darken(color, 55);
  return (
    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
      <defs>
        <linearGradient id="shoe-upper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light}/>
          <stop offset="100%" stopColor={mid}/>
        </linearGradient>
        <linearGradient id="shoe-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid}/>
          <stop offset="100%" stopColor={dark}/>
        </linearGradient>
      </defs>
      {/* Semelle externe */}
      <path d="M40,220 Q20,228 30,245 L340,248 Q390,248 385,232 L360,215 Z" fill={sole} stroke={darken(color,60)} strokeWidth="0.8"/>
      {/* Semelle intermédiaire */}
      <path d="M42,210 L355,210 Q378,210 372,224 L40,222 Q25,220 42,210 Z" fill="#F0F0F0" stroke="#ddd" strokeWidth="0.5"/>
      {/* Corps chaussure */}
      <path d="M72,100 Q55,95 45,120 L42,210 L355,210 L368,160 Q370,120 330,105 Q290,90 240,88 L180,82 Q130,78 72,100 Z"
            fill="url(#shoe-upper)" stroke={dark} strokeWidth="0.8"/>
      {/* Flanc ombre */}
      <path d="M72,100 Q60,120 58,165 L62,210 L180,210 L165,85 Q120,82 72,100 Z"
            fill="url(#shoe-side)" opacity="0.35"/>
      {/* Contrefort talon */}
      <path d="M305,108 Q340,110 368,160 L365,210 L295,210 L290,108 Z" fill={darken(color,30)} stroke={dark} strokeWidth="0.5"/>
      {/* Languette */}
      <path d="M175,82 L190,82 L200,150 L165,148 Z" fill={light} stroke={dark} strokeWidth="0.5"/>
      {/* Lacets */}
      {[95,110,125,140,155].map((y,i) => (
        <line key={i} x1={i%2===0?175:188} y1={y} x2={i%2===0?188:200} y2={y+4} stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>
      ))}
      {/* Logo cercle */}
      <circle cx="255" cy="165" r="20" fill={dark} stroke={darken(color,60)} strokeWidth="1"/>
      <circle cx="255" cy="165" r="13" fill="none" stroke={light} strokeWidth="1.5"/>
      {/* Ombre sol */}
      <ellipse cx="205" cy="254" rx="130" ry="10" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
};

const MockupCasquette = ({ color }) => {
  const dark  = darken(color, 42);
  const mid   = darken(color, 18);
  const light = lighten(color, 16);
  return (
    <svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%', filter:'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}>
      <defs>
        <linearGradient id="cap-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light}/>
          <stop offset="100%" stopColor={mid}/>
        </linearGradient>
        <linearGradient id="cap-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={mid}/>
          <stop offset="100%" stopColor={dark}/>
        </linearGradient>
      </defs>
      {/* Calotte */}
      <path d="M68,180 Q68,60 170,40 Q272,60 272,180 Z" fill="url(#cap-crown)" stroke={dark} strokeWidth="0.8"/>
      {/* Panneau central */}
      <path d="M140,42 L140,178 Q155,182 170,182 Q185,182 200,178 L200,42 Q185,40 170,40 Q155,40 140,42 Z"
            fill={lighten(color,8)} stroke={dark} strokeWidth="0.5" opacity="0.35"/>
      {/* Coutures panneaux */}
      {[[-1,0.5],[1,0.5]].map(([dir,op],i)=>(
        <path key={i} d={`M${170+dir*40},42 Q${170+dir*38},112 ${170+dir*36},180`}
              fill="none" stroke={dark} strokeWidth="0.8" opacity={op}/>
      ))}
      {/* Visière */}
      <path d="M68,180 Q40,188 38,200 Q60,222 170,220 Q280,222 302,200 Q300,188 272,180 Z"
            fill="url(#cap-visor)" stroke={dark} strokeWidth="0.8"/>
      {/* Sous-visière */}
      <path d="M72,182 Q170,192 268,182 Q280,196 170,198 Q60,196 72,182 Z" fill={darken(color,50)} opacity="0.4"/>
      {/* Bouton sommet */}
      <circle cx="170" cy="42" r="8" fill={darken(color,30)} stroke={dark} strokeWidth="1"/>
      {/* Fermeture arrière simulée */}
      <rect x="148" y="174" width="44" height="10" rx="3" fill={darken(color,32)} stroke={dark} strokeWidth="0.5"/>
      <rect x="162" y="177" width="16" height="5" rx="2" fill={darken(color,50)} stroke={dark} strokeWidth="0.3"/>
      {/* Ombre sol */}
      <ellipse cx="170" cy="228" rx="95" ry="9" fill="rgba(0,0,0,0.12)"/>
    </svg>
  );
};

const PRODUCT_MOCKUPS = {
  1: MockupTShirt,
  2: MockupSweat,
  3: MockupHoodie,
  4: MockupPantalon,
  5: MockupSneaker,
  6: MockupCasquette,
};

// Thumbnails pour la sélection produit (mini version)
const ProductThumb = ({ productId, color }) => {
  const MockupComp = PRODUCT_MOCKUPS[productId];
  if (!MockupComp) return null;
  return <MockupComp color={color} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// ELEMENT LIBRARY
// ─────────────────────────────────────────────────────────────────────────────
const makeSvgThumb = (shape, color1, color2) => {
  const shapes = {
    bolt:      `<polygon points="60,5 30,55 52,55 40,95 70,45 48,45" fill="${color1}"/>`,
    flame:     `<path d="M50,95 C20,95 10,70 25,50 C15,55 12,40 20,30 C25,40 30,38 28,25 C40,35 38,50 45,45 C40,35 48,20 55,10 C55,30 65,35 62,50 C70,40 72,55 65,60 C80,45 78,75 50,95Z" fill="${color1}"/>`,
    crown:     `<path d="M10,70 L20,30 L40,55 L50,10 L60,55 L80,30 L90,70 L10,70Z" fill="${color1}"/><circle cx="50" cy="10" r="6" fill="${color2}"/>`,
    star:      `<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="${color1}"/>`,
    diamond:   `<polygon points="50,5 92,50 50,95 8,50" fill="${color1}"/><polygon points="50,20 78,50 50,80 22,50" fill="${color2}" opacity="0.5"/>`,
    eye:       `<ellipse cx="50" cy="50" rx="44" ry="28" fill="${color1}"/><circle cx="50" cy="50" r="16" fill="white"/><circle cx="50" cy="50" r="9" fill="${color1}"/>`,
    wave:      `<path d="M5,60 C20,30 35,30 50,60 C65,90 80,90 95,60" fill="none" stroke="${color1}" stroke-width="10" stroke-linecap="round"/><path d="M5,40 C20,10 35,10 50,40 C65,70 80,70 95,40" fill="none" stroke="${color2}" stroke-width="10" stroke-linecap="round" opacity="0.6"/>`,
    infinity:  `<path d="M20,50 C20,35 30,25 40,25 C50,25 55,35 60,50 C65,65 70,75 80,75 C90,75 90,65 80,50 C90,50 90,35 80,25 C70,25 65,35 60,50 C55,65 50,75 40,75 C30,75 20,65 20,50Z" fill="none" stroke="${color1}" stroke-width="9"/>`,
    skull:     `<ellipse cx="50" cy="42" rx="32" ry="35" fill="${color1}"/><rect x="32" y="68" width="36" height="20" rx="4" fill="${color1}"/><circle cx="38" cy="40" r="9" fill="white"/><circle cx="62" cy="40" r="9" fill="white"/>`,
    drip:      `<rect x="18" y="8" width="64" height="52" rx="8" fill="${color1}"/><path d="M32,58 C32,58 28,76 31,86 C34,91 38,89 38,81 L38,58Z" fill="${color1}"/><path d="M50,58 C50,58 48,80 50,88 C52,93 54,90 54,81 L54,58Z" fill="${color1}"/>`,
    rose:      `<path d="M50,20 C50,20 30,35 30,50 C30,62 38,70 50,70 C62,70 70,62 70,50 C70,35 50,20 50,20Z" fill="${color1}"/><path d="M50,30 C50,30 38,40 38,50 C38,57 43,62 50,62 C57,62 62,57 62,50 C62,40 50,30 50,30Z" fill="${color2}"/>`,
    lightning2:`<polygon points="60,2 28,54 52,54 38,98 72,46 48,46" fill="${color1}"/><polygon points="60,2 28,54 52,54 38,98 72,46 48,46" fill="${color2}" opacity="0.3" transform="translate(4,4)"/>`,
  };
  const svgStr = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='12' fill='%23f8f8f8'/>${shapes[shape]||shapes.star}</svg>`;
  return `data:image/svg+xml,${svgStr}`;
};

const ELEMENT_CATEGORIES = [
  { slug: 'all',        label: 'Tout',       icon: '✦' },
  { slug: 'stickers',   label: 'Stickers',   icon: '🔥' },
  { slug: 'streetwear', label: 'Street',     icon: '👑' },
  { slug: 'afroart',    label: 'Afro',       icon: '🌍' },
  { slug: 'nature',     label: 'Nature',     icon: '🌿' },
  { slug: 'typo',       label: 'Typo',       icon: '✍️' },
  { slug: 'abstract',   label: 'Abstract',   icon: '◈' },
  { slug: 'vintage',    label: 'Vintage',    icon: '📻' },
];

const MOCK_ELEMENTS = [
  { id: 'e1',  name: 'Lightning Bold',   category: 'stickers',   tags: ['éclair','bolt'],   thumbnail: makeSvgThumb('bolt','#F59E0B','#FCD34D'), is_pro: false, svgShape: 'bolt',     color: '#F59E0B' },
  { id: 'e2',  name: 'Fire Flame',       category: 'stickers',   tags: ['feu','flamme'],    thumbnail: makeSvgThumb('flame','#EF4444','#F97316'), is_pro: false, svgShape: 'flame',    color: '#EF4444' },
  { id: 'e3',  name: 'Skull Classic',    category: 'stickers',   tags: ['skull','dark'],    thumbnail: makeSvgThumb('skull','#1C1C1C','#555'),    is_pro: false, svgShape: 'skull',    color: '#1C1C1C' },
  { id: 'e4',  name: 'Rose Bloom',       category: 'stickers',   tags: ['rose','fleur'],    thumbnail: makeSvgThumb('rose','#EC4899','#F9A8D4'),  is_pro: true,  svgShape: 'rose',     color: '#EC4899' },
  { id: 'e5',  name: 'Drip Effect',      category: 'stickers',   tags: ['drip','goutte'],   thumbnail: makeSvgThumb('drip','#8B5CF6','#A78BFA'),  is_pro: false, svgShape: 'drip',     color: '#8B5CF6' },
  { id: 'e6',  name: 'Diamond Ice',      category: 'stickers',   tags: ['diamant','ice'],   thumbnail: makeSvgThumb('diamond','#06B6D4','#67E8F9'),is_pro: true, svgShape: 'diamond',  color: '#06B6D4' },
  { id: 'e7',  name: 'Royal Crown',      category: 'streetwear', tags: ['crown','king'],    thumbnail: makeSvgThumb('crown','#F59E0B','#FFF'),     is_pro: false, svgShape: 'crown',    color: '#F59E0B' },
  { id: 'e8',  name: 'Lightning Strike', category: 'streetwear', tags: ['éclair','street'], thumbnail: makeSvgThumb('lightning2','#FFF','#F59E0B'),is_pro: false, svgShape: 'lightning2',color:'#1C1C1C' },
  { id: 'e9',  name: 'All Seeing Eye',   category: 'streetwear', tags: ['oeil','eye'],      thumbnail: makeSvgThumb('eye','#1C1C1C','#6B7280'),    is_pro: true,  svgShape: 'eye',      color: '#1C1C1C' },
  { id: 'e10', name: 'Infinity Loop',    category: 'streetwear', tags: ['infini','loop'],   thumbnail: makeSvgThumb('infinity','#1D4ED8','#3B82F6'),is_pro: false,svgShape: 'infinity', color: '#1D4ED8' },
  { id: 'e11', name: 'Star Power',       category: 'streetwear', tags: ['étoile','star'],   thumbnail: makeSvgThumb('star','#F59E0B','#FFF'),       is_pro: true,  svgShape: 'star',     color: '#F59E0B' },
  { id: 'e12', name: 'Wave Rythm',       category: 'afroart',    tags: ['vague','wave'],    thumbnail: makeSvgThumb('wave','#16A34A','#86EFAC'),    is_pro: false, svgShape: 'wave',     color: '#16A34A' },
  { id: 'e13', name: 'Flame Spirit',     category: 'afroart',    tags: ['flamme','afro'],   thumbnail: makeSvgThumb('flame','#D97706','#F59E0B'),   is_pro: true,  svgShape: 'flame',    color: '#D97706' },
  { id: 'e14', name: 'Fire Nature',      category: 'nature',     tags: ['feu','nature'],    thumbnail: makeSvgThumb('flame','#16A34A','#22C55E'),   is_pro: false, svgShape: 'flame',    color: '#16A34A' },
  { id: 'e15', name: 'Diamond Abstract', category: 'abstract',   tags: ['abstract','art'],  thumbnail: makeSvgThumb('diamond','#7C3AED','#A855F7'), is_pro: true,  svgShape: 'diamond',  color: '#7C3AED' },
  { id: 'e16', name: 'Infinity Abstract',category: 'abstract',   tags: ['infini','loop'],   thumbnail: makeSvgThumb('infinity','#EC4899','#F472B6'),is_pro: false, svgShape: 'infinity', color: '#EC4899' },
  { id: 'e17', name: 'Crown Vintage',    category: 'vintage',    tags: ['vintage','retro'], thumbnail: makeSvgThumb('crown','#92400E','#D97706'),   is_pro: false, svgShape: 'crown',    color: '#92400E' },
  { id: 'e18', name: 'Star Vintage',     category: 'vintage',    tags: ['étoile','star'],   thumbnail: makeSvgThumb('star','#92400E','#D97706'),    is_pro: true,  svgShape: 'star',     color: '#92400E' },
  { id: 'e19', name: 'Wave Typo',        category: 'typo',       tags: ['vague','typo'],    thumbnail: makeSvgThumb('wave','#1C1C1C','#6B7280'),    is_pro: false, svgShape: 'wave',     color: '#1C1C1C' },
  { id: 'e20', name: 'Bolt Typo',        category: 'typo',       tags: ['éclair','bold'],   thumbnail: makeSvgThumb('bolt','#1C1C1C','#6B7280'),    is_pro: true,  svgShape: 'bolt',     color: '#1C1C1C' },
];

// SVG shape JSX map
const SVG_SHAPES = {
  bolt:      <polygon points="60,5 30,55 52,55 40,95 70,45 48,45" fill="currentColor"/>,
  flame:     <path d="M50,95 C20,95 10,70 25,50 C15,55 12,40 20,30 C25,40 30,38 28,25 C40,35 38,50 45,45 C40,35 48,20 55,10 C55,30 65,35 62,50 C70,40 72,55 65,60 C80,45 78,75 50,95Z" fill="currentColor"/>,
  crown:     <><path d="M10,70 L20,30 L40,55 L50,10 L60,55 L80,30 L90,70 L10,70Z" fill="currentColor"/><circle cx="50" cy="10" r="6" fill="currentColor"/></>,
  star:      <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="currentColor"/>,
  diamond:   <polygon points="50,5 92,50 50,95 8,50" fill="currentColor"/>,
  eye:       <><ellipse cx="50" cy="50" rx="44" ry="28" fill="currentColor"/><circle cx="50" cy="50" r="16" fill="white"/><circle cx="50" cy="50" r="9" fill="currentColor"/><circle cx="55" cy="45" r="3" fill="white"/></>,
  wave:      <path d="M5,60 C20,30 35,30 50,60 C65,90 80,90 95,60" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>,
  infinity:  <path d="M20,50 C20,35 30,25 40,25 C50,25 55,35 60,50 C65,65 70,75 80,75 C90,75 90,65 80,50 C90,50 90,35 80,25 C70,25 65,35 60,50 C55,65 50,75 40,75 C30,75 20,65 20,50Z" fill="none" stroke="currentColor" strokeWidth="9"/>,
  skull:     <><ellipse cx="50" cy="42" rx="32" ry="35" fill="currentColor"/><rect x="32" y="68" width="36" height="20" rx="4" fill="currentColor"/><circle cx="38" cy="40" r="9" fill="white"/><circle cx="62" cy="40" r="9" fill="white"/><circle cx="38" cy="40" r="5" fill="rgba(0,0,0,0.5)"/><circle cx="62" cy="40" r="5" fill="rgba(0,0,0,0.5)"/><rect x="38" y="72" width="6" height="12" rx="2" fill="white"/><rect x="48" y="72" width="6" height="12" rx="2" fill="white"/></>,
  drip:      <><rect x="18" y="8" width="64" height="52" rx="8" fill="currentColor"/><path d="M32,58 C32,58 28,76 31,86 C34,91 38,89 38,81 L38,58Z" fill="currentColor"/><path d="M50,58 C50,58 48,80 50,88 C52,93 54,90 54,81 L54,58Z" fill="currentColor"/><path d="M68,58 C68,58 65,72 67,80 C69,85 72,83 72,75 L72,58Z" fill="currentColor"/></>,
  rose:      <><circle cx="50" cy="50" r="38" fill="currentColor" opacity="0.2"/><path d="M50,20 C50,20 30,35 30,50 C30,62 38,70 50,70 C62,70 70,62 70,50 C70,35 50,20 50,20Z" fill="currentColor"/></>,
  lightning2:<polygon points="60,2 28,54 52,54 38,98 72,46 48,46" fill="currentColor"/>,
};

// ─────────────────────────────────────────────────────────────────────────────
// FONTS & TEXT COLORS
// ─────────────────────────────────────────────────────────────────────────────
const FONTS = [
  { name: 'Poppins',      label: 'Poppins'     },
  { name: 'Impact',       label: 'Impact'      },
  { name: 'Georgia',      label: 'Georgia'     },
  { name: 'Courier New',  label: 'Courier'     },
  { name: 'Arial Black',  label: 'Arial Black' },
  { name: 'Comic Sans MS',label: 'Comic Sans'  },
];

const TEXT_COLORS = [
  '#000000','#FFFFFF','#1D4ED8','#DC2626','#16A34A','#D97706',
  '#7C3AED','#DB2777','#0891B2','#F59E0B','#6B7280','#92400E',
];

const uid = () => Math.random().toString(36).slice(2, 9);
const MAX_HISTORY = 40;

// ─────────────────────────────────────────────────────────────────────────────
// ELEMENT LIBRARY PANEL
// ─────────────────────────────────────────────────────────────────────────────
function ElementLibrary({ onAdd }) {
  const [query, setQuery]                   = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showProModal, setShowProModal]     = useState(false);

  const filtered = MOCK_ELEMENTS.filter(el => {
    const matchCat = activeCategory === 'all' || el.category === activeCategory;
    const q = query.toLowerCase().trim();
    const matchQ = !q || el.name.toLowerCase().includes(q) || el.tags.some(t => t.includes(q));
    return matchCat && matchQ;
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
      {/* Search */}
      <div style={{ padding:'10px 12px', borderBottom:'1px solid #F0F0F0' }}>
        <div style={{ position:'relative' }}>
          <Search size={13} color="#bbb" style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
          <input
            value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Rechercher…"
            style={{ width:'100%', padding:'8px 32px 8px 32px', border:'1.5px solid #EBEBEB', borderRadius:8, fontSize:12, outline:'none', fontFamily:'Poppins,sans-serif', boxSizing:'border-box', background:'#FAFAFA' }}
          />
          {query && <button onClick={()=>setQuery('')} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', padding:2, display:'flex', color:'#bbb' }}><X size={12}/></button>}
        </div>
      </div>

      {/* Categories */}
      <div style={{ display:'flex', gap:4, padding:'8px 12px', overflowX:'auto', borderBottom:'1px solid #F0F0F0', scrollbarWidth:'none' }}>
        {ELEMENT_CATEGORIES.map(cat=>(
          <button key={cat.slug} onClick={()=>setActiveCategory(cat.slug)}
            style={{ flexShrink:0, padding:'4px 10px', borderRadius:20, border:'none', background:activeCategory===cat.slug?'#0D0D0D':'#F0F0F0', color:activeCategory===cat.slug?'white':'#555', fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', whiteSpace:'nowrap', transition:'all 0.18s' }}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding:10, maxHeight:300, overflowY:'auto' }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign:'center', padding:'20px 0', color:'#bbb', fontSize:12, fontFamily:'Poppins,sans-serif' }}>Aucun résultat</p>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6 }}>
            {filtered.map(el=>(
              <button key={el.id} onClick={()=>{ if(el.is_pro){setShowProModal(true);return;} onAdd(el); }}
                title={el.name}
                style={{ position:'relative', width:'100%', aspectRatio:'1', border:'1.5px solid #EBEBEB', borderRadius:10, background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', padding:6, transition:'all 0.15s', overflow:'hidden' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#017BFE';e.currentTarget.style.transform='scale(1.06)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#EBEBEB';e.currentTarget.style.transform='scale(1)';}}>
                <img src={el.thumbnail} alt={el.name} style={{ width:'100%', height:'100%', objectFit:'contain' }}/>
                {el.is_pro && (
                  <div style={{ position:'absolute', top:3, right:3, background:'linear-gradient(135deg,#F59E0B,#EF4444)', borderRadius:4, padding:'1px 4px', display:'flex', alignItems:'center', gap:2 }}>
                    <Crown size={7} color="white"/>
                    <span style={{ fontSize:7, fontWeight:800, color:'white', fontFamily:'Poppins,sans-serif' }}>PRO</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        <div style={{ marginTop:10, padding:'7px 10px', background:'#F8F8F8', borderRadius:8 }}>
          <p style={{ fontSize:10, color:'#888', lineHeight:1.5, fontFamily:'Poppins,sans-serif' }}>
            <strong style={{ color:'#017BFE' }}>Admin :</strong> Ajoute tes stickers depuis le dashboard
          </p>
        </div>
      </div>

      {/* PRO Modal */}
      {showProModal && (
        <div onClick={()=>setShowProModal(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:'white', borderRadius:16, padding:28, maxWidth:300, textAlign:'center' }}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(135deg,#F59E0B,#EF4444)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}><Crown size={24} color="white"/></div>
            <p style={{ fontSize:15, fontWeight:800, marginBottom:6, fontFamily:'Poppins,sans-serif' }}>Élément PRO 🔒</p>
            <p style={{ fontSize:12, color:'#888', lineHeight:1.6, fontFamily:'Poppins,sans-serif', marginBottom:16 }}>Passe à PRO pour accéder à toute la bibliothèque premium.</p>
            <button onClick={()=>setShowProModal(false)} style={{ width:'100%', padding:10, borderRadius:9, background:'linear-gradient(135deg,#017BFE,#00C2FF)', color:'white', border:'none', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>Passer PRO →</button>
            <button onClick={()=>setShowProModal(false)} style={{ marginTop:8, background:'none', border:'none', color:'#bbb', fontSize:12, cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>Plus tard</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN CANVAS — placement libre, pas de zone imposée
// ─────────────────────────────────────────────────────────────────────────────
function DesignCanvas({ elements, selectedId, onSelect, onUpdate, productId, productColor }) {
  const dragRef   = useRef(null);
  const resizeRef = useRef(null);
  const canvasRef = useRef(null);

  const onMouseMove = useCallback(e => {
    if (dragRef.current) {
      const { id, startX, startY, origX, origY } = dragRef.current;
      onUpdate(id, { x: origX + e.clientX - startX, y: origY + e.clientY - startY });
    }
    if (resizeRef.current) {
      const { id, startX, startY, origSize } = resizeRef.current;
      const delta = (e.clientX - startX + e.clientY - startY) * 0.5;
      onUpdate(id, { size: Math.max(16, origSize + delta) });
    }
  }, [onUpdate]);

  const onMouseUp = useCallback(() => { dragRef.current = null; resizeRef.current = null; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); };
  }, [onMouseMove, onMouseUp]);

  const startDrag   = (e, el) => { e.stopPropagation(); onSelect(el.id); dragRef.current = { id:el.id, startX:e.clientX, startY:e.clientY, origX:el.x, origY:el.y }; };
  const startResize = (e, el) => { e.stopPropagation(); resizeRef.current = { id:el.id, startX:e.clientX, startY:e.clientY, origSize:el.size||60 }; };

  const MockupComp = PRODUCT_MOCKUPS[productId] || MockupTShirt;

  return (
    <div ref={canvasRef} onClick={()=>onSelect(null)} style={{ width:'100%', height:'100%', position:'relative', userSelect:'none', background:'repeating-conic-gradient(#E8E8E8 0% 25%, #F4F4F4 0% 50%) 0 0 / 16px 16px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Mockup SVG 3D-style */}
      <div style={{ position:'relative', width:340, height:440, flexShrink:0 }}>
        <MockupComp color={productColor} />

        {/* Éléments design — positionnés en absolu sur le mockup */}
        {elements.map(el => (
          <div key={el.id} onMouseDown={e=>startDrag(e,el)} style={{ position:'absolute', left:el.x, top:el.y, cursor:'move', zIndex:el.zIndex||3, transform:`rotate(${el.rotation||0}deg) scaleX(${el.flipX?-1:1})`, transformOrigin:'center', outline:selectedId===el.id?'2px solid #017BFE':'none', outlineOffset:3, borderRadius:3, opacity:el.opacity??1 }}>
            {el.type==='text' && (
              <p style={{ fontFamily:el.font||'Poppins', fontSize:el.size||20, color:el.color||'#000', fontWeight:el.bold?900:600, fontStyle:el.italic?'italic':'normal', textAlign:el.align||'center', whiteSpace:'pre-wrap', margin:0, lineHeight:1.2, textShadow:el.shadow?'2px 2px 6px rgba(0,0,0,0.4)':'none', letterSpacing:el.letterSpacing||0 }}>{el.text}</p>
            )}
            {el.type==='shape' && (
              <svg viewBox="0 0 100 100" width={el.size||60} height={el.size||60} style={{ display:'block', color:el.color||'#000', overflow:'visible' }}>
                {el.svgContent}
              </svg>
            )}
            {el.type==='image' && (
              <img src={el.src} alt="" style={{ width:el.size||80, height:el.size||80, objectFit:'contain', display:'block' }} draggable={false}/>
            )}
            {selectedId===el.id && (
              <div onMouseDown={e=>startResize(e,el)} style={{ position:'absolute', bottom:-5, right:-5, width:12, height:12, borderRadius:'50%', background:'#017BFE', border:'2px solid white', cursor:'se-resize', zIndex:10 }}/>
            )}
          </div>
        ))}
      </div>
      <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', background:'rgba(13,13,13,0.65)', color:'white', backdropFilter:'blur(8px)', padding:'5px 14px', borderRadius:20, fontSize:11, fontWeight:600, fontFamily:'Poppins,sans-serif', pointerEvents:'none', whiteSpace:'nowrap' }}>
        Glissez librement · Poignée bleue pour redimensionner
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export default function Personnalisation() {
  const { addItem } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [productColor, setProductColor]       = useState('#FFFFFF');
  const [selectedSize, setSelectedSize]       = useState('M');
  const [elements, setElements]               = useState([]);
  const [selectedId, setSelectedId]           = useState(null);
  const [activeTool, setActiveTool]           = useState('text');
  const [leftTab, setLeftTab]                 = useState('produit');

  // Texte
  const [text, setText]                       = useState('MON TEXTE');
  const [font, setFont]                       = useState('Poppins');
  const [fontSize, setFontSize]               = useState(24);
  const [textColor, setTextColor]             = useState('#000000');
  const [bold, setBold]                       = useState(true);
  const [italic, setItalic]                   = useState(false);
  const [align, setAlign]                     = useState('center');
  const [shadow, setShadow]                   = useState(false);
  const [letterSpacing, setLetterSpacing]     = useState(0);

  const [added, setAdded] = useState(false);
  const fileRef = useRef();

  // ── Undo / Redo ──
  const historyRef = useRef({ past: [], future: [] });

  const pushHistory = useCallback((prevElements) => {
    const h = historyRef.current;
    h.past = [...h.past.slice(-MAX_HISTORY + 1), prevElements];
    h.future = [];
  }, []);

  const undo = useCallback(() => {
    const h = historyRef.current;
    if (!h.past.length) return;
    h.future = [elements, ...h.future];
    const prev = h.past[h.past.length - 1];
    h.past = h.past.slice(0, -1);
    setElements(prev);
  }, [elements]);

  const redo = useCallback(() => {
    const h = historyRef.current;
    if (!h.future.length) return;
    h.past = [...h.past, elements];
    const next = h.future[0];
    h.future = h.future.slice(1);
    setElements(next);
  }, [elements]);

  const setElementsWithHistory = useCallback((updater) => {
    setElements(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      pushHistory(prev);
      return next;
    });
  }, [pushHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        deleteElement(selectedId);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, selectedId]);

  const selectedEl = elements.find(el => el.id === selectedId);

  // Live-sync texte sélectionné
  useEffect(() => {
    if (selectedEl?.type === 'text') {
      updateElement(selectedId, { text, font, size:fontSize, color:textColor, bold, italic, align, shadow, letterSpacing });
    }
  }, [text, font, fontSize, textColor, bold, italic, align, shadow, letterSpacing]);

  const updateElement = useCallback((id, patch) => {
    setElements(prev => prev.map(el => el.id === id ? {...el, ...patch} : el));
  }, []);

  const addText = () => {
    const el = { id:uid(), type:'text', text, font, size:fontSize, color:textColor, bold, italic, align, shadow, letterSpacing, x:90, y:130, zIndex:elements.length+3 };
    setElementsWithHistory(prev => [...prev, el]);
    setSelectedId(el.id);
  };

  const addLibraryElement = (el) => {
    const newEl = { id:uid(), type:'shape', svgContent:SVG_SHAPES[el.svgShape]||SVG_SHAPES.star, color:el.color||'#000000', size:70, x:100, y:130, zIndex:elements.length+3 };
    setElementsWithHistory(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const el = { id:uid(), type:'image', src:ev.target.result, size:90, x:95, y:120, zIndex:elements.length+3 };
      setElementsWithHistory(prev => [...prev, el]);
      setSelectedId(el.id);
    };
    reader.readAsDataURL(file);
  };

  const deleteElement = (id) => {
    setElementsWithHistory(prev => prev.filter(el => el.id !== id));
    setSelectedId(null);
  };

  const duplicateElement = (id) => {
    const el = elements.find(e => e.id === id); if (!el) return;
    const copy = { ...el, id:uid(), x:el.x+14, y:el.y+14 };
    setElementsWithHistory(prev => [...prev, copy]);
    setSelectedId(copy.id);
  };

  // ── Export PNG ──
  const handleExport = () => {
    // Simple: ouvre une fenêtre print / en prod on utiliserait html2canvas
    window.print();
  };

  const handleAddToCart = () => {
    addItem({ ...MOCK_PRODUCTS[0], name:`${selectedProduct.name} Personnalisé`, id:Date.now(), price:selectedProduct.price });
    setAdded(true); setTimeout(()=>setAdded(false), 2500);
  };

  const card = { background:'white', borderRadius:14, border:'1px solid #EBEBEB', overflow:'hidden' };

  const sHead = (label, Icon) => (
    <div style={{ padding:'10px 14px', borderBottom:'1px solid #F0F0F0', display:'flex', alignItems:'center', gap:7 }}>
      {Icon && <Icon size={13} color="#017BFE"/>}
      <span style={{ fontSize:11, fontWeight:700, color:'#0D0D0D', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'Poppins,sans-serif' }}>{label}</span>
    </div>
  );

  const ib = (onClick, Icon, active, title, danger) => (
    <button onClick={onClick} title={title} style={{ width:28, height:28, borderRadius:7, border:`1px solid ${danger?'#fecaca':active?'#017BFE':'#EBEBEB'}`, background:danger?'#fff5f5':active?'rgba(1,123,254,0.08)':'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', flexShrink:0 }}>
      <Icon size={13} color={danger?'#ef4444':active?'#017BFE':'#555'}/>
    </button>
  );

  const hasUndo = historyRef.current.past.length > 0;
  const hasRedo = historyRef.current.future.length > 0;

  return (
    <div style={{ background:'#F2F3F5', minHeight:'100vh' }}>
      {/* ── Header ── */}
      <div style={{ background:'white', borderBottom:'1px solid #EBEBEB', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:70, zIndex:40, gap:12, flexWrap:'wrap' }}>
        <div>
          <p style={{ fontSize:16, fontWeight:800, color:'#0D0D0D', fontFamily:'Poppins,sans-serif' }}>Studio de personnalisation</p>
          <p style={{ fontSize:11, color:'#888', marginTop:1, fontFamily:'Poppins,sans-serif' }}>{selectedProduct.name} · Taille {selectedSize} · {selectedProduct.price.toLocaleString('fr-FR')} FCFA</p>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {/* Undo / Redo */}
          <div style={{ display:'flex', gap:3 }}>
            <button onClick={undo} disabled={!hasUndo} title="Annuler (Ctrl+Z)"
              style={{ display:'flex', alignItems:'center', gap:4, padding:'7px 10px', borderRadius:8, border:'1px solid #EBEBEB', background:'white', color:hasUndo?'#555':'#ccc', fontSize:12, fontWeight:600, cursor:hasUndo?'pointer':'not-allowed', fontFamily:'Poppins,sans-serif', opacity:hasUndo?1:0.5 }}>
              <Undo2 size={13}/>
            </button>
            <button onClick={redo} disabled={!hasRedo} title="Rétablir (Ctrl+Y)"
              style={{ display:'flex', alignItems:'center', gap:4, padding:'7px 10px', borderRadius:8, border:'1px solid #EBEBEB', background:'white', color:hasRedo?'#555':'#ccc', fontSize:12, fontWeight:600, cursor:hasRedo?'pointer':'not-allowed', fontFamily:'Poppins,sans-serif', opacity:hasRedo?1:0.5 }}>
              <Redo2 size={13}/>
            </button>
          </div>
          <button onClick={()=>{ setElementsWithHistory([]); setSelectedId(null); }}
            style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:8, border:'1px solid #EBEBEB', background:'white', color:'#555', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>
            <RotateCcw size={13}/> Réinitialiser
          </button>
          <button onClick={handleExport}
            style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 14px', borderRadius:8, border:'1px solid #EBEBEB', background:'white', color:'#555', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'Poppins,sans-serif' }}>
            <Download size={13}/> Exporter
          </button>
          <button onClick={handleAddToCart}
            style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 20px', borderRadius:9, background:added?'#02AB84':'linear-gradient(135deg, #017BFE, #00C2FF)', color:'white', border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Poppins,sans-serif', boxShadow:'0 4px 14px rgba(1,123,254,0.28)', transition:'background 0.3s' }}>
            {added?<><Check size={14}/> Ajouté !</>:<><ShoppingCart size={14}/> Ajouter au panier</>}
          </button>
        </div>
      </div>

      {/* ── 3 colonnes ── */}
      <div style={{ maxWidth:1440, margin:'0 auto', padding:'16px', display:'grid', gridTemplateColumns:'268px 1fr 256px', gap:14 }}>

        {/* ════ GAUCHE ════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {/* Tabs */}
          <div style={{ display:'flex', background:'white', borderRadius:10, border:'1px solid #EBEBEB', overflow:'hidden' }}>
            {[['produit','Produit'],['outils','Design']].map(([id,label])=>(
              <button key={id} onClick={()=>setLeftTab(id)} style={{ flex:1, padding:'10px', border:'none', cursor:'pointer', fontSize:12, fontWeight:700, background:leftTab===id?'#0D0D0D':'white', color:leftTab===id?'white':'#555', transition:'all 0.2s', fontFamily:'Poppins,sans-serif' }}>{label}</button>
            ))}
          </div>

          {/* ── TAB PRODUIT ── */}
          {leftTab==='produit' && <>
            {/* Sélection produit avec miniature SVG */}
            <div style={card}>
              {sHead('Choisir le produit', ShoppingCart)}
              <div style={{ padding:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
                {PRODUCTS.map(p=>(
                  <button key={p.id} onClick={()=>{ setSelectedProduct(p); setSelectedSize(p.sizes[2]||p.sizes[0]); }}
                    style={{ border:`2px solid ${selectedProduct.id===p.id?'#017BFE':'#EBEBEB'}`, borderRadius:10, padding:'8px 6px', background:selectedProduct.id===p.id?'rgba(1,123,254,0.05)':'white', cursor:'pointer', textAlign:'center', transition:'all 0.18s', fontFamily:'Poppins,sans-serif' }}>
                    {/* Mini mockup SVG */}
                    <div style={{ height:52, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:4 }}>
                      <div style={{ width:40, height:52, opacity:selectedProduct.id===p.id?1:0.65, transition:'opacity 0.2s' }}>
                        <ProductThumb productId={p.id} color={selectedProduct.id===p.id ? productColor : '#AAAAAA'}/>
                      </div>
                    </div>
                    <p style={{ fontSize:11, fontWeight:700, color:selectedProduct.id===p.id?'#017BFE':'#444', marginBottom:1 }}>{p.name}</p>
                    <p style={{ fontSize:10, color:'#999' }}>{p.price.toLocaleString('fr-FR')} F</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Couleur produit */}
            <div style={card}>
              {sHead('Couleur du produit', Palette)}
              <div style={{ padding:'10px 12px' }}>
                <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                  {PRODUCT_COLORS.map(c=>(
                    <button key={c.hex} onClick={()=>setProductColor(c.hex)} title={c.name}
                      style={{ width:30, height:30, borderRadius:'50%', background:c.hex, padding:0, border:productColor===c.hex?'2.5px solid #017BFE':'2px solid #EBEBEB', cursor:'pointer', transition:'transform 0.15s', transform:productColor===c.hex?'scale(1.22)':'scale(1)', boxShadow:c.hex==='#FFFFFF'?'inset 0 0 0 1px #ccc':'none' }}/>
                  ))}
                </div>
                <div style={{ marginTop:10, padding:'8px 10px', background:'#F0F7FF', borderRadius:8, border:'1px solid #DBEAFE' }}>
                  <p style={{ fontSize:10, color:'#555', lineHeight:1.6, fontFamily:'Poppins,sans-serif' }}>
                    <strong style={{ color:'#017BFE' }}>Rendu temps réel</strong> — le mockup 3D se met à jour instantanément
                  </p>
                </div>
              </div>
            </div>

            {/* Taille */}
            <div style={card}>
              {sHead('Taille', Type)}
              <div style={{ padding:'10px 12px', display:'flex', flexWrap:'wrap', gap:6 }}>
                {selectedProduct.sizes.map(s=>(
                  <button key={s} onClick={()=>setSelectedSize(s)}
                    style={{ minWidth:38, padding:'6px 8px', borderRadius:7, border:`1.5px solid ${selectedSize===s?'#017BFE':'#EBEBEB'}`, background:selectedSize===s?'rgba(1,123,254,0.07)':'white', color:selectedSize===s?'#017BFE':'#555', fontWeight:700, fontSize:11, cursor:'pointer', transition:'all 0.18s', fontFamily:'Poppins,sans-serif' }}>{s}</button>
                ))}
              </div>
            </div>
          </>}

          {/* ── TAB DESIGN ── */}
          {leftTab==='outils' && <>
            {/* Sélecteur outil */}
            <div style={{ display:'flex', gap:6 }}>
              {[{id:'text',Icon:Type,label:'Texte'},{id:'elements',Icon:Shapes,label:'Éléments'},{id:'image',Icon:Upload,label:'Image'}].map(({id,Icon,label})=>(
                <button key={id} onClick={()=>setActiveTool(id)}
                  style={{ flex:1, padding:'9px 4px', borderRadius:9, border:`1.5px solid ${activeTool===id?'#017BFE':'#EBEBEB'}`, background:activeTool===id?'#0D0D0D':'white', color:activeTool===id?'white':'#555', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:4, fontSize:11, fontWeight:700, transition:'all 0.2s', fontFamily:'Poppins,sans-serif' }}>
                  <Icon size={15}/>{label}
                </button>
              ))}
            </div>

            {/* Texte */}
            {activeTool==='text' && (
              <div style={card}>
                {sHead('Texte', Type)}
                <div style={{ padding:12, display:'flex', flexDirection:'column', gap:10 }}>
                  <textarea value={text} onChange={e=>setText(e.target.value)} rows={2}
                    style={{ width:'100%', border:'1.5px solid #EBEBEB', borderRadius:8, padding:'8px 10px', fontSize:13, outline:'none', fontFamily:font, resize:'none', lineHeight:1.5 }}/>
                  <select value={font} onChange={e=>setFont(e.target.value)}
                    style={{ width:'100%', border:'1.5px solid #EBEBEB', borderRadius:8, padding:'7px 10px', fontSize:12, outline:'none', fontFamily:'Poppins,sans-serif' }}>
                    {FONTS.map(f=><option key={f.name} value={f.name}>{f.label}</option>)}
                  </select>
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:'0.04em', fontFamily:'Poppins,sans-serif' }}>Taille</span>
                      <span style={{ fontSize:12, fontWeight:800, color:'#017BFE', fontFamily:'Poppins,sans-serif' }}>{fontSize}px</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      {ib(()=>setFontSize(s=>Math.max(10,s-2)), Minus, false, 'Réduire')}
                      <input type="range" min={10} max={80} value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} style={{ flex:1, accentColor:'#017BFE' }}/>
                      {ib(()=>setFontSize(s=>Math.min(80,s+2)), Plus, false, 'Agrandir')}
                    </div>
                  </div>
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:'0.04em', fontFamily:'Poppins,sans-serif' }}>Espacement</span>
                      <span style={{ fontSize:12, fontWeight:800, color:'#017BFE', fontFamily:'Poppins,sans-serif' }}>{letterSpacing}px</span>
                    </div>
                    <input type="range" min={-2} max={20} value={letterSpacing} onChange={e=>setLetterSpacing(Number(e.target.value))} style={{ width:'100%', accentColor:'#017BFE' }}/>
                  </div>
                  <div style={{ display:'flex', gap:5 }}>
                    {ib(()=>setBold(v=>!v),    Bold,        bold,             'Gras')}
                    {ib(()=>setItalic(v=>!v),  Italic,      italic,           'Italique')}
                    {ib(()=>setAlign('left'),   AlignLeft,   align==='left',   'Gauche')}
                    {ib(()=>setAlign('center'), AlignCenter, align==='center', 'Centre')}
                    {ib(()=>setAlign('right'),  AlignRight,  align==='right',  'Droite')}
                    {ib(()=>setShadow(v=>!v),   Sparkles,    shadow,           'Ombre')}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                    {TEXT_COLORS.map(c=>(
                      <button key={c} onClick={()=>setTextColor(c)}
                        style={{ width:24, height:24, borderRadius:'50%', background:c, padding:0, border:textColor===c?'2.5px solid #017BFE':'2px solid #EBEBEB', cursor:'pointer', transform:textColor===c?'scale(1.25)':'scale(1)', transition:'transform 0.12s', boxShadow:c==='#FFFFFF'?'inset 0 0 0 1px #ccc':'none' }}/>
                    ))}
                  </div>
                  <button onClick={addText}
                    style={{ width:'100%', padding:'10px', borderRadius:9, background:'linear-gradient(135deg, #017BFE, #00C2FF)', color:'white', border:'none', fontWeight:700, fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'Poppins,sans-serif' }}>
                    <Type size={14}/> Ajouter sur le design
                  </button>
                </div>
              </div>
            )}

            {/* Éléments */}
            {activeTool==='elements' && (
              <div style={card}>
                {sHead('Bibliothèque', Shapes)}
                <ElementLibrary onAdd={addLibraryElement}/>
              </div>
            )}

            {/* Image */}
            {activeTool==='image' && (
              <div style={card}>
                {sHead('Importer une image', Upload)}
                <div style={{ padding:14 }}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display:'none' }}/>
                  <button onClick={()=>fileRef.current.click()}
                    style={{ width:'100%', border:'2px dashed #017BFE', borderRadius:10, padding:'24px 16px', background:'rgba(1,123,254,0.02)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:8, color:'#017BFE' }}>
                    <Upload size={24}/>
                    <span style={{ fontSize:13, fontWeight:700, fontFamily:'Poppins,sans-serif' }}>Cliquer pour importer</span>
                    <span style={{ fontSize:11, color:'#888', fontFamily:'Poppins,sans-serif' }}>PNG, JPG, SVG — max 5 MB</span>
                  </button>
                  <div style={{ marginTop:10, padding:'10px 12px', background:'#F8FBFF', borderRadius:8, border:'1px solid #E0EDFF' }}>
                    <p style={{ fontSize:11, color:'#555', lineHeight:1.7, fontFamily:'Poppins,sans-serif' }}><strong style={{ color:'#017BFE' }}>Conseil :</strong> PNG avec fond transparent pour un rendu optimal.</p>
                  </div>
                </div>
              </div>
            )}
          </>}
        </div>

        {/* ════ CANVAS ════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {/* Toolbar contextuelle */}
          {selectedEl && (
            <div style={{ background:'white', borderRadius:10, padding:'8px 12px', border:'1px solid #EBEBEB', display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
              <span style={{ fontSize:11, color:'#888', fontFamily:'Poppins,sans-serif', marginRight:2 }}>
                {selectedEl.type==='text'?'Texte':selectedEl.type==='shape'?'Forme':'Image'}
              </span>
              <div style={{ width:1, height:18, background:'#EBEBEB' }}/>
              {ib(()=>updateElement(selectedId,{size:Math.max(10,(selectedEl.size||60)-6)}), ZoomOut, false, 'Réduire')}
              <span style={{ fontSize:12, fontWeight:700, color:'#017BFE', minWidth:26, textAlign:'center', fontFamily:'Poppins' }}>{Math.round(selectedEl.size||60)}</span>
              {ib(()=>updateElement(selectedId,{size:Math.min(300,(selectedEl.size||60)+6)}), ZoomIn, false, 'Agrandir')}
              <div style={{ width:1, height:18, background:'#EBEBEB' }}/>
              {ib(()=>updateElement(selectedId,{rotation:((selectedEl.rotation||0)+15)%360}), RotateCw, false, 'Rotation')}
              {ib(()=>updateElement(selectedId,{flipX:!selectedEl.flipX}), FlipHorizontal, selectedEl.flipX, 'Miroir')}
              {ib(()=>updateElement(selectedId,{zIndex:(selectedEl.zIndex||3)+1}), MoveUp, false, 'Avancer')}
              {ib(()=>updateElement(selectedId,{zIndex:Math.max(1,(selectedEl.zIndex||3)-1)}), MoveDown, false, 'Reculer')}
              <div style={{ width:1, height:18, background:'#EBEBEB' }}/>
              {ib(()=>duplicateElement(selectedId), Copy, false, 'Dupliquer')}
              {ib(()=>deleteElement(selectedId), Trash2, false, 'Supprimer', true)}
            </div>
          )}

          {/* Canvas */}
          <div style={{ flex:1, borderRadius:16, overflow:'hidden', boxShadow:'0 4px 40px rgba(0,0,0,0.12)', background:'white', minHeight:520, position:'relative' }}>
            <DesignCanvas
              elements={elements}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onUpdate={updateElement}
              productId={selectedProduct.id}
              productColor={productColor}
            />
          </div>

          {/* Hint raccourcis */}
          <div style={{ background:'white', borderRadius:10, padding:'8px 14px', border:'1px solid #EBEBEB', display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
            {[['Ctrl+Z','Annuler'],['Ctrl+Y','Rétablir'],['Suppr','Effacer'],['Drag','Déplacer']].map(([key,label])=>(
              <div key={key} style={{ display:'flex', alignItems:'center', gap:4 }}>
                <kbd style={{ padding:'2px 6px', borderRadius:5, background:'#F0F0F0', border:'1px solid #DCDCDC', fontSize:10, fontFamily:'monospace', color:'#555' }}>{key}</kbd>
                <span style={{ fontSize:10, color:'#999', fontFamily:'Poppins,sans-serif' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════ DROITE ════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {/* Calques */}
          <div style={card}>
            {sHead(`Calques (${elements.length})`, Layers)}
            <div style={{ padding:'6px 10px', maxHeight:220, overflowY:'auto' }}>
              {elements.length===0 ? (
                <p style={{ fontSize:12, color:'#bbb', textAlign:'center', padding:'16px 0', fontFamily:'Poppins,sans-serif' }}>Aucun élément</p>
              ) : (
                [...elements].reverse().map(el=>(
                  <div key={el.id} onClick={()=>setSelectedId(el.id)}
                    style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 8px', borderRadius:8, cursor:'pointer', background:selectedId===el.id?'rgba(1,123,254,0.06)':'transparent', border:`1px solid ${selectedId===el.id?'rgba(1,123,254,0.18)':'transparent'}`, marginBottom:3, transition:'all 0.12s' }}>
                    <span style={{ fontSize:14, flexShrink:0 }}>{el.type==='text'?'𝗧':el.type==='image'?'🖼':'◆'}</span>
                    <span style={{ fontSize:12, flex:1, color:'#444', fontFamily:'Poppins,sans-serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{el.type==='text'?`"${el.text}"`:el.type==='shape'?'Forme':'Image'}</span>
                    <button onClick={e=>{e.stopPropagation();deleteElement(el.id);}} style={{ background:'none', border:'none', cursor:'pointer', padding:2, display:'flex', opacity:0.4 }}><Trash2 size={12} color="#666"/></button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Apparence élément sélectionné */}
          {selectedEl && (
            <div style={card}>
              {sHead('Apparence', Palette)}
              <div style={{ padding:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:'0.04em', fontFamily:'Poppins,sans-serif' }}>Opacité</span>
                  <span style={{ fontSize:12, fontWeight:800, color:'#017BFE', fontFamily:'Poppins,sans-serif' }}>{Math.round((selectedEl.opacity??1)*100)}%</span>
                </div>
                <input type="range" min={0.1} max={1} step={0.05} value={selectedEl.opacity??1} onChange={e=>updateElement(selectedId,{opacity:parseFloat(e.target.value)})} style={{ width:'100%', accentColor:'#017BFE' }}/>
                {selectedEl.type==='shape' && (
                  <div style={{ marginTop:12 }}>
                    <p style={{ fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:6, fontFamily:'Poppins,sans-serif' }}>Couleur</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                      {TEXT_COLORS.map(c=>(
                        <button key={c} onClick={()=>updateElement(selectedId,{color:c})}
                          style={{ width:22, height:22, borderRadius:'50%', background:c, padding:0, border:selectedEl.color===c?'2.5px solid #017BFE':'2px solid #EBEBEB', cursor:'pointer', transform:selectedEl.color===c?'scale(1.25)':'scale(1)', transition:'transform 0.12s', boxShadow:c==='#FFFFFF'?'inset 0 0 0 1px #ccc':'none' }}/>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ marginTop:12 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:'#555', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:6, fontFamily:'Poppins,sans-serif' }}>Rotation</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    {ib(()=>updateElement(selectedId,{rotation:((selectedEl.rotation||0)-5+360)%360}), RotateCcw, false, '-5°')}
                    <span style={{ flex:1, textAlign:'center', fontSize:12, fontWeight:700, color:'#017BFE', fontFamily:'Poppins' }}>{selectedEl.rotation||0}°</span>
                    {ib(()=>updateElement(selectedId,{rotation:((selectedEl.rotation||0)+5)%360}), RotateCw, false, '+5°')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prix + CTA */}
          <div style={{ background:'linear-gradient(135deg, #017BFE 0%, #00C2FF 100%)', borderRadius:14, overflow:'hidden' }}>
            <div style={{ padding:20, color:'white', textAlign:'center' }}>
              <p style={{ fontSize:11, opacity:0.8, marginBottom:3, fontFamily:'Poppins,sans-serif', textTransform:'uppercase', letterSpacing:'0.05em' }}>Prix estimé</p>
              <p style={{ fontSize:32, fontWeight:900, marginBottom:2, fontFamily:'Poppins,sans-serif' }}>{selectedProduct.price.toLocaleString('fr-FR')}</p>
              <p style={{ fontSize:12, opacity:0.75, marginBottom:18, fontFamily:'Poppins,sans-serif' }}>FCFA · Taille {selectedSize}</p>
              <button onClick={handleAddToCart}
                style={{ width:'100%', padding:'12px', background:'white', color:'#017BFE', border:'none', borderRadius:10, fontWeight:800, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:'Poppins,sans-serif', transition:'opacity 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.opacity='0.88'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                {added?<><Check size={15}/> Ajouté !</>:<><ShoppingCart size={15}/> Commander</>}
              </button>
            </div>
          </div>

          {/* Conseils */}
          <div style={{ ...card, background:'#F8FBFF' }}>
            {sHead('Conseils', Sparkles)}
            <ul style={{ padding:'8px 14px 12px', listStyle:'none', display:'flex', flexDirection:'column', gap:7 }}>
              {[
                'Placez votre design librement sur le mockup',
                'PNG fond transparent = rendu optimal',
                'Ctrl+Z / Ctrl+Y pour annuler / rétablir',
                'Poignée bleue pour redimensionner',
                'Éléments PRO 👑 nécessitent un abonnement',
              ].map((tip,i)=>(
                <li key={i} style={{ display:'flex', gap:7, fontSize:11, color:'#555', lineHeight:1.6, fontFamily:'Poppins,sans-serif' }}>
                  <span style={{ color:'#017BFE', fontWeight:800, flexShrink:0 }}>·</span>{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}