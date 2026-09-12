'use client';
import { useMemo, useState } from 'react';

type Props = { src: string; alt?: string; name: string; height?: number };

export function CollegeImage({ src, alt, name, height = 155 }: Props) {
  const [broken, setBroken] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const initials = useMemo(() => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase(), [name]);
  return (
    <div aria-label={alt || name} style={{ width: '100%', height, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg,#dbeafe,#eff6ff)', display: 'grid', placeItems: 'center' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: Math.max(28, Math.round(height * 0.24)), fontWeight: 800, color: '#1d4ed8', letterSpacing: 2 }}>
        {initials}
      </div>
      {!broken && (
        <img src={src} alt={alt || `${name} campus`} loading="eager" referrerPolicy="no-referrer" onLoad={() => setLoaded(true)} onError={() => setBroken(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 120ms ease' }} />
      )}
    </div>
  );
}
