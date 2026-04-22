import picksData from '../data/picks.json';

/**
 * `publishedAt` in JSON is optional (e.g. true original release date). If omitted, it is set at
 * read time to `addedAt` — the day you add the link is treated as “published” for display logic.
 * @param {object} raw
 */
function normalizePick(raw) {
  const addedAt = raw.addedAt ?? '';
  const publishedAt = raw.publishedAt ?? addedAt;
  return {
    ...raw,
    addedAt,
    publishedAt,
  };
}

/**
 * Curated external links. Items in `picks.json` need not include `publishedAt`; callers always
 * receive it via {@link normalizePick}.
 * @returns {Array<{
 *   id: string,
 *   url: string,
 *   title: string,
 *   author?: string,
 *   note?: string,
 *   addedAt: string,
 *   publishedAt: string
 * }>}
 */
export function getAllPicks() {
  const list = Array.isArray(picksData)
    ? picksData.map((p) => normalizePick(p))
    : [];

  return list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
}
