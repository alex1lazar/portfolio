import React from 'react';
import '../index.css';
import BodyScrollReset from '../components/layout/BodyScrollReset';
import { getSiteBaseUrl, DEFAULT_OG_IMAGE_PATH, DEFAULT_OG_HEIGHT, DEFAULT_OG_WIDTH, absoluteUrl } from '../lib/siteMetadata';

export const metadata = {
  metadataBase: new URL(getSiteBaseUrl()),
  title: {
    default: "Alex's Webspace",
    template: "%s | Alex Lazar",
  },
  description:
    'Design portfolio and personal space on the internet for my work, thoughts, and interesting bits.',
  openGraph: {
    type: 'website',
    siteName: "Alex's Webspace",
    locale: 'en_US',
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        width: DEFAULT_OG_WIDTH,
        height: DEFAULT_OG_HEIGHT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

/**
 * Global page inset: edit `pt-10` / `pb-10` on <body> below (Tailwind 10 = 2.5rem = 40px).
 * Do not duplicate vertical page padding on individual routes unless you need extra local spacing.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-10 pb-10">
        <BodyScrollReset />
        {children}
      </body>
    </html>
  );
}
