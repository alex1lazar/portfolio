import React from 'react';
import { getProjectConfig } from '../../lib/projectConfigs';
import AdvisablePageContent from './AdvisablePageContent';
import { buildPageMetadata } from '../../lib/siteMetadata';

export function generateMetadata() {
  const advisable = getProjectConfig('advisable');
  return buildPageMetadata({
    title: advisable.title,
    description: advisable.description,
    path: '/advisable',
    ogImagePath: advisable.social.ogImage,
    ogWidth: advisable.social.ogWidth,
    ogHeight: advisable.social.ogHeight,
  });
}

export default function AdvisablePage() {
  return <AdvisablePageContent />;
}
