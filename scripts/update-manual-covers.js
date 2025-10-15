const fs = require('fs');
const path = require('path');

// Read the existing books.json
const booksPath = path.join(__dirname, '..', 'src', 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// List of book IDs that need manual covers
const manualCoverIds = [
  '3acfdc41-ae56-4c10-a318-8dfca4382746',
  '10a4c4f8-d9ee-4589-ab72-1796e18d2578',
  'd526ccbf-5f07-467e-9a9b-db17063b153a',
  '424f8736-db5a-46b9-9be1-199b5dbbf913',
  'f4512aab-fbdd-4373-b60f-8323439e0efe',
  'ce63dff4-9f00-4dd5-9e46-2f1c8443f5b1',
  'df60e080-cdc2-4a46-8109-d0a18ebe33c5',
  '5aea2b33-0ccb-41bc-95a9-1630b23b09a7',
  'd1cd8504-5a97-446b-9463-b6ab87e1a9b2',
  '72ac545f-8029-4446-b69e-fa1aad4b5565',
  'a80da972-18c2-44df-a21e-cebad698c427',
  '4eb8e32b-1112-43c7-bbc1-a3e609dd203d',
  'dbb046b5-60a6-4fe9-8d09-f451f507c129',
  'fc0a890b-722f-47e1-b59d-c71255fc86b8',
  '1c285d56-0dbe-4790-9238-6856066161d2',
  '7a3427dd-008c-458a-8aef-93877f3bfe44',
  'f7aa02cc-6962-41be-9371-de230693155a',
  'ecd84850-681c-480a-9dfc-076a64b24520',
  '0a359f4e-f99d-4734-9ebd-60e7f383267e',
  'cf9d259d-b3ad-4567-b0c2-7054ddd9ed0e',
  'b4ece158-03eb-4ac8-96d7-fbf593398802',
  '1d85ff76-79a1-4d31-bd3a-4b1c46523e27',
  '413d6d20-e9bb-46c9-9e5f-402d5ad7df4d'
];

console.log('🔍 Checking for manually added book covers...\n');

let updatedCount = 0;
const coversDir = path.join(__dirname, '..', 'public', 'book-covers');

const updatedBooks = books.map(book => {
  if (manualCoverIds.includes(book.id) && book.coverImage === null) {
    // Check if the cover image file exists
    const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    let foundExtension = null;
    
    for (const ext of possibleExtensions) {
      const imagePath = path.join(coversDir, `${book.id}${ext}`);
      if (fs.existsSync(imagePath)) {
        foundExtension = ext;
        break;
      }
    }
    
    if (foundExtension) {
      console.log(`  ✅ Found cover for: "${book.title}" by ${book.author}`);
      book.coverImage = `/book-covers/${book.id}${foundExtension}`;
      updatedCount++;
    } else {
      console.log(`  ❌ Missing cover for: "${book.title}" by ${book.author}`);
    }
  }
  return book;
});

// Write updated books.json
fs.writeFileSync(booksPath, JSON.stringify(updatedBooks, null, 2));

console.log(`\n✅ Updated ${updatedCount} books with manual covers!`);
console.log('📁 Make sure your cover images are saved in public/book-covers/ with the correct filenames');
