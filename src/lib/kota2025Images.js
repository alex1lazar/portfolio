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
 */
const articleImageFolders = {
  'kota-2025-in-review': '../articles/Kota 2025 assets',
  // Add more articles here:
  // 'another-article-slug': '../articles/Another Article assets',
  // 'creative-angst': '../articles/creative-angst/images',
};

/**
 * Cache for loaded image maps
 */
const imageMapCache = {};

/**
 * Get image map for a specific article slug
 * @param {string} slug - Article slug
 * @returns {Object} Image map object (filename -> imported image)
 */
export function getArticleImages(slug) {
  // Return cached map if available
  if (imageMapCache[slug]) {
    return imageMapCache[slug];
  }
  
  // Check if article has an image folder configured
  const folderPath = articleImageFolders[slug];
  if (!folderPath) {
    // No images for this article
    imageMapCache[slug] = {};
    return {};
  }
  
  try {
    // Dynamically import images from the folder
    const imageContext = require.context(
      folderPath,
      false,
      /\.(png|jpe?g|gif|webp)$/i
    );
    
    const imageMap = createImageMap(imageContext);
    imageMapCache[slug] = imageMap;
    return imageMap;
  } catch (error) {
    console.warn(`Failed to load images for article "${slug}":`, error);
    imageMapCache[slug] = {};
    return {};
  }
}

// Legacy export for backward compatibility
export const kota2025Images = getArticleImages('kota-2025-in-review');
