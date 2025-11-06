  import React, { useState, useEffect } from 'react';
  import WideContainer from '../components/containers/WideContainer';
  import BooksByYear from '../components/BooksByYear';
  import PageHeader from '../components/PageHeader';
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
            <PageHeader
              title="Reading"
              description="I started tracking what I read around 2020. Recommendations are always welcome."
            />
            <BooksByYear books={books} />
        </WideContainer>
      </div>
    );
  };

  export default Reading;