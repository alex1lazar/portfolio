'use client';

import Link from 'next/link';

const BASE_CLASS =
  'flex flex-col gap-1.5 text-text-dark transition-colors hover:text-text-accent';

function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

/**
 * Two-line teaser block (title + muted description) for internal or external URLs.
 * External hrefs automatically get target="_blank" and rel="noopener noreferrer".
 */
export default function HomepageTeaserLink({ href, title, description, className = '' }) {
  const external = isExternalHref(href);
  return (
    <Link
      href={href}
      className={[BASE_CLASS, className].filter(Boolean).join(' ')}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      <p className="font-sans text-base font-medium">{title}</p>
      <p className="font-sans text-xs font-normal text-text-muted">{description}</p>
    </Link>
  );
}
