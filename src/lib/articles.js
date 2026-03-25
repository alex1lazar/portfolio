import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

/**
 * Registry: add new markdown files here (filename under src/articles/).
 * Frontmatter should include: title, description, date, slug, tags (optional),
 * ogImage (optional path under /public e.g. /og/my-article.png).
 */
const articleFileMap = [
  { slug: 'creative-angst', filename: 'creative-angst.md' },
  { slug: 'a-job-id-love', filename: 'a-job-id-love.md' },
  { slug: 'kota-2025-in-review', filename: 'Kota 2025 in review.md' },
];

function readMarkdownFile(filename) {
  const filePath = path.join(process.cwd(), 'src', 'articles', filename);
  return fs.readFileSync(filePath, 'utf8');
}

export const getAllArticles = async () => {
  const articles = articleFileMap.map(({ slug, filename }) => {
    const raw = readMarkdownFile(filename);
    const { data } = matter(raw);

    return {
      slug: data.slug || slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '2024',
      tags: data.tags || [],
    };
  });

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const loadArticle = async (slug) => {
  const entry = articleFileMap.find((a) => a.slug === slug);
  if (!entry) {
    return null;
  }

  const raw = readMarkdownFile(entry.filename);
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '2024',
      tags: data.tags || [],
    },
    content,
    slug: data.slug || slug,
    ogImage: typeof data.ogImage === 'string' ? data.ogImage : null,
  };
};

export function getArticleSlugs() {
  return articleFileMap.map((a) => a.slug);
}
