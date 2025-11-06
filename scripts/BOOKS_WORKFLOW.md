# Books Workflow Guide

This guide explains the complete process of syncing books from Notion and publishing them on your portfolio.

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│  SYNC & PUBLISH BOOKS - QUICK STEPS                     │
├─────────────────────────────────────────────────────────┤
│  1. Fetch from Notion                                   │
│     → node scripts/fetch-books.js                       │
│                                                         │
│  2. Check missing covers                                │
│     → node scripts/get-books-without-covers.js          │
│                                                         │
│  3. Add cover images                                    │
│     → Save to public/book-covers/{bookId}.jpg           │
│                                                         │
│  4. Update books.json                                   │
│     → node scripts/update-manual-covers.js              │
│                                                         
│  5. Build & deploy                                      │
│     → npm run build                                     │
└─────────────────────────────────────────────────────────┘
```

## Overview

Your books are stored in a Notion database and synced to your local `books.json` file. Book covers are downloaded from external APIs (like Open Library) and saved locally to prevent broken images when Notion URLs expire.

---

## Step-by-Step Workflow

### 1. Fetch Books from Notion

Run the fetch script to sync your latest books from Notion:

```bash
node scripts/fetch-books.js
```

**What this does:**
- Fetches all books from your Notion database
- Downloads cover images from external APIs (Open Library, etc.) while URLs are still valid
- Saves covers locally to `public/book-covers/` with format: `{bookId}.jpg`
- Updates `src/data/books.json` with all book data
- Shows you which books don't have covers yet

**After running, you'll see:**
- Total number of books fetched
- List of books without covers (if any)
- Instructions on what to do next

---

### 2. Check for Books Without Covers

If you see books without covers after fetching, get the details:

```bash
node scripts/get-books-without-covers.js
```

**What this does:**
- Lists all books that don't have cover images
- Shows book details (title, author, year, ID)
- Outputs IDs formatted for easy copying

**To see only the latest N books:**
```bash
node scripts/get-books-without-covers.js 5
```

---

### 3. Add Missing Cover Images

For books without covers, you need to manually add the cover images:

1. **Find the book cover image** (from Open Library, Google Books, Amazon, etc.)
2. **Save it to** `public/book-covers/` with the exact filename format:
   ```
   {bookId}.jpg
   ```
   Or use: `.png`, `.jpeg`, or `.webp`

   **Example:**
   - Book ID: `29a7cb51-b8b6-801c-af6b-d9941e345789`
   - Filename: `29a7cb51-b8b6-801c-af6b-d9941e345789.jpg`

3. **Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`

---

### 4. Update books.json with New Covers

After adding cover images, update the `books.json` file:

```bash
node scripts/update-manual-covers.js
```

**What this does:**
- Scans `public/book-covers/` for images matching book IDs
- Updates `books.json` with the cover image paths
- Shows which books were updated

**Note:** The script automatically checks all books without covers. If you want to check only specific books, add their IDs to the `manualCoverIds` array in the script.

---

### 4.5. Handle Duplicate Books (Optional)

If you have duplicate books (same title and author), you can automatically copy covers from one to the other:

```bash
node scripts/handle-duplicate-covers.js
```

**What this does:**
- Finds all duplicate books (same title + author)
- For duplicates without covers, automatically copies the cover from the duplicate that has one
- Updates `books.json` with the new cover paths
- Saves you from manually adding the same cover multiple times

**Example:** If you have "Brave New World" from 2020 (with cover) and 2025 (without cover), this script will copy the 2020 cover to the 2025 entry automatically.

---

### 5. Build and Deploy

Once all covers are added and `books.json` is updated:

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Deploy** (depending on your hosting setup)

---

## Quick Reference

### Common Commands

```bash
# Fetch latest books from Notion
node scripts/fetch-books.js

# See which books need covers
node scripts/get-books-without-covers.js

# Update books.json after adding covers
node scripts/update-manual-covers.js

# Handle duplicate books (copy covers automatically)
node scripts/handle-duplicate-covers.js

# Create default placeholder covers (optional)
node scripts/create-default-cover.js
```

### File Locations

- **Books data:** `src/data/books.json`
- **Cover images:** `public/book-covers/`
- **Scripts:** `scripts/`

---

## Troubleshooting

### Books show "No cover" after fetching

**Problem:** Notion URLs expire after ~1 hour, so covers can't be downloaded.

**Solution:**
1. Run `fetch-books.js` regularly (daily/weekly) to download covers while URLs are valid
2. Or manually add covers using Step 3 above

### Cover image not showing after adding

**Check:**
1. Filename matches the book ID exactly (case-sensitive)
2. File is in `public/book-covers/` directory
3. File extension is supported (`.jpg`, `.png`, `.jpeg`, `.webp`)
4. Run `update-manual-covers.js` after adding the image

### Notion API errors

**If you see authentication errors:**
1. Check `.env` file has `NOTION_API_KEY` and `NOTION_BOOKS_DATABASE_ID`
2. Verify the Notion integration has access to your database
3. Ensure the database ID is correct

---

## Best Practices

1. **Run `fetch-books.js` regularly** (daily or weekly) to catch new books and download covers before Notion URLs expire
2. **Check for missing covers** after each fetch
3. **Add covers promptly** so your reading page always looks complete
4. **Keep covers organized** - all in `public/book-covers/` with consistent naming

---

## Workflow Summary

```
1. Fetch books          → node scripts/fetch-books.js
2. Check missing covers → node scripts/get-books-without-covers.js
3. Add cover images     → Save to public/book-covers/{bookId}.jpg
4. Update books.json    → node scripts/update-manual-covers.js
4.5. Handle duplicates  → node scripts/handle-duplicate-covers.js (optional)
5. Build & deploy       → npm run build
```

---

## Notes

- Book covers are stored locally to prevent broken images when external URLs expire
- Books are sorted by year (descending) - newest first
- The `fetch-books.js` script checks for existing covers and skips re-downloading them
- Duplicate books (same title + author) can have their covers automatically copied using `handle-duplicate-covers.js`
- All scripts output helpful messages about what they're doing

