import booksData from '../data/books.json';

export function getAllBooks() {
  try {
    return booksData || [];
  } catch (error) {
    console.error('Error loading books data:', error);
    return [];
  }
}

export function getBooksByYear(year) {
  return booksData.filter(book => book.year === year);
}

export function getBooksByType(type) {
  return booksData.filter(book => book.type === type);
}