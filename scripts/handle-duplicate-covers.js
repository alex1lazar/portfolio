const fs = require('fs');
const path = require('path');

// Read books.json
const booksPath = path.join(__dirname, '..', 'src', 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Find duplicates by title and author
function findDuplicates(books) {
  const duplicates = {};
  
  books.forEach(book => {
    const key = `${book.title.toLowerCase()}|${book.author.toLowerCase()}`;
    if (!duplicates[key]) {
      duplicates[key] = [];
    }
    duplicates[key].push(book);
  });
  
  // Return only entries with more than one book
  return Object.values(duplicates).filter(group => group.length > 1);
}

// Copy cover image file from source to destination
function copyCoverFile(sourceId, destId, sourcePath) {
  const coversDir = path.join(__dirname, '..', 'public', 'book-covers');
  
  // Get the extension from source path
  const extension = path.extname(sourcePath);
  const sourceFile = path.join(coversDir, path.basename(sourcePath));
  const destFile = path.join(coversDir, `${destId}${extension}`);
  
  if (!fs.existsSync(sourceFile)) {
    console.log(`  ⚠️  Source cover file not found: ${sourceFile}`);
    return false;
  }
  
  try {
    fs.copyFileSync(sourceFile, destFile);
    console.log(`  ✅ Copied cover: ${path.basename(sourceFile)} → ${path.basename(destFile)}`);
    return true;
  } catch (error) {
    console.log(`  ❌ Failed to copy cover: ${error.message}`);
    return false;
  }
}

console.log('🔍 Finding duplicate books...\n');

const duplicateGroups = findDuplicates(books);
let updatedCount = 0;

if (duplicateGroups.length === 0) {
  console.log('✅ No duplicate books found!');
  process.exit(0);
}

console.log(`Found ${duplicateGroups.length} duplicate book group(s):\n`);

duplicateGroups.forEach((group, groupIndex) => {
  const title = group[0].title;
  const author = group[0].author;
  
  console.log(`${groupIndex + 1}. "${title}" by ${author} (${group.length} copies)`);
  
  // Find which books have covers and which don't
  const withCovers = group.filter(book => book.coverImage);
  const withoutCovers = group.filter(book => !book.coverImage);
  
  if (withCovers.length === 0) {
    console.log(`   ⚠️  None of the duplicates have covers\n`);
    return;
  }
  
  if (withoutCovers.length === 0) {
    console.log(`   ✅ All duplicates already have covers\n`);
    return;
  }
  
  // Use the first book with a cover as the source
  const sourceBook = withCovers[0];
  console.log(`   📖 Source cover: ${sourceBook.id} (${sourceBook.year})`);
  console.log(`   📋 Cover path: ${sourceBook.coverImage}`);
  
  // Copy cover to all books without covers
  withoutCovers.forEach(book => {
    console.log(`   📝 Copying to: ${book.id} (${book.year})`);
    const copied = copyCoverFile(sourceBook.id, book.id, sourceBook.coverImage);
    
    if (copied) {
      // Update the book's coverImage path
      book.coverImage = `/book-covers/${book.id}${path.extname(sourceBook.coverImage)}`;
      updatedCount++;
    }
  });
  
  console.log('');
});

if (updatedCount > 0) {
  // Write updated books.json
  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\n✅ Updated ${updatedCount} duplicate book(s) with covers!`);
  console.log(`📁 Updated: ${booksPath}`);
} else {
  console.log(`\n✅ No updates needed - all duplicates already have covers or no source covers found.`);
}

