import React from 'react';
import PageWithNavbar from '../../components/layout/PageWithNavbar';
import Reading from '../../views/Reading';
import { buildPageMetadata } from '../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Reading',
  description:
    'Books I have been reading and tracking since around 2020.',
  path: '/reading',
});

export default function ReadingPage() {
  return (
    <PageWithNavbar>
      <Reading />
    </PageWithNavbar>
  );
}
