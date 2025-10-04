import matter from 'gray-matter';

// Fetch markdown files at runtime
const creativeAngstRaw = await fetch(new URL('../articles/creative-angst.md', import.meta.url)).then(r => r.text());
const aJobILoveRaw = await fetch(new URL('../articles/a-job-id-love.md', import.meta.url)).then(r => r.text());

// Registry of all articles
const articleRegistry = [
  { slug: 'creative-angst', raw: creativeAngstRaw },
  { slug: 'a-job-id-love', raw: aJobILoveRaw },
];

export const getAllArticles = async () => {
    const articles = articleRegistry.map(({ slug, raw }) => {
      console.log(`Processing ${slug}, raw type:`, typeof raw);
      console.log(`First 200 chars:`, raw?.substring(0, 200));
      
      const { data } = matter(raw);
      console.log(`Parsed data for ${slug}:`, data);
      
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

// Load a single article
export const loadArticle = async (slug) => {
  const article = articleRegistry.find(a => a.slug === slug);
  
  if (!article) {
    return null;
  }

  const { data, content } = matter(article.raw);

  return {
    frontmatter: {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '2024',
      tags: data.tags || [],
    },
    content,
    slug: data.slug || slug,
  };
};