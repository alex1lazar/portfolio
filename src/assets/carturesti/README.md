# Carturesti Case Study - Complete Guide

## Overview

This case study uses a **Notion → Markdown → Code** workflow. Content is written in Notion, exported as Markdown, and automatically parsed into React components. No hardcoded content - everything comes from the markdown file.

## Quick Start: Updating the Case Study

### 1. Edit Content in Notion
- Open your Notion page for the Carturesti case study
- Make your edits (text, formatting, structure)

### 2. Export as Markdown
- In Notion: Click `...` → `Export` → `Markdown`
- Download the `.md` file

### 3. Replace the Markdown File
- Replace `src/assets/carturesti/Carturesti ro.md` with your exported file
- Keep the filename exactly as `Carturesti ro.md`

### 4. Test Your Changes
- Restart dev server or wait for hot reload
- Navigate to `/carturesti` to see your changes

**That's it!** The parser automatically converts your markdown to the case study format.

## Architecture

### File Structure

```
src/
├── assets/carturesti/
│   ├── Carturesti ro.md          # Main markdown content (from Notion)
│   ├── problems/                  # Problem screenshots
│   ├── solutions/                 # Solution screenshots
│   └── README.md                  # This file
├── lib/
│   ├── markdownParser.js          # Parses markdown → React sections
│   └── carturestiImages.js        # Auto-imports images from folders
├── components/
│   └── CaseStudy.js               # Renders case study sections
└── pages/
    └── CaseStudyCarturesti.js     # Main case study page
```

### How It Works

1. **Markdown Parser** (`markdownParser.js`):
   - Reads the markdown file
   - Parses special HTML comments for carousels and overviews
   - Converts markdown syntax to structured sections
   - Generates IDs for headings and carousels (for anchor links)

2. **Image Import** (`carturestiImages.js`):
   - Automatically imports all images from `problems/` and `solutions/` folders
   - Sorts images by number in filename
   - No manual imports needed!

3. **Component Rendering** (`CaseStudy.js`):
   - Renders different section types
   - Handles formatting (bold, italic, links, nested lists)
   - Displays image carousels with navigation

## Adding Images

### Step 1: Add Image Files

Place images in the appropriate folder:
- **Problem images**: `src/assets/carturesti/problems/`
- **Solution images**: `src/assets/carturesti/solutions/`

### Step 2: Naming Convention

Name files with numbers for automatic sorting:
- ✅ `1.png`, `2.png`, `3.png` (recommended)
- ✅ `Problem 01.png`, `Problem 02.png`
- ✅ `Solution 1.png`, `Solution 2.png`
- ✅ Any format with numbers: `image-01.png`, `screenshot_1.png`

**Important**: The system extracts numbers from filenames and sorts automatically.

### Step 3: Supported Formats

- `.png` (recommended)
- `.jpg` / `.jpeg`
- `.gif`
- `.webp`

### Step 4: Automatic Import

Images are **automatically imported** - no code changes needed! Just:
1. Add the image file to the folder
2. Restart the dev server (or wait for hot reload)
3. Images appear in the carousel automatically

## Markdown Format Reference

### Carousels

Use HTML comments to insert image carousels:

```markdown
<!-- CAROUSEL:problems -->

## What's broken in their experience?

I documented 20+ specific UX & UI problems...

<!-- END_CAROUSEL -->
```

**Available carousels:**
- `<!-- CAROUSEL:problems -->` → Shows all images from `problems/` folder
  - Auto-generated ID: `problems-carousel`
- `<!-- CAROUSEL:solutions -->` → Shows all images from `solutions/` folder
  - Auto-generated ID: `solutions-carousel`

The heading above the carousel becomes the carousel title.

### Overview Sections

```markdown
<!-- OVERVIEW -->
<aside>
Title:What you'll learn
- First learning point
- Second learning point
- Third learning point
</aside>
<!-- END_OVERVIEW -->
```

### Anchor Links (Jump to Sections)

You can create links that jump to specific sections:

```markdown
[Jump to Problems](#problems-carousel)
[Jump to Solutions](#solutions-carousel)
[Jump to Heading](#heading-text-becomes-id)
```

**How IDs are generated:**
- **Carousels**: `{carousel-name}-carousel` (e.g., `problems-carousel`, `solutions-carousel`)
- **Headings**: Converted to lowercase, spaces become hyphens (e.g., `What's broken` → `whats-broken`)
- **Subheadings**: Same as headings

**Example:**
```markdown
## Mobile vs web
```
Becomes: `#mobile-vs-web`

### Supported Markdown Features

