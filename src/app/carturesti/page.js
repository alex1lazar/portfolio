import React from 'react';
import PageWithNavbar from '../../components/layout/PageWithNavbar';
import CaseStudyCarturesti from '../../views/CaseStudyCarturesti';
import { buildPageMetadata } from '../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Carturesti case study',
  description:
    "Imagining a mobile experience for Romania's largest book retailer.",
  path: '/carturesti',
});

export default function CarturestiPage() {
  return (
    <PageWithNavbar>
      <CaseStudyCarturesti />
    </PageWithNavbar>
  );
}
