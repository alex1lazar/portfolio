const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

console.log('🔍 Checking configuration...');
console.log('API Key exists:', !!process.env.NOTION_API_KEY);
console.log('Database ID exists:', !!process.env.NOTION_BOOKS_DATABASE_ID);

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_BOOKS_DATABASE_ID;

// Function to download and save book cover images
async function downloadImage(url, bookId) {
  if (!url) return null;
  
  try {
    console.log(`  📥 Downloading cover for book ${bookId}...`);
    
    // Create book-covers directory if it doesn't exist
    const coversDir = path.join(__dirname, '..', 'public', 'book-covers');
    if (!fs.existsSync(coversDir)) {
      fs.mkdirSync(coversDir, { recursive: true });
    }
    
    // Download the image
    const response = await axios.get(url, {
      responseType: 'stream',
      timeout: 30000, // 30 second timeout
    });
    
    // Determine file extension from content type or URL
    let extension = '.jpg'; // default
    const contentType = response.headers['content-type'];
    if (contentType) {
      if (contentType.includes('png')) extension = '.png';
      else if (contentType.includes('webp')) extension = '.webp';
      else if (contentType.includes('gif')) extension = '.gif';
    }
    
    // Save the image
    const filename = `${bookId}${extension}`;
    const filepath = path.join(coversDir, filename);
    const writer = fs.createWriteStream(filepath);
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`  ✅ Saved cover: ${filename}`);
        resolve(`/book-covers/${filename}`);
      });
      writer.on('error', (error) => {
        console.log(`  ❌ Failed to save cover for ${bookId}:`, error.message);
        reject(error);
      });
    });
    
  } catch (error) {
    console.log(`  ❌ Failed to download cover for ${bookId}:`, error.message);
    return null;
  }
}

async function fetchBooks() {
  try {
    console.log('\n📚 Fetching books from Notion...');
    
    // Query the database using v2 API
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Finished in',
          direction: 'descending',
        },
      ],
    });

    console.log(`Found ${response.results.length} books`);

    const books = await Promise.all(response.results.map(async (page) => {
      const properties = page.properties;
      
      // Extract title
      const title = properties.Title?.title?.[0]?.plain_text || 'Untitled';
      
      // Extract author (multi_select)
      const author = properties.Author?.multi_select?.map(a => a.name).join(', ') || 'Unknown';
      
      // Extract type (select)
      const type = properties['Fiction?']?.select?.name || 'Unknown';
      
      // Extract year (number) - this should work now
      const year = properties['Finished in']?.number || null;
      
      // Extract cover image - try different possible field names
      let coverImageUrl = null;
      
      // Debug: Check what's in the "Files & media" field (only for books with covers)
      if (properties['Files & media']?.files?.length > 0) {
        console.log(`  📁 Files & media field:`, properties['Files & media']);
      }
      
      // Method 1: Check for a "Cover" or "Image" field (file upload)
      if (properties.Cover?.files?.[0]?.file?.url) {
        coverImageUrl = properties.Cover.files[0].file.url;
        console.log(`  ✅ Found cover in "Cover" field: ${coverImageUrl}`);
      } else if (properties.Image?.files?.[0]?.file?.url) {
        coverImageUrl = properties.Image.files[0].file.url;
        console.log(`  ✅ Found cover in "Image" field: ${coverImageUrl}`);
      } else if (properties['Book Cover']?.files?.[0]?.file?.url) {
        coverImageUrl = properties['Book Cover'].files[0].file.url;
        console.log(`  ✅ Found cover in "Book Cover" field: ${coverImageUrl}`);
      } else if (properties['Files & media']?.files?.[0]?.file?.url) {
        coverImageUrl = properties['Files & media'].files[0].file.url;
        console.log(`  ✅ Found cover in "Files & media" field: ${coverImageUrl}`);
      }
      
      // Method 2: Check for external URL field
      if (!coverImageUrl && properties['Cover URL']?.url) {
        coverImageUrl = properties['Cover URL'].url;
        console.log(`  ✅ Found cover in "Cover URL" field: ${coverImageUrl}`);
      }
      
      // Method 3: Check for rich text with URL
      if (!coverImageUrl && properties['Cover']?.rich_text?.[0]?.plain_text) {
        const url = properties['Cover'].rich_text[0].plain_text;
        if (url.startsWith('http')) {
          coverImageUrl = url;
          console.log(`  ✅ Found cover in "Cover" rich text: ${coverImageUrl}`);
        }
      }
      
      // Download the cover image if found
      let coverImage = null;
      if (coverImageUrl) {
        coverImage = await downloadImage(coverImageUrl, page.id);
      }
      
      if (!coverImage) {
        console.log(`  ❌ No cover image found for "${title}"`);
      }
      
      console.log(`  - ${title} by ${author} (${year}) - Cover: ${coverImage ? '✅' : '❌'}`);
      
      return {
        id: page.id,
        title,
        author,
        type,
        year,
        coverImage,
      };
    }));

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write books to JSON file
    const outputPath = path.join(dataDir, 'books.json');
    fs.writeFileSync(outputPath, JSON.stringify(books, null, 2));

    console.log(`\n✅ Successfully fetched ${books.length} books!`);
    console.log(`📁 Saved to: ${outputPath}`);
  } catch (error) {
    console.error('\n❌ Error fetching books:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'object_not_found') {
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Make sure the integration is connected to the database');
      console.error('   2. Verify the database ID is correct');
      console.error('   3. Check that the API key has proper permissions');
    }
    
    // Try alternative API method if the first one fails
    if (error.message.includes('not a function')) {
      console.error('\n🔄 Trying alternative API method...');
      try {
        const response = await notion.databases.query({
          database_id: databaseId,
        });
        console.log('Alternative method worked!');
      } catch (altError) {
        console.error('Alternative method also failed:', altError.message);
      }
    }
    
    process.exit(1);
  }
}

fetchBooks();