'use client';

import React from 'react';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import WideContainer from '../components/containers/WideContainer';
import { staticAssetUrl } from '../lib/staticAssetUrl';
import designSign from '../assets/play/Design in progress 6.png';

// Fewer columns = wider tiles in the 1120px WideContainer (~33% each at 3-up vs ~25% at 4-up)
const BREAKPOINT_COLS = {
  default: 3,
  900: 2,
  520: 1,
};

/**
 * Each item: kind 'image' | 'video', src under /play/… or bundler URL (import).
 * Videos must use kind 'video' (<video>), not <img>.
 */
const DESIGN_SIGN_SRC = staticAssetUrl(designSign);

function encodedPublicPath(path) {
  if (!path.startsWith('/')) return path;
  return path
    .split('/')
    .map((segment) => (segment ? encodeURIComponent(segment) : ''))
    .join('/');
}

const PLAY_ITEMS = [
  {
    id: 'offsite-video',
    kind: 'video',
    src: '/play/Offsite-video.mp4',
  },
  {
    id: 'design-sign',
    kind: 'image',
    src: DESIGN_SIGN_SRC,
  },
  {
    id: 'create',
    kind: 'video',
    src: '/play/Create Often.mp4',
  },
  {
    id: 'hero',
    kind: 'video',
    src: '/play/Hero-explorations.mp4',
  },
  {
    id: 'webflow-loader',
    kind: 'video',
    src: '/play/Webflow-Loader.mp4',
  },
  {
    id: 'add-contrast-loading',
    kind: 'video',
    src: '/play/Add Contrast Loading Screen.mp4',
  },

];

export default function Play() {
  return (
    <div className="bg-background-primary px-8 min-h-screen pb-16 pt-4">

        <Link
          href="/"
          className="group mb-10 inline-flex cursor-pointer items-center gap-1 font-sans text-sm text-text-dark transition-colors hover:text-text-accent"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-current transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>

        <h1 className="font-serif font-semibold text-text-dark text-2xl mb-8">Play</h1>

        <Masonry
          breakpointCols={BREAKPOINT_COLS}
          className="flex w-auto -ml-3 items-start"
          columnClassName="pl-3 bg-clip-padding"
        >
          {PLAY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="mb-3 rounded overflow-hidden bg-background-white"
            >
              {item.kind === 'video' ? (
                <video
                  src={encodedPublicPath(item.src)}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-auto block"
                />
              ) : (
                <img
                  src={item.src.startsWith('/play/') ? encodedPublicPath(item.src) : item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto block"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </Masonry>

    </div>
  );
}
