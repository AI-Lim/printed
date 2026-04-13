import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '../context/AppContext';
import { useAuth } from '../context/AppContext';

const STEPS = ['Livraison', 'Paiement', 'Confirmation'];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState({ name: user?.name || '', phone: '', address: '', city: 'Cotonou', date: '', time: '' });
  const [payMethod, setPayMethod] = useState('mtn');
  const [payPhone, setPayPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const shipping = total >= 15000 ? 0 : 2000;
  const finalTotal = total + shipping;

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    setStep(2);
    setLoading(false);
  };

  const inp = { width: '100%', border: '1px solid #e5e7eb', borderRadius: 12, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'Poppins, sans-serif' };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 48 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: i <= step ? '#017BFE' : '#e5e7eb', color: i <= step ? 'white' : '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                {i < step ? <Check size={18} /> : i + 1}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: i <= step ? '#017BFE' : '#999', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div style={{ width: 80, height: 2, background: i < step ? '#017BFE' : '#e5e7eb', margin: '0 8px', marginBottom: 20 }} />}
          </div>
        ))}
      </div>

      {step === 2 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#02AB84', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Check size={40} color="white" />
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#02AB84', marginBottom: 12 }}>Commande confirmée !</h1>
          <p style={{ color: '#666', fontSize: 16, marginBottom: 8 }}>Merci pour votre commande. Un email de confirmation vous a été envoyé.</p>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 40 }}>Numéro de commande : <strong style={{ color: '#017BFE' }}>#PRT-{Date.now().toString().slice(-6)}</strong></p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/commandes" style={{ background: '#017BFE', color: 'white', padding: '14px 28px', borderRadius: 28, textDecoration: 'none', fontWeight: 700 }}>Suivre ma commande</Link>
            <Link to="/" style={{ border: '2px solid #017BFE', color: '#017BFE', padding: '14px 28px', borderRadius: 28, textDecoration: 'none', fontWeight: 700 }}>Retour à l'accueil</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32 }}>
          {/* Left */}
          <div>
            {step === 0 && (
              <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Informations de livraison</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Nom complet', key: 'name', placeholder: 'Jean Dupont' },
                    { label: 'Téléphone', key: 'phone', placeholder: '+229 00 000 000' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                      <input value={delivery[f.key]} onChange={e => setDelivery(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inp} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Adresse de livraison</label>
                  <input value={delivery.address} onChange={e => setDelivery(p => ({ ...p, address: e.target.value }))} placeholder="Rue, Quartier, Arrondissement..." style={inp} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
                  {[
                    { label: 'Ville', key: 'city', placeholder: 'Cotonou' },
                    { label: 'Date souhaitée', key: 'date', type: 'date' },
                    { label: 'Heure', key: 'time', type: 'time' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type || 'text'} value={delivery[f.key]} onChange={e => setDelivery(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inp} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} style={{ marginTop: 28, background: '#017BFE', color: 'white', border: 'none', borderRadius: 28, padding: '14px 40px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  Continuer vers le paiement →
                </button>
              </div>
            )}

            {step === 1 && (
              <div style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Mode de paiement</h2>
                {[
                  { id: 'mtn', label: 'MTN Mobile Money', icon: '📱', color: '#F59E0B' },
                  { id: 'moov', label: 'Moov Money', icon: '📱', color: '#10B981' },
                  { id: 'celtiis', label: 'Celtiis', icon: '📱', color: '#6366F1' },
                  { id: 'card', label: 'Carte bancaire', icon: '💳', color: '#232323' },
                ].map(m => (
                  <div key={m.id} onClick={() => setPayMethod(m.id)} style={{ border: `2px solid ${payMethod === m.id ? '#017BFE' : '#e5e7eb'}`, borderRadius: 16, padding: '16px 20px', marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, background: payMethod === m.id ? '#E5F4FF' : 'white', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{m.label}</span>
                    {payMethod === m.id && <Check size={18} color="#017BFE" style={{ marginLeft: 'auto' }} />}
                  </div>
                ))}

                {payMethod !== 'card' ? (
                  <div style={{ marginTop: 20 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Numéro Mobile Money</label>
                    <input value={payPhone} onChange={e => setPayPhone(e.target.value)} placeholder="+229 00 000 000" style={inp} />
                  </div>
                ) : (
                  <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input placeholder="Numéro de carte" style={inp} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input placeholder="MM/AA" style={inp} />
                      <input placeholder="CVV" style={inp} />
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                  <button onClick={() => setStep(0)} style={{ border: '2px solid #e5e7eb', background: 'white', borderRadius: 28, padding: '14px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>← Retour</button>
                  <button onClick={handleOrder} disabled={loading} style={{ flex: 1, background: '#017BFE', color: 'white', border: 'none', borderRadius: 28, padding: '14px', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Traitement en cours...' : `✅ Confirmer et payer — ${finalTotal.toLocaleString('fr-FR')} FCFA`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', alignSelf: 'start', position: 'sticky', top: 90 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Récapitulatif ({items.length} articles)</h3>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', background: '#F4F4F4', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.name}</p>
                  <p style={{ fontSize: 11, color: '#888' }}>x{item.qty} {item.size ? `· ${item.size}` : ''}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#017BFE' }}>{(item.price * item.qty).toLocaleString('fr-FR')}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16, marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 8 }}>
                <span>Sous-total</span><span>{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 16 }}>
                <span>Livraison</span><span style={{ color: shipping === 0 ? '#02AB84' : undefined }}>{shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-FR')} FCFA`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800 }}>
                <span>Total</span><span style={{ color: '#017BFE' }}>{finalTotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
