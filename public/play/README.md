# Play media (`public/play`)

## Videos must be web-safe H.264

Browsers only play **standard AVC profiles** (e.g. Baseline / Main / High with **4:2:0** chroma). Exports from some tools can produce a **non-standard `avcC` profile byte** (anything that isn’t a normal Baseline/Main/High encode). Those files may:

- show a **blank** tile, or
- fire **`error` on `<video>`** (check DevTools → Console / Network).

**Fix:** re-encode for the web, then replace the file here.

### ffmpeg (recommended)

```bash
ffmpeg -i "input.mp4" \
  -an \
  -c:v libx264 \
  -profile:v high \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "output-web.mp4"
```

Omit `-an` if you need sound (and use a normal AAC track). `-movflags +faststart` puts metadata at the start so playback can start before the full file downloads.

### Filenames

Avoid spaces and parentheses in filenames when possible (e.g. `receipt-scanning.mp4`). It reduces edge cases with servers and CDNs.
