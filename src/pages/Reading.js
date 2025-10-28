  import React, { useState, useEffect } from 'react';
  import WideContainer from '../components/containers/WideContainer';
  import BooksByYear from '../components/BooksByYear';
  import { getAllBooks } from '../lib/books';

  const Reading = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const booksData = getAllBooks();
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
              <div className="text-center">
                <p className="text-text-secondary">Loading books...</p>
              </div>
          </WideContainer>
        </div>
      );
    }

    return (
      <div className="pt-32 pb-16">
          <WideContainer>
            <div className="border-b text-muted mb-6">
              <h1 className="font-serif text-text-dark mb-4">Reading</h1>
              <p className="text-text-secondary mb-3">
                I started tracking what I read around 2020. Recommendations are always welcome.
              </p>
            </div>
            <BooksByYear books={books} />
        </WideContainer>
      </div>
    );
  };

  export default Reading;