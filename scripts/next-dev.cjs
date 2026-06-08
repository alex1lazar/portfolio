#!/usr/bin/env node
'use strict';

/**
 * Dev entry that calls nextDev via require() instead of the CLI's dynamic import().
 * Fixes "mod.nextDev is not a function" when node_modules/next is corrupted or
 * when import() interop fails on some Node setups.
 */
const { nextDev } = require('next/dist/cli/next-dev.js');

if (typeof nextDev !== 'function') {
  console.error(
    'Next.js dev CLI is broken. Try:\n' +
      '  rm -rf node_modules .next && npm install\n' +
      '  nvm use   # project targets Node 22 (.nvmrc)'
  );
  process.exit(1);
}

const port = Number(process.env.PORT) || 3000;
const portSource = process.env.PORT ? 'env' : 'default';

if (process.env.NODE_ENV === 'production') {
  delete process.env.NODE_ENV;
}

nextDev(
  {
    disableSourceMaps: false,
    port,
    serverFastRefresh: true,
  },
  portSource,
  process.cwd()
).catch((err) => {
  console.error(err);
  process.exit(1);
});
