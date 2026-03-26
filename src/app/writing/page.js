import React from 'react';
import PageWithNavbar from '../../components/layout/PageWithNavbar';
import WritingList from '../../components/writing/WritingList';
import { getAllArticles } from '../../lib/articles';
import { buildPageMetadata } from '../../lib/siteMetadata';

export const metadata = buildPageMetadata({
  title: 'Writing',
  description:
    'My inconsistent pleasure of putting thoughts on paper. Personal, career, anything that seems interesting to me.',
  path: '/writing',
});

export default async function WritingPage() {
  const articles = await getAllArticles();

  return (
    <PageWithNavbar>
      <WritingList articles={articles} />
    </PageWithNavbar>
  );
}
