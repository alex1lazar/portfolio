import React from 'react';
import PageWithNavbar from '../../components/layout/PageWithNavbar';
import Work from '../../views/Work';
import { buildPageMetadata } from '../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Work',
  description:
    'Product design work across benefits, marketplaces, and self-started explorations.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <PageWithNavbar>
      <Work />
    </PageWithNavbar>
  );
}
