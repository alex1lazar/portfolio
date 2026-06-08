'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import WideContainer from '../containers/WideContainer';
import EmailCopy from '../common/EmailCopy';
import AboutDrawer from '../common/AboutDrawer';
import { formatRomaniaTime } from '../../lib/romaniaTime';

const linkClassName =
  'font-sans text-xs text-color-cream/70 hover:text-text-accent transition-colors text-left';

function FooterColumn({ title, titleHidden = false, children }) {
  return (
    <div className="flex flex-col gap-3.5 min-w-[5.5rem]">
      <p
        className={`font-sans text-xs uppercase tracking-[0.08em] text-text-muted mb-1 ${
          titleHidden ? 'invisible' : ''
        }`}
        aria-hidden={titleHidden}
      >
        {titleHidden ? 'Site' : title}
      </p>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function SiteFooter() {
  const [romaniaTime, setRomaniaTime] = useState('');
  const [isAboutDrawerOpen, setIsAboutDrawerOpen] = useState(false);

  useEffect(() => {
    const update = () => setRomaniaTime(formatRomaniaTime());
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-surface-dark text-color-cream w-full mt-16">
        <WideContainer>
          <div className="flex flex-col gap-10 border-b border-white/10 py-12 md:py-14 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="flex max-w-sm flex-col gap-3">
              <Link
                href="/"
                className="font-serif font-semibold text-lg text-color-cream hover:text-text-accent transition-colors"
              >
                Alex Lazar
              </Link>
              <p className="font-sans text-xs text-color-cream/40">
                Software designer working with companies that aim for a world-class customer
                experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:flex sm:flex-wrap sm:gap-x-12 lg:gap-x-16">
              <FooterColumn title="Site">
                <Link href="/work" className={linkClassName}>
                  Work
                </Link>
                <Link href="/play" className={linkClassName}>
                  Play
                </Link>
              </FooterColumn>

              <FooterColumn title="Site" titleHidden>
                <Link href="/writing" className={linkClassName}>
                  Writing
                </Link>
                <Link href="/reading" className={linkClassName}>
                  Reading
                </Link>
                <Link href="/picks" className={linkClassName}>
                  Bookmarks
                </Link>
                <button
                  type="button"
                  onClick={() => setIsAboutDrawerOpen(true)}
                  className={linkClassName}
                >
                  About
                </button>
              </FooterColumn>

              <FooterColumn title="Projects">
                <Link href="/kota" className={linkClassName}>
                  Kota
                </Link>
                <Link href="/advisable" className={linkClassName}>
                  Advisable
                </Link>
                <Link href="/carturesti" className={linkClassName}>
                  Carturesti
                </Link>
              </FooterColumn>

              <FooterColumn title="Connect">
                <a
                  href="https://x.com/alexvlazar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/in/alexvlazar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  LinkedIn
                </a>
                <EmailCopy className={`${linkClassName} text-text-accent underline`}>
                  Copy email
                </EmailCopy>
              </FooterColumn>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-xs text-text-muted tabular-nums">
              Timișoara, Romania
              {romaniaTime ? ` · ${romaniaTime}` : ''}
            </p>
            <p className="font-sans text-xs text-text-muted">
              © {year} Alex Lazar
            </p>
          </div>
        </WideContainer>
      </footer>

      <AboutDrawer
        isOpen={isAboutDrawerOpen}
        onClose={() => setIsAboutDrawerOpen(false)}
      />
    </>
  );
}

export default SiteFooter;
