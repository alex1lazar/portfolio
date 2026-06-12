'use client';

import React, { useMemo } from 'react';
import BookCover from './BookCover';
import Shelf from './Shelf';
import { chunkBooks, useBooksPerRow } from './useBooksPerRow';

function BooksShelfView({ books, config }) {
  const shelf = config?.shelf;
  const booksPerRow = useBooksPerRow(shelf);
  const booksWithCovers = useMemo(
    () => books.filter((b) => b.coverImage),
    [books]
  );
  const rows = useMemo(
    () => chunkBooks(booksWithCovers, booksPerRow),
    [booksWithCovers, booksPerRow]
  );

  if (rows.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No book covers found.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: shelf?.rowGap ?? 40 }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div
            className="flex items-end"
            style={{ gap: shelf?.bookGap ?? 12 }}
          >
            {row.map((book) => (
              <div
                key={book.id}
                className="min-w-0 flex-1"
                style={{ maxWidth: shelf?.coverMaxWidth ?? 160 }}
              >
                <BookCover
                  book={book}
                  naturalHeight
                  className="w-full drop-shadow-md"
                />
              </div>
            ))}
          </div>
          <Shelf className="mt-0" />
        </div>
      ))}
    </div>
  );
}

export default BooksShelfView;
