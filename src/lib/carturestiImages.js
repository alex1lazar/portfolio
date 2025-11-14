// Helper function to import all images from a folder dynamically
// This uses webpack's require.context to import all images at build time

/**
 * Import all images from a folder and return them sorted by filename
 * @param {Function} requireContext - The require.context() result
 * @returns {Array} Array of imported image modules
 */
function importAll(requireContext) {
  // Get all keys and sort them by number in filename
  const keys = requireContext.keys().sort((a, b) => {
    // Extract numbers from filenames for proper sorting
    // Handles: "1.png", "Problem 1.png", "image-01.png", etc.
    const numA = parseInt(a.match(/\d+/)?.[0] || '999999');
    const numB = parseInt(b.match(/\d+/)?.[0] || '999999');
    if (numA !== numB) {
      return numA - numB;
    }
    // If numbers are equal, sort alphabetically
    return a.localeCompare(b);
  });
  return keys.map(requireContext);
}

// Import all problem images
// Place your problem screenshots in: src/assets/carturesti/problems/
// Name them: 1.png, 2.png, 3.png, ... or Problem 1.png, Problem 2.png, etc.
const problemImagesContext = require.context(
  '../assets/carturesti/problems',
  false,
  /\.(png|jpe?g|gif|webp)$/i
);

// Import all solution images
// Place your solution screenshots in: src/assets/carturesti/solutions/
// Name them: 1.png, 2.png, 3.png, ... or Solution 1.png, Solution 2.png, etc.
const solutionImagesContext = require.context(
  '../assets/carturesti/solutions',
  false,
  /\.(png|jpe?g|gif|webp)$/i
);

// Get all imported images
const problemImages = importAll(problemImagesContext);
const solutionImages = importAll(solutionImagesContext);

/**
 * Convert an array of image imports to the format expected by CaseStudySlider
 * @param {Array} images - Array of imported image modules
 * @param {string} prefix - Prefix for alt text (e.g., "Problem", "Solution")
 * @returns {Array} Array of image objects with src, alt, and optional caption
 */
export function formatImagesForSlider(images, prefix = 'Image') {
  return images.map((img, index) => ({
    src: img,
    alt: `${prefix} ${index + 1}`
    // No caption - captions are not displayed
  }));
}

// Export pre-formatted image arrays
export const problemImagesFormatted = formatImagesForSlider(problemImages, 'Carturesti Problem');
export const solutionImagesFormatted = formatImagesForSlider(solutionImages, 'Carturesti Solution');

// Export raw arrays if needed
export { problemImages, solutionImages };

