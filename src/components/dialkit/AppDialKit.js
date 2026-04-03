'use client';

import { DialRoot } from 'dialkit';
import 'dialkit/styles.css';

/**
 * Optional global DialKit shell (popover). Not mounted in `app/layout.js` by default.
 * To use locally: import and render `<AppDialKit />` next to `{children}` in the root layout,
 * then call `useDialKit` from client pages that register panels.
 */
export default function AppDialKit() {
  return <DialRoot position="top-right" defaultOpen={false} />;
}
