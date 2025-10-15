const fs = require('fs');
const path = require('path');

// Create a simple SVG book cover placeholder
function createDefaultCover(bookId) {
  const svg = `
<svg width="200" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Book cover background -->
  <rect width="200" height="300" fill="url(#bookGradient)" stroke="#cbd5e1" stroke-width="1"/>
  
  <!-- Book spine -->
  <rect x="0" y="0" width="8" height="300" fill="#475569"/>
  
  <!-- Book title area -->
  <rect x="20" y="100" width="160" height="100" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2"/>
  
  <!-- Book icon -->
  <g transform="translate(100, 120)">
    <rect x="-20" y="-15" width="40" height="30" fill="#64748b" rx="2"/>
    <rect x="-18" y="-13" width="36" height="26" fill="#f1f5f9" rx="1"/>
    <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#64748b" stroke-width="1"/>
    <line x1="-10" y1="0" x2="10" y2="0" stroke="#64748b" stroke-width="1"/>
    <line x1="-10" y1="5" x2="10" y2="5" stroke="#64748b" stroke-width="1"/>
  </g>
  
  <!-- "No Cover" text -->
  <text x="100" y="250" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#64748b">No Cover Available</text>
</svg>`;

  return svg;
}

// Create book-covers directory if it doesn't exist
const coversDir = path.join(__dirname, '..', 'public', 'book-covers');
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

// Read books.json to find books without covers
const booksPath = path.join(__dirname, '..', 'src', 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

console.log('📚 Creating default covers for books without covers...\n');

let updatedCount = 0;
const updatedBooks = books.map(book => {
  if (book.coverImage === null) {
    console.log(`  📖 Creating default cover for: "${book.title}" by ${book.author}`);
    
    // Create SVG file
    const svgContent = createDefaultCover(book.id);
    const svgPath = path.join(coversDir, `${book.id}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    
    // Update the book to use the default cover
    book.coverImage = `/book-covers/${book.id}.svg`;
    updatedCount++;
  }
  return book;
});

// Write updated books.json
fs.writeFileSync(booksPath, JSON.stringify(updatedBooks, null, 2));

console.log(`\n✅ Created ${updatedCount} default book covers!`);
console.log('📁 All covers are now stored locally in public/book-covers/');
console.log('🎨 Default covers use a clean, minimal design that matches your site aesthetic');
