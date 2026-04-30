/**
 * Central place for Open Graph / Twitter defaults and absolute URLs.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yoursite.com).
 */

export const DEFAULT_OG_IMAGE_PATH = '/og/default.png';

export const DEFAULT_OG_WIDTH = 1200;
export const DEFAULT_OG_HEIGHT = 630;

export function getSiteBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://alexlazar.me'
  );
}

export function absoluteUrl(path) {
  const base = getSiteBaseUrl();
  if (!path) return base;
  if (path.startsWith('http')) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Build Next.js Metadata with OG + Twitter and a default image when ogImagePath is omitted.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImagePath,
  ogWidth = DEFAULT_OG_WIDTH,
  ogHeight = DEFAULT_OG_HEIGHT,
}) {
  const base = getSiteBaseUrl();
  const pageUrl = path ? absoluteUrl(path) : base;
  const imagePath = ogImagePath || DEFAULT_OG_IMAGE_PATH;
  const ogImageUrl = absoluteUrl(imagePath);

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: pageUrl,
      title,
      description,
      images: [{ url: ogImageUrl, width: ogWidth, height: ogHeight }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
