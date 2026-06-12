'use client';

import { useEffect, useState } from 'react';

const DEFAULT_SHELF_ROWS = {
  booksPerRowLg: 5,
  booksPerRowMd: 4,
  booksPerRowSm: 3,
  booksPerRowXs: 2,
};

function getBooksPerRow(width, shelfConfig = DEFAULT_SHELF_ROWS) {
  if (width >= 1024) return Math.max(1, Math.round(shelfConfig.booksPerRowLg));
  if (width >= 768) return Math.max(1, Math.round(shelfConfig.booksPerRowMd));
  if (width >= 640) return Math.max(1, Math.round(shelfConfig.booksPerRowSm));
  return Math.max(1, Math.round(shelfConfig.booksPerRowXs));
}

export function useBooksPerRow(shelfConfig = DEFAULT_SHELF_ROWS) {
  const [booksPerRow, setBooksPerRow] = useState(
    () => getBooksPerRow(typeof window !== 'undefined' ? window.innerWidth : 1024, shelfConfig)
  );

  useEffect(() => {
    const update = () => setBooksPerRow(getBooksPerRow(window.innerWidth, shelfConfig));

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [
    shelfConfig.booksPerRowLg,
    shelfConfig.booksPerRowMd,
    shelfConfig.booksPerRowSm,
    shelfConfig.booksPerRowXs,
  ]);

  return booksPerRow;
}

export function chunkBooks(books, perRow) {
  const rows = [];
  for (let i = 0; i < books.length; i += perRow) {
    rows.push(books.slice(i, i + perRow));
  }
  return rows;
}
