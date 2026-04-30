# Explore pages

This folder contains experimental and exploratory UIs. Routes live under the **App Router** at `src/app/explore/[name]/page.js`, which composes view components from here and `src/components/explore/`.

## Structure

```
src/
├── app/
│   └── explore/
│       └── [name]/
│           └── page.js          # Wires a view to the URL
├── views/
│   └── explore/
│       └── ContentWheel.js    # (example) full-page view
└── components/
    └── explore/
        └── ContentWheel/      # Exploration-specific building blocks
```

## Current explorations

### ContentWheel

- **Route**: `/explore/content-wheel`
- **View**: `src/views/explore/ContentWheel.js`
- **Components**: `src/components/explore/ContentWheel/`

## Adding a new exploration

1. Add a **kebab-case** name under `src/app/explore/[name]/` (or extend `generateStaticParams` in that segment if you use SSG for names).
2. Build the main view in `src/views/explore/` and/or `src/components/explore/<Name>/`.
3. Use **kebab-case** in the URL (e.g. `content-wheel`).

## Naming

- **Components**: PascalCase
- **URL segment**: kebab-case
