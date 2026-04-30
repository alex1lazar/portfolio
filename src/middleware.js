import { NextResponse } from 'next/server';

/**
 * Case-sensitive legacy paths only. next.config.js redirects matched `/work` as `/Work` on Netlify
 * (case-insensitive), causing an infinite 308 loop for `/work` and `/reading`.
 */
export function middleware(request) {
  const path = request.nextUrl.pathname;
  if (path === '/Work') {
    return NextResponse.redirect(new URL('/work', request.url), 308);
  }
  if (path === '/Reading') {
    return NextResponse.redirect(new URL('/reading', request.url), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/Work', '/Reading'],
};
