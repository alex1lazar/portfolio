const fs = require('fs');
const path = require('path');

// Read books.json
const booksPath = path.join(__dirname, '..', 'src', 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Filter books without covers
const booksWithoutCovers = books.filter(book => !book.coverImage);

// Get the number of latest books to show (default: all)
const count = process.argv[2] ? parseInt(process.argv[2]) : booksWithoutCovers.length;

console.log(`\n📚 Books without covers (showing latest ${Math.min(count, booksWithoutCovers.length)}):\n`);

if (booksWithoutCovers.length === 0) {
  console.log('✅ All books have covers!');
} else {
  booksWithoutCovers.slice(0, count).forEach((book, index) => {
    console.log(`${index + 1}. ${book.id}`);
    console.log(`   Title: "${book.title}"`);
    console.log(`   Author: ${book.author}`);
    console.log(`   Year: ${book.year}`);
    console.log(`   Type: ${book.type}\n`);
  });

  // Output just the IDs for easy copying
  console.log('\n📋 IDs to add to manualCoverIds array:');
  const ids = booksWithoutCovers.slice(0, count).map(book => book.id);
  ids.forEach((id, index) => {
    console.log(`  '${id}'${index < ids.length - 1 ? ',' : ''}`);
  });

  console.log(`\n📊 Total books without covers: ${booksWithoutCovers.length}`);
  console.log(`📊 Total books: ${books.length}`);
  console.log(`\n💡 To add these to update-manual-covers.js, copy the IDs above.`);
}

