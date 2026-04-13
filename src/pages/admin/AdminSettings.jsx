import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Save, Globe, Truck, CreditCard, 
  BellRing, ShieldCheck, Mail, 
  Settings2, Smartphone, CheckCircle
} from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [activeToggles, setActiveToggles] = useState({
    mtn: true, moov: true, celtiis: true, card: true,
    email_order: true, sms_ship: true, email_deliv: false
  });

  const handleSave = () => { 
    setSaved(true); 
    setTimeout(() => setSaved(false), 2500); 
  };

  const toggle = (id) => {
    setActiveToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 28 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#017BFE' }}>
        <Icon size={24} />
      </div>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 900, margin: 0 }}>{title}</h2>
        <p style={{ fontSize: 13, color: '#64748B', fontWeight: 500, margin: 0 }}>{subtitle}</p>
      </div>
    </div>
  );

  const ToggleSwitch = ({ active, onToggle }) => (
    <div 
      onClick={onToggle}
      style={{ 
        width: 44, height: 24, borderRadius: 20, 
        background: active ? '#017BFE' : '#E2E8F0', 
        position: 'relative', cursor: 'pointer',
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div style={{ 
        position: 'absolute', 
        left: active ? 22 : 3, top: 3, 
        width: 18, height: 18, borderRadius: '50%', 
        background: 'white',
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </div>
  );

  return (
    <AdminLayout>
      <div style={{ padding: '10px 0' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 6 }}>Configuration</h1>
            <p style={{ color: '#64748B', fontWeight: 500 }}>Paramètres techniques et préférences de la plateforme</p>
          </div>
          <button 
            onClick={handleSave} 
            style={{ 
              background: saved ? '#02AB84' : '#017BFE', color: 'white', border: 'none', borderRadius: 16, 
              padding: '14px 28px', fontWeight: 800, cursor: 'pointer', fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 10, transition: '0.3s',
              boxShadow: saved ? '0 10px 20px rgba(2,171,132,0.2)' : '0 10px 20px rgba(1,123,254,0.2)' 
            }}
          >
            {saved ? <CheckCircle size={20} /> : <Save size={20} />}
            {saved ? 'Changements appliqués' : 'Enregistrer tout'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          
          {/* General Settings */}
          <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <SectionHeader icon={Globe} title="Identité du site" subtitle="Informations publiques de Printed" />
            <div style={{ display: 'grid', gap: 20 }}>
              {[
                { label: 'Nom de la boutique', value: 'Printed' },
                { label: 'Email de support', value: 'contact@printed.bj' },
                { label: 'Téléphone WhatsApp', value: '+229 01 95 00 00 00' },
                { label: 'Siège Social', value: 'Abomey-Calavi, Quartier Zogbadjè' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                  <input defaultValue={f.value} style={{ width: '100%', border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 14, padding: '14px', fontSize: 14, outline: 'none', fontWeight: 600 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Logic */}
          <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9' }}>
            <SectionHeader icon={Truck} title="Logistique" subtitle="Frais et délais de livraison" />
            <div style={{ display: 'grid', gap: 20 }}>
              {[
                { label: 'Livraison Standard (FCFA)', value: '2000' },
                { label: 'Seuil de gratuité (FCFA)', value: '25000' },
                { label: 'Délai de production (jours)', value: '2-4' },
                { label: 'Villes desservies (Express)', value: 'Cotonou, Calavi, Porto-Novo' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: '#475569', textTransform: 'uppercase' }}>{f.label}</label>
                  <input defaultValue={f.value} style={{ width: '100%', border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: 14, padding: '14px', fontSize: 14, outline: 'none', fontWeight: 600 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9' }}>
            <SectionHeader icon={CreditCard} title="Paiements" subtitle="Activez vos passerelles de paiement" />
            <div style={{ background: '#F8FAFC', borderRadius: 24, padding: '8px 20px' }}>
              {[
                { id: 'mtn', name: 'MTN Mobile Money', provider: 'FedaPay' },
                { id: 'moov', name: 'Moov Money', provider: 'KKiaPay' },
                { id: 'celtiis', name: 'Celtiis Cash', provider: 'Direct' },
                { id: 'card', name: 'Carte Bancaire', provider: 'Stripe' },
              ].map((m, i) => (
                <div key={m.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '20px 0', borderBottom: i === 3 ? 'none' : '1px solid #E2E8F0' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: activeToggles[m.id] ? '#02AB84' : '#CBD5E1' }} />
                    <div>
                       <p style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>{m.name}</p>
                       <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, margin: 0 }}>Via {m.provider}</p>
                    </div>
                  </div>
                  <ToggleSwitch active={activeToggles[m.id]} onToggle={() => toggle(m.id)} />
                </div>
              ))}
            </div>
          </div>

          {/* Automations */}
          <div style={{ background: 'white', borderRadius: 32, padding: 32, border: '1px solid #F1F5F9' }}>
            <SectionHeader icon={BellRing} title="Notifications" subtitle="Alertes clients et système" />
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                { id: 'email_order', label: 'Confirmation de commande (Email)', icon: Mail },
                { id: 'sms_ship', label: 'Suivi par SMS (Expédition)', icon: Smartphone },
                { id: 'email_deliv', label: 'Enquête de satisfaction (Post-livraison)', icon: ShieldCheck },
              ].map(n => (
                <div key={n.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '16px 20px', borderRadius: 16, border: '1px solid #F1F5F9',
                  background: activeToggles[n.id] ? '#F0F9FF' : 'white',
                  transition: '0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <n.icon size={18} color={activeToggles[n.id] ? '#017BFE' : '#94A3B8'} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: activeToggles[n.id] ? '#0C4A6E' : '#64748B' }}>{n.label}</span>
                  </div>
                  <ToggleSwitch active={activeToggles[n.id]} onToggle={() => toggle(n.id)} />
                </div>
              ))}
            </div>
            
            <div style={{ 
              marginTop: 24, padding: 20, borderRadius: 20, background: '#FFF7ED', border: '1px solid #FFEDD5',
              display: 'flex', gap: 12, alignItems: 'flex-start'
            }}>
               <Settings2 size={20} color="#F59E0B" style={{ marginTop: 2 }} />
               <p style={{ fontSize: 12, color: '#92400E', fontWeight: 600, lineHeight: '1.5', margin: 0 }}>
                 La passerelle SMS nécessite un solde positif sur votre compte développeur pour fonctionner.
               </p>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}