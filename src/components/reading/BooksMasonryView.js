'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import BookCover from './BookCover';

const DEFAULT_BREAKPOINT_COLS = {
  default: 4,
  900: 3,
  600: 2,
  400: 1,
};

function BooksMasonryView({ books, config }) {
  const masonry = config?.masonry;
  const booksWithCovers = books.filter((b) => b.coverImage);
  const breakpointCols = masonry?.breakpointCols ?? DEFAULT_BREAKPOINT_COLS;
  const gutter = masonry?.gutter ?? 12;
  const tileGap = masonry?.tileGap ?? 12;

  if (booksWithCovers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No book covers found.</p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointCols}
      className="flex w-auto items-start"
      style={{ marginLeft: -gutter }}
      columnClassName="bg-clip-padding"
      columnAttrs={{ style: { paddingLeft: gutter } }}
    >
      {booksWithCovers.map((book) => (
        <div key={book.id} style={{ marginBottom: tileGap }}>
          <BookCover book={book} naturalHeight className="w-full" />
        </div>
      ))}
    </Masonry>
  );
}

export default BooksMasonryView;
