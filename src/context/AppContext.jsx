import { createContext, useContext, useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Cart Context
// ─────────────────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('printed_cart') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('printed_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${product.size || ''}`;
      const existing = prev.find(i => `${i.id}-${i.size || ''}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.size || ''}` === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty, _key: key }];
    });
  };

  const removeItem = (key) => setItems(prev => prev.filter(i => i._key !== key));

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeItem(key);
    setItems(prev => prev.map(i => i._key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

// ─────────────────────────────────────────────────────────────────────────────
// Auth Context
// ─────────────────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

const DEMO_USERS = [
  { id: 1, name: 'Admin Printed',  email: 'admin@printed.bj',  password: 'admin123',  role: 'admin'  },
  { id: 2, name: 'Jean Client',    email: 'client@printed.bj', password: 'client123', role: 'client' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('printed_user') || 'null'); }
    catch { return null; }
  });

  const login = (email, password) => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _pwd, ...safe } = found;
      setUser(safe);
      localStorage.setItem('printed_user', JSON.stringify(safe));
      return { success: true, user: safe };
    }
    return { success: false, error: 'Email ou mot de passe incorrect' };
  };

  const register = (data) => {
    const newUser = { id: Date.now(), role: 'client', ...data };
    setUser(newUser);
    localStorage.setItem('printed_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('printed_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAdmin:         user?.role === 'admin',
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
