import React from 'react';
import { staticAssetUrl } from '../lib/staticAssetUrl';

function resolveRowImageSrc(img, imageBaseUrl, imageMap) {
  if (!img?.file) return '';
  const mapped = imageMap?.[img.file];
  if (mapped != null) {
    return staticAssetUrl(mapped);
  }
  const base = imageBaseUrl || '';
  return base ? `${base.replace(/\/$/, '')}/${img.file}` : '';
}

/**
 * Renders a row-controlled gallery where each row is either:
 * - `single`: one full-width image
 * - `double`: two side-by-side images (stacked on mobile)
 *
 * @param {Object} props
 * @param {Array<{layout:'single'|'double', images:Array<{file:string, alt?:string}>}>} props.rows
 * @param {string} [props.imageBaseUrl] Prefix for image filenames (e.g. `/projects/kota/detail-grid`)
 * @param {Record<string, string>} [props.imageMap] Optional map of filename → resolved URL (e.g. webpack imports)
 */
export default function ProjectImageRowGrid({ rows = [], imageBaseUrl = '', imageMap }) {
  return (
    <div className="w-full space-y-6">
      {rows.map((row, idx) => {
        if (!row || (row.layout !== 'single' && row.layout !== 'double')) return null;
        const layout = row.layout;

        const imgs = Array.isArray(row.images) ? row.images : [];

        if (layout === 'single') {
          const img = imgs[0];
          if (!img?.file) return null;

          return (
            <div key={`row-${idx}`} className="w-full">
              <div className="relative w-full" style={{ aspectRatio: '915/518' }}>
                <img
                  src={resolveRowImageSrc(img, imageBaseUrl, imageMap)}
                  alt={img.alt || ''}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          );
        }

        // double
        const left = imgs[0];
        const right = imgs[1];
        if (!left?.file || !right?.file) return null;

        return (
          <div
            key={`row-${idx}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
          >
            {[left, right].map((img, imgIdx) => (
              <div key={`row-${idx}-img-${imgIdx}`} className="relative w-full" style={{ aspectRatio: '915/518' }}>
                <img
                  src={resolveRowImageSrc(img, imageBaseUrl, imageMap)}
                  alt={img.alt || ''}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

