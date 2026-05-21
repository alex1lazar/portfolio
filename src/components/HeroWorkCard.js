'use client';
import React from 'react';
import Link from 'next/link';
import { staticAssetUrl } from '../lib/staticAssetUrl';

export default function HeroWorkCard({ label, title, href, imageSrc, imageAlt, rotation = 0 }) {
  return (
    <Link
      href={href}
      className="group block bg-white no-underline"
      style={{
        borderRadius: '2px',
        boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.12)',
        rotate: `${rotation}deg`,
        transformOrigin: 'center',
      }}
    >
      {imageSrc && (
        <div className="w-full overflow-hidden" style={{ borderRadius: '2px 2px 0 0', aspectRatio: '16 / 9' }}>
          <img
            src={staticAssetUrl(imageSrc)}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div style={{ paddingTop: 16, paddingRight: 20, paddingBottom: 18, paddingLeft: 20 }}>
        <p className="font-sans text-text-muted" style={{ fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
          {label}
        </p>
        <h3
          className="font-serif font-semibold text-text-dark group-hover:text-color-accent transition-colors duration-200"
          style={{ fontSize: 20, lineHeight: '26px', letterSpacing: '-0.02em', marginBottom: 0 }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
