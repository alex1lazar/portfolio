'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Clears inline overflow locks from drawers/modals on route change.
 * Prevents body scroll from staying disabled after client-side navigation in dev.
 */
export default function BodyScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [pathname]);

  return null;
}
