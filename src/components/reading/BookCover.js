import React from 'react';

const COVER_RADIUS = { borderRadius: '6px 2px 2px 6px' };

function BookCover({
  book,
  className = '',
  naturalHeight = false,
  tabIndex,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  as: Component = 'div',
  ...props
}) {
  const alt = `${book.title} cover`;

  if (!book.coverImage) {
    return (
      <Component
        className={`bg-[#eee8de] ${className}`}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={alt}
        {...props}
      />
    );
  }

  return (
    <Component
      className={className}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <img
        src={book.coverImage}
        alt={alt}
        className={
          naturalHeight
            ? 'block h-auto w-full shadow-md'
            : 'h-full w-full object-cover shadow-md'
        }
        style={COVER_RADIUS}
        loading="lazy"
        draggable={false}
      />
    </Component>
  );
}

export default BookCover;
