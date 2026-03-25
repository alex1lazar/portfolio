import React from 'react';
import Homepage from '../components/Homepage';
import { getAllArticles } from '../lib/articles';
import { buildPageMetadata } from '../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: "Alex's Webspace",
  description:
    'Design portfolio and personal space on the internet for my work, thoughts, and interesting bits.',
  path: '/',
});

export default async function HomePage() {
  const allArticles = await getAllArticles();
  return <Homepage initialArticles={allArticles} />;
}
