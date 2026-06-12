'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { DialRoot } from 'dialkit';
import 'dialkit/styles.css';
import WideContainer from '../components/containers/WideContainer';
import BooksByYear from '../components/BooksByYear';
import PageHeader from '../components/PageHeader';
import BooksScatterView from '../components/reading/BooksScatterView';
import BooksMasonryView from '../components/reading/BooksMasonryView';
import BooksShelfView from '../components/reading/BooksShelfView';
import ReadingViewToolbar from '../components/reading/ReadingViewToolbar';
import { ReadingViewTransition } from '../components/reading/ReadingViewTransition';
import { useReadingDialKit } from '../components/reading/useReadingDialKit';
import { getAllBooks } from '../lib/books';

const Reading = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('grid');
  const [scatterKey, setScatterKey] = useState(0);

  const bumpScatter = useCallback(() => {
    setScatterKey((k) => k + 1);
  }, []);

  const dialConfig = useReadingDialKit({ onScatterReroll: bumpScatter });

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

  const handleViewChange = useCallback((view) => {
    if (view === 'scatter') {
      bumpScatter();
    }
    setActiveView(view);
  }, [bumpScatter]);

  const renderView = () => {
    switch (activeView) {
      case 'scatter':
        return (
          <BooksScatterView
            key={scatterKey}
            books={books}
            config={dialConfig}
            rerollKey={scatterKey}
          />
        );
      case 'masonry':
        return <BooksMasonryView books={books} config={dialConfig} />;
      case 'shelf':
        return <BooksShelfView books={books} config={dialConfig} />;
      case 'grid':
      default:
        return <BooksByYear books={books} config={dialConfig} />;
    }
  };

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
    <>
      <div className={`pt-32 ${activeView === 'scatter' ? 'pb-24' : 'pb-28'}`}>
        <WideContainer>
          <PageHeader
            title="Reading"
            description="I started tracking what I read around 2020. Recommendations are always welcome."
          />
          <AnimatePresence mode="wait">
            <ReadingViewTransition
              viewKey={activeView}
              transitions={dialConfig.transitions}
            >
              {renderView()}
            </ReadingViewTransition>
          </AnimatePresence>
        </WideContainer>
      </div>
      <ReadingViewToolbar
        activeView={activeView}
        onViewChange={handleViewChange}
        config={dialConfig}
      />
      <DialRoot position="top-right" defaultOpen={false} />
    </>
  );
};

export default Reading;
