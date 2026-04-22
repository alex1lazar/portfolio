import React from 'react';
import Picks from '../../views/Picks';
import { getAllPicks } from '../../lib/picks';
import { buildPageMetadata } from '../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Picks',
  description:
    'Curated articles, videos, and resources worth reading or watching—design, software, and more.',
  path: '/picks',
});

export default function PicksPage() {
  const picks = getAllPicks();

  return <Picks picks={picks} />;
}
