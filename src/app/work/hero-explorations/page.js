import React from 'react';
import PageWithNavbar from '../../../components/layout/PageWithNavbar';
import HeroExplorations from '../../../views/work/HeroExplorations';
import { buildPageMetadata } from '../../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Hero explorations',
  description:
    'Explorations for the portfolio hero — layout studies and iterations from late 2025.',
  path: '/work/hero-explorations',
});

export default function HeroExplorationsPage() {
  return (
    <PageWithNavbar>
      <HeroExplorations />
    </PageWithNavbar>
  );
}
