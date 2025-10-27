# Project Images Setup Guide

## Folder Structure Created

I've created three folders for your project slider images:

```
src/assets/
├── hero/          (existing - used as default in Slider)
├── kota/          (new - for Kota project)
├── advisable/     (new - for Advisable project)
└── carturesti/    (new - for Carturesti project)
```

## How to Add Your Images

### Step 1: Add Images to Folders

Add your project images to each respective folder. Recommended naming:
- `Slide 1.png`, `Slide 2.png`, etc. (consistent with hero folder)
- Or any naming convention you prefer

### Step 2: Update Work.js

Once you've added images, uncomment and update the imports in `Work.js`:

**Example for Kota project:**
```javascript
// Uncomment these lines and adjust based on your actual images:
import kotaImg1 from '../assets/kota/Slide 1.png';
import kotaImg2 from '../assets/kota/Slide 2.png';
import kotaImg3 from '../assets/kota/Slide 3.png';
// ... add more imports as needed

// Create the array:
const kotaSlides = [kotaImg1, kotaImg2, kotaImg3];
```

**Repeat for Advisable and Carturesti projects.**

### Step 3: Pass Images to Slider

Update each Slider component to use the specific image array:

```javascript
<Slider images={kotaSlides} />
<Slider images={advisableSlides} />
<Slider images={carturestiSlides} />
```

## Quick Reference

Current state in Work.js:
- ✅ Folders created
- ✅ Template imports added (commented out)
- ✅ Template arrays added (commented out)
- ⏳ Waiting for you to add images
- ⏳ Then uncomment and pass to `<Slider images={...} />`

## Notes

- Each project can have a different number of slides
- The Slider component automatically adapts to the number of images
- If no images prop is passed, Slider uses the default hero images
- Supported formats: .png, .jpg, .jpeg, .gif, .webp

