/**
 * Fails the build if CRA-era files exist under public/.
 * Those files break Next.js on Netlify (white screen / wrong document for /).
 *
 * Run automatically via npm `prebuild` before `next build`.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const forbidden = [
  [
    path.join(root, 'public', 'index.html'),
    'CRA shell (empty #root). Next.js serves HTML from app/. Netlify may serve this for / → white page.',
  ],
  [
    path.join(root, 'public', '_redirects'),
    'Netlify SPA rule often rewrites /* → /index.html and breaks /_next/static/*. Delete or use next.config.js redirects.',
  ],
];

let failed = false;
for (const [abs, reason] of forbidden) {
  if (fs.existsSync(abs)) {
    const rel = path.relative(root, abs);
    console.error(`\n✖ ${rel}\n  ${reason}\n`);
    failed = true;
  }
}

if (failed) {
  console.error('Remove these files, commit, and redeploy. See netlify.toml header comments.\n');
  process.exit(1);
}
