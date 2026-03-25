# Explore Pages

This folder contains experimental and exploratory pages that showcase different design concepts and interactions.

## Structure

Each exploration should be organized as follows:

```
src/
├── pages/
│   └── explore/
│       └── [ExplorationName].js          # Main page component
└── components/
    └── explore/
        └── [ExplorationName]/            # Exploration-specific components
            ├── [Component1].js
            ├── [Component2].js
            └── ...
```

## Current Explorations

### ContentWheel
- **Route**: `/explore/content-wheel` (or `/explore/:name` with name="content-wheel")
- **Location**: `src/pages/explore/ContentWheel.js`
- **Components**: `src/components/explore/ContentWheel/`
  - `ContentWheelGrid.js` - Main circular grid layout
  - `ContentWheelItem.js` - Individual item component

## Adding a New Exploration

1. Create a new page component in `src/pages/explore/[YourExploration].js`
2. Create a corresponding folder in `src/components/explore/[YourExploration]/` for exploration-specific components
3. Add the route to `src/App.js` using the pattern `/explore/:name`
4. Update this README with your new exploration

## Naming Convention

- Use PascalCase for component names
- Use kebab-case for route names (e.g., `content-wheel`, `interactive-grid`)
- Keep exploration names descriptive and unique

