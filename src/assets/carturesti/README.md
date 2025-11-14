# Carturesti Case Study Images

## Folder Structure

```
carturesti/
├── problems/     # Screenshots showing website issues/problems
├── solutions/    # Screenshots of the mobile app solution designs
└── README.md     # This file
```

## How to Add Images

### Step 1: Add Your Images

1. **Problem Images**: Add all your problem screenshots to `problems/` folder
2. **Solution Images**: Add all your solution screenshots to `solutions/` folder

### Step 2: Naming Convention

Name your images with numbers to maintain order:
- `1.png`, `2.png`, `3.png`, ... (recommended)
- OR `Problem 1.png`, `Problem 2.png`, ... (for problems)
- OR `Solution 1.png`, `Solution 2.png`, ... (for solutions)
- OR any naming that includes numbers (e.g., `image-01.png`, `screenshot_1.png`)

The images will be automatically sorted by the number in the filename.

### Step 3: Supported Formats

- `.png` (recommended)
- `.jpg` / `.jpeg`
- `.gif`
- `.webp`

### Step 4: Image Count

- **Problems**: Add all 30+ problem screenshots to `problems/` folder
- **Solutions**: Add all 30+ solution screenshots to `solutions/` folder

The system will automatically import ALL images from each folder, so you don't need to manually import each one!

## Customizing Captions

If you want to customize captions for specific images, you can edit `src/lib/carturestiImages.js` and modify the `formatImagesForSlider` function, or update the arrays directly in `CarturestiCaseStudy.js`.

## Example

```
problems/
├── 1.png          # First problem screenshot
├── 2.png          # Second problem screenshot
├── 3.png          # Third problem screenshot
└── ...            # Continue numbering

solutions/
├── 1.png          # First solution screenshot
├── 2.png          # Second solution screenshot
├── 3.png          # Third solution screenshot
└── ...            # Continue numbering
```

Once you add the images, they'll automatically appear in the case study sliders!

