import React from 'react';
import { notFound } from 'next/navigation';
import PageWithNavbar from '../../../components/layout/PageWithNavbar';
import ArticleView from '../../../components/writing/ArticleView';
import { getArticleSlugs, loadArticle } from '../../../lib/articles';
import { buildPageMetadata } from '../../../lib/siteMetadata';

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const rawSlug = resolved?.slug;
  const slug = typeof rawSlug === 'string' ? decodeURIComponent(rawSlug) : '';

  const article = await loadArticle(slug);
  if (!article) {
    return buildPageMetadata({
      title: 'Article',
      description: "Alex Lazar's writing",
      path: `/writing/${encodeURIComponent(slug)}`,
    });
  }

  return buildPageMetadata({
    title: article.frontmatter.title,
    description: article.frontmatter.description || "Alex Lazar's writing",
    path: `/writing/${encodeURIComponent(article.slug)}`,
    ogImagePath: article.ogImage || undefined,
  });
}

export default async function ArticlePage({ params }) {
  const resolved = await params;
  const rawSlug = resolved?.slug;
  const slug = typeof rawSlug === 'string' ? decodeURIComponent(rawSlug) : '';

  const article = await loadArticle(slug);
  if (!article) {
    notFound();
  }

  return (
    <PageWithNavbar>
      <ArticleView article={article} slug={slug} />
    </PageWithNavbar>
  );
}
