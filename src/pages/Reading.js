import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import NarrowContainer from '../components/containers/NarrowContainer';
import WideContainer from '../components/containers/WideContainer';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const Reading = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*');

        if (error) {
          throw error;
        }

        setBooks(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const groupBooksByYear = () => {
    return books.reduce((acc, book) => {
      const year = book.Finished;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(book);
      return acc;
    }, {});
  };

  if (loading) return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <div>Loading books...</div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );

  if (error) return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <div className="text-red-600">Error: {error}</div>
          <div className="mt-4 text-sm text-gray-600">
            Please check the console for more details.
          </div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );

  const booksByYear = groupBooksByYear();

  return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <h1 className="text-4xl font-serif mb-4">Reading</h1>
          <p className="text-text-secondary mb-12">
            Tracking what I read since 2020. Recommendations always welcome.
          </p>
          </NarrowContainer>
          {books.length === 0 ? (
            <div className="text-text-secondary">No books found in the database.</div>
          ) : (
            Object.entries(booksByYear)
              .sort((a, b) => b[0] - a[0])
              .map(([year, yearBooks]) => (
              <div key={year} className="mb-16">
                <h2 className="text-2xl font-serif mb-8">{year}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {yearBooks.map((book) => (
                    <div key={book.ID} className="flex flex-row gap-4">
                      <div className="flex-shrink-0 w-[156px]">
                        <img
                          src={book.Covers}
                          alt={`Cover of ${book.Title}`}
                          className="w-full h-[234px] rounded-lg shadow-md object-cover bg-gray-200"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                          }}
                        />
                      </div>
                      <div className="flex flex-col justify-end pb-8">
                        <h3 className="font-medium mb-2">{book.Title}</h3>
                        <p className="font-normal text-text-tertiary">{book.Author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

      </WideContainer>
    </div>
  );
};

export default Reading; 