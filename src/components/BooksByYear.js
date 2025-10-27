import React from 'react';

const BooksByYear = ({ books }) => {
  // Group books by year
  const groupBooksByYear = (books) => {
    const grouped = books.reduce((acc, book) => {
      const year = book.year || 'Unknown Year';
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(book);
      return acc;
    }, {});

    // Sort years in descending order (newest first)
    const sortedYears = Object.keys(grouped).sort((a, b) => {
      if (a === 'Unknown Year') return 1; // Put unknown year at the end
      if (b === 'Unknown Year') return -1;
      return parseInt(b) - parseInt(a);
    });

    return { grouped, sortedYears };
  };

  const { grouped, sortedYears } = groupBooksByYear(books);

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">No books found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {sortedYears.map((year) => (
        <div key={year} className="relative">
          {/* Year Label - styled according to Figma design */}
          <div className="py-2 mb-2">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-accent rounded-sm"></div>
              <p className="text-lg text-text-normal font-serif font-bold mb-0">
                {year === 'Unknown Year' ? 'Books without year' : year}
              </p>
            </div>
          </div>

          {/* Books for this year - 5 column grid on large screens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-3">
            {grouped[year].map((book) => (
              <div key={book.id} className="group">
                <div className="flex flex-col max-w-40">
                  {/* Book cover - maintains original aspect ratio */}
                  {book.coverImage && (
                    <div className="w-full mb-3">
                      <img 
                        src={book.coverImage} 
                        alt={`${book.title} cover`}
                        className="w-full object-cover shadow-md"
                        style={{ borderRadius: '6px 2px 2px 6px' }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-text-dark mb-1 text-sm font-semibold line-clamp-2">
                      {book.title}
                    </p>
                    <p className="text-text-muted text-sm line-clamp-1">
                      by {book.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksByYear;
