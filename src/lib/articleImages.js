/**
 * Generic automatic image import system for articles
 * 
 * This automatically imports all images from article image folders
 * and creates a mapping that can be used in markdown files.
 * 
 * Usage in markdown:
 *   ![Alt text](image-filename-without-extension)
 * 
 * Example:
 *   ![Customer Interviews](Platform asset 1)
 */

/**
 * Helper function to create an image map from a require.context
 * Maps filenames (without extension) to imported image modules
 */
function createImageMap(requireContext) {
  const imageMap = {};
  const keys = requireContext.keys();
  
  keys.forEach((key) => {
    // Extract filename without extension and path
    // Example: "./Platform asset 1.webp" -> "Platform asset 1"
    const filename = key
      .replace(/^\.\//, '') // Remove leading ./
      .replace(/\.(png|jpg|jpeg|gif|webp)$/i, ''); // Remove extension
    
    imageMap[filename] = requireContext(key);
  });
  
  return imageMap;
}

/**
 * Map article slugs to their image folder paths
 * Add new articles here as needed
 * 
 * IMPORTANT: require.context must be called at module level, not inside functions
 */

// Import images for Kota 2025 article
// require.context must be called at module level
const kota2025ImagesContext = require.context(
  '../articles/Kota 2025 assets',
  false,
  /\.(png|jpe?g|gif|webp)$/i
);

// Create image map for Kota 2025
const kota2025Images = createImageMap(kota2025ImagesContext);

// Debug: log available images
console.log('Kota 2025 images loaded:', Object.keys(kota2025Images));

/**
 * Map article slugs to their image maps
 * Add new articles here as needed
 */
const articleImageMaps = {
  'kota-2025-in-review': kota2025Images,
  // Add more articles here:
  // 'another-article-slug': anotherArticleImages,
  // 'creative-angst': creativeAngstImages,
};

/**
 * Get image map for a specific article slug
 * @param {string} slug - Article slug
 * @returns {Object} Image map object (filename -> imported image)
 */
export function getArticleImages(slug) {
  return articleImageMaps[slug] || {};
}

// Legacy export for backward compatibility
export { kota2025Images };
