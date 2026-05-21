# Play — personal explorations

Add images, GIFs, or other bundled static files here. They are processed by the Next.js bundler (hashed URLs in production).

## Use in `Play.js`

Import and pass the URL into your grid (with [`staticAssetUrl`](../../lib/staticAssetUrl.js) if the import might be an object):

```js
import pic from '../assets/play/my-shot.webp';
import { staticAssetUrl } from '../lib/staticAssetUrl';

// In PLAY_ITEMS or JSX:
{ src: staticAssetUrl(pic), width: 1600, height: 900 }
```

## vs `public/play/`

| Location | Best for |
|----------|----------|
| **`src/assets/play/`** | Images you want versioned with the repo; Next bundles them. |
| **`public/play/`** | Large video/MP4, huge GIFs, or URLs you want as plain paths (`/play/file.mp4`) without importing. |

You can mix both on the Play page.
