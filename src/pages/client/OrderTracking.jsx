import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, Truck, CheckCircle2, MapPin, 
  Clock, Calendar, ChevronLeft, Box, 
  AlertCircle, Phone, MessageSquare 
} from 'lucide-react';

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulation d'étapes de livraison
  const steps = [
    { title: 'Commande confirmée', date: '12 Mars, 10:30', icon: CheckCircle2, completed: true, current: false },
    { title: 'En préparation', date: '12 Mars, 14:15', icon: Box, completed: true, current: false },
    { title: 'Expédiée', date: '13 Mars, 09:00', icon: Truck, completed: true, current: true },
    { title: 'Livraison prévue', date: '15 Mars', icon: MapPin, completed: false, current: false },
  ];

  const containerStyle = {
    maxWidth: 900,
    margin: '40px auto',
    padding: '0 24px',
    fontFamily: 'Poppins, sans-serif',
    color: '#1A1A1A'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: 24,
    padding: 32,
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
  };

  return (
    <div style={containerStyle}>
      {/* Retour */}
      <button 
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'none', cursor: 'pointer', color: '#666', marginBottom: 24, fontWeight: 600 }}
      >
        <ChevronLeft size={20} /> Retour à mes commandes
      </button>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, borderBottom: '1px solid #F0F0F0', paddingBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Suivi de commande</h1>
            <p style={{ color: '#017BFE', fontWeight: 700 }}>N° {id}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ background: '#EFF6FF', color: '#017BFE', padding: '8px 16px', borderRadius: 40, fontSize: 13, fontWeight: 800 }}>
              EXPÉDIÉ
            </span>
          </div>
        </div>

        {/* Timeline de suivi */}
        <div style={{ position: 'relative', marginBottom: 48 }}>
          {steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative' }}>
              {/* Ligne verticale entre les étapes */}
              {index !== steps.length - 1 && (
                <div style={{ 
                  position: 'absolute', left: 20, top: 40, bottom: -20, width: 2, 
                  background: step.completed ? '#017BFE' : '#E5E7EB' 
                }} />
              )}
              
              <div style={{ 
                width: 42, height: 42, borderRadius: 12, 
                background: step.completed ? '#017BFE' : 'white',
                border: step.completed ? 'none' : '2px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.completed ? 'white' : '#CCC',
                zIndex: 2
              }}>
                <step.icon size={20} />
              </div>

              <div>
                <p style={{ fontWeight: 800, fontSize: 16, color: step.completed ? '#1A1A1A' : '#999' }}>{step.title}</p>
                <p style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Transporteur */}
        <div style={{ background: '#F8FAFC', borderRadius: 20, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
             <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Truck size={24} />
             </div>
             <div>
                <p style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>Transporteur</p>
                <p style={{ fontWeight: 800 }}>DHL Express Africa</p>
             </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
             <button style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                Appeler
             </button>
             <button style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: '#017BFE', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                Message
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}