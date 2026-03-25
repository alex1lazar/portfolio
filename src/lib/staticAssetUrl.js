/**
 * Next.js / Turbopack static imports for images may be a string URL or
 * `{ src, width, height, ... }`. Use this for `<img src>` and similar.
 */
export function staticAssetUrl(maybe) {
  if (maybe == null) return '';
  if (typeof maybe === 'string') return maybe;
  if (typeof maybe === 'number') return String(maybe);
  if (typeof maybe === 'object') {
    if (typeof maybe.src === 'string') return maybe.src;
    if (maybe.default != null) return staticAssetUrl(maybe.default);
  }
  return '';
}
