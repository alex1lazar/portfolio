import React from 'react';
import Play from '../../views/Play';
import { buildPageMetadata } from '../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Play',
  description:
    'Personal design explorations, experiments, and side projects outside of client work.',
  path: '/play',
});

export default function PlayPage() {
  return <Play />;
}