- **Headings**: `## H2`, `### H3`, etc. (auto-generate IDs for anchor links)
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Links**: 
  - External: `[text](https://url.com)` → Opens in new tab
  - Internal: `[text](#anchor-id)` → Smooth scroll to section
- **Lists**: 
  - Bullet: `- item`
  - Numbered: `1. item`
  - Nested: Indent with 2-4 spaces
- **Paragraphs**: Regular text

## Styling Details

### Lists
- **Top-level**: Filled disc (`disc`), tighter spacing
- **Nested**: Hollow circle (`circle`), indented
- Reduced margin between bullet and text

### Image Carousels
- No captions displayed
- Navigation arrows and image counter (e.g., "1 / 45")
- Responsive with aspect ratio control
- Smooth scrolling with `scroll-mt-32` offset for fixed headers

### Text Formatting
- **Bold**: `**text**` → `<strong>` with `font-medium`
- **Italic**: `*text*` → `<em>` with `italic`
- **Links**: `[text](url)` → Clickable with accent color
- All formatting works together in the same text

## Common Tasks

### Adding a New Image

1. Save image to `problems/` or `solutions/` folder
2. Name it with a number (e.g., `Problem 46.png`)
3. Restart dev server
4. Image automatically appears in carousel

### Updating Content

1. Edit in Notion
2. Export as Markdown
3. Replace `Carturesti ro.md`
4. Changes appear automatically

### Adding Anchor Links

1. Find the section you want to link to:
   - Carousels: Use `#problems-carousel` or `#solutions-carousel`
   - Headings: Convert heading text to ID format (lowercase, hyphens)
2. Add link in markdown: `[Jump there](#section-id)`
3. Link will smooth scroll to that section

### Adding a New Carousel

1. Add images to a new folder (e.g., `src/assets/carturesti/research/`)
2. Update `carturestiImages.js`:
   ```javascript
   const researchImagesContext = require.context(
     '../assets/carturesti/research',
     false,
     /\.(png|jpe?g|gif|webp)$/i
   );
   const researchImages = importAll(researchImagesContext);
   export const researchImagesFormatted = formatImagesForSlider(researchImages, 'Research');
   ```
3. Update `CaseStudyCarturesti.js` to add to `carouselMap`:
   ```javascript
   const carouselMap = {
     'problems': problemImagesFormatted,
     'solutions': solutionImagesFormatted,
     'research': researchImagesFormatted  // Add this
   };
   ```
4. Use in markdown: `<!-- CAROUSEL:research -->`

## Troubleshooting

### Images not appearing?
1. ✅ Check filename has a number (for sorting)
2. ✅ Ensure file is in correct folder (`problems/` or `solutions/`)
3. ✅ Restart dev server
4. ✅ Check browser console for errors
5. ✅ Verify file format is supported (`.png`, `.jpg`, etc.)

### Markdown not parsing correctly?
1. ✅ Check HTML comment syntax: `<!-- CAROUSEL:name -->` (exact format)
2. ✅ Ensure carousel name matches: `problems` or `solutions`
3. ✅ Check markdown file encoding (should be UTF-8)
4. ✅ Verify closing tags: `<!-- END_CAROUSEL -->`, `<!-- END_OVERVIEW -->`

### Formatting not working?
- **Bold**: Use `**text**` (two asterisks)
- **Italic**: Use `*text*` (one asterisk)
- **Links**: Use `[text](url)` format
- **Anchor links**: Use `[text](#id)` format (starts with `#`)

### Anchor links not working?
1. ✅ Check ID format matches (lowercase, hyphens)
2. ✅ Verify section has an ID (carousels and headings auto-generate IDs)
3. ✅ Use exact ID: `#problems-carousel` not `#problems` or `#Problems`

### Build errors?
1. ✅ Check for syntax errors in markdown
2. ✅ Verify all HTML comments are properly closed
3. ✅ Check console for specific error messages

## Current Implementation

- ✅ **Markdown-only**: No hardcoded sections
- ✅ **Auto-import images**: No manual imports needed
- ✅ **Full formatting**: Bold, italic, links, nested lists
- ✅ **Anchor links**: Jump to sections with smooth scroll
- ✅ **Carousels**: Automatic image sliders
- ✅ **Overview sections**: Styled callout boxes
- ✅ **Responsive**: Works on all screen sizes

## Notes

- All content comes from markdown - no hardcoded sections
- Images are automatically imported - no manual imports
- Markdown supports full formatting (bold, italic, links, nested lists)
- Carousels are defined in markdown with HTML comments
- Anchor links enable smooth navigation within the article
- The system is designed for easy Notion → Code workflow
