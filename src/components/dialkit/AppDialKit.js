'use client';

import { DialRoot } from 'dialkit';
import 'dialkit/styles.css';

/**
 * Global DialKit shell (popover). Panels register via useDialKit from any client page.
 */
export default function AppDialKit() {
  return <DialRoot position="top-right" defaultOpen={false} />;
}
