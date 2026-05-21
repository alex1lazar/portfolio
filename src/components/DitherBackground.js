'use client';
import { Dithering } from '@paper-design/shaders-react';

export default function DitherBackground({ className = '' }) {
  return (
    <Dithering
      className={className}
      speed={0.23}
      shape="simplex"
      type="random"
      size={1}
      scale={3.8}
      colorBack="#00000000"
      colorFront="#FFFFFF60"
      style={{ backgroundColor: '#FDF2E0', width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
