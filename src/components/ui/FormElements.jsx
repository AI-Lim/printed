// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({
  children, variant = 'primary', size = 'md',
  fullWidth, disabled, onClick, type = 'button',
  style: extra = {},
}) {
  const base = {
    border: 'none', borderRadius: 28, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'opacity 0.2s, transform 0.1s',
    fontFamily: 'Poppins, sans-serif',
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.6 : 1,
  };
  const SIZES = {
    sm: { padding: '8px 18px',  fontSize: 12 },
    md: { padding: '12px 28px', fontSize: 14 },
    lg: { padding: '15px 40px', fontSize: 16 },
  };
  const VARIANTS = {
    primary:   { background: '#017BFE', color: 'white' },
    secondary: { background: 'transparent', color: '#017BFE', border: '2px solid #017BFE' },
    danger:    { background: '#ef4444', color: 'white' },
    ghost:     { background: '#F4F4F4', color: '#232323' },
    success:   { background: '#02AB84', color: 'white' },
  };
  return (
    <button
      type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...SIZES[size], ...VARIANTS[variant], ...extra }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '0.85'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
      {children}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({
  label, type = 'text', value, onChange, placeholder,
  icon: Icon, error, required, name, autoComplete,
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#232323' }}>
          {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <Icon size={16} color="#999" style={{
            position: 'absolute', left: 12, top: '50%',
            transform: 'translateY(-50%)', pointerEvents: 'none',
          }} />
        )}
        <input
          type={type} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          name={name} autoComplete={autoComplete}
          style={{
            width: '100%',
            padding: Icon ? '11px 14px 11px 38px' : '11px 14px',
            border: `1.5px solid ${error ? '#ef4444' : '#e5e7eb'}`,
            borderRadius: 12, fontSize: 14, outline: 'none',
            fontFamily: 'Poppins, sans-serif', background: 'white',
            transition: 'border-color 0.2s',
          }}
          onFocus={e  => e.target.style.borderColor = '#017BFE'}
          onBlur={e   => e.target.style.borderColor = error ? '#ef4444' : '#e5e7eb'}
        />
      </div>
      {error && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export default Button;
