import React, { useState, useEffect } from 'react';
import NarrowContainer from '../components/containers/NarrowContainer';
import WideContainer from '../components/containers/WideContainer';
import BooksByYear from '../components/BooksByYear';
import { getAllBooks } from '../lib/books';

const Reading = () => {
  console.log('Reading component loaded - Books version');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log('Fetching books...');
        const booksData = getAllBooks();
        console.log('Books fetched:', booksData);
        setBooks(booksData);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="pt-32">
        <WideContainer>
          <NarrowContainer>
            <div className="text-center">
              <p className="text-text-secondary">Loading books...</p>
            </div>
          </NarrowContainer>
        </WideContainer>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <WideContainer>
        <NarrowContainer>
          <div className="border-b text-muted mb-6">
            <h1 className="text-4xl font-serif text-text-dark mb-4">Books</h1>
            <p className="text-text-secondary mb-3">
              I started tracking what I read around 2020. Recommendations are always welcome.
            </p>
          </div>
          <BooksByYear books={books} />
        </NarrowContainer>
      </WideContainer>
    </div>
  );
};

export default Reading;