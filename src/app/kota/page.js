import React from 'react';
import { getProjectConfig } from '../../lib/projectConfigs';
import KotaPageContent from './KotaPageContent';
import { buildPageMetadata } from '../../lib/siteMetadata';

export function generateMetadata() {
  const kota = getProjectConfig('kota');
  return buildPageMetadata({
    title: kota.title,
    description: kota.description,
    path: '/kota',
    ogImagePath: kota.social.ogImage,
    ogWidth: kota.social.ogWidth,
    ogHeight: kota.social.ogHeight,
  });
}

export default function KotaPage() {
  return <KotaPageContent />;
}
