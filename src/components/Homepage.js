import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import { motion, AnimatePresence } from 'motion/react';
import { getAllArticles } from '../lib/articles';
import { getAllBooks } from '../lib/books';
import '../styles/animations.css';

// import heroImg1 from '../assets/hero/Slider 1.png';
// import advisableImg9 from '../assets/advisable/Slider 9.png';
// import carturestiImg1 from '../assets/carturesti/Slider 1.png';
import WideContainer from './containers/WideContainer';
import Navbar from './common/Navbar';

function Homepage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);

  const copyEmail = () => {
    const email = 'lazarva25@gmail.com';
    navigator.clipboard.writeText(email);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2400);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const romaniaTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Bucharest"}));
      const timeString = romaniaTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await getAllArticles();
        setArticles(articlesData.slice(0, 3)); // Get first 3 articles
        
        const booksData = getAllBooks();
        setBooks(booksData.slice(0, 4)); // Get first 4 books
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  const SectionHeader = ({ title }) => (
    <div className="flex gap-1.5 items-center shrink-0 w-[128px]">
      <div className="rounded-[1px] shrink-0 w-2 h-2 bg-color-accent"></div>
      <p className="font-serif text-lg text-text-dark whitespace-nowrap">
        {title}
      </p>
    </div>
  );

  return (
    <div className="bg-background-primary pb-16 flex flex-col min-h-screen">
      <WideContainer className="flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-20">
            <div className="flex flex-row w-full md:w-[128px] items-center justify-between gap-3">
              <p className="font-serif text-lg text-text-dark">
                Alex Lazar
              </p>
              <div className="block md:hidden">
                <Navbar hideName={true} />
              </div>
            </div>
         
          <div className="flex flex-row justify-between gap-3 w-full">
            <p className="font-serif font-semibold text-lg text-text-dark max-w-lg">
              Software designer working with companies that aim for a world-class customer experience
            </p>
            <div className="flex gap-3 hidden md:block">
              <Navbar hideName={true} />
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="pt-20 mb-40">
          <div className="rounded-xs overflow-hidden">
            <Slider />
          </div>
        </div>

        {/* Work Section */}
        <div className="flex gap-6 items-start mb-20 flex-col md:flex-row">
          <SectionHeader title="Work" />
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Kota Project */}
              <div className="flex flex-col gap-2 max-w-[400px] mb-3">
                <div className="aspect-[1120/634.055] overflow-hidden rounded-xs relative">
                <div className="aspect-[1120/634.055] bg-[#f4f7f0] rounded-xs relative overflow-hidden flex items-center justify-center">
                  <p className='text-sm text-text-muted'> WIP </p>
                  {/* <img 
                    src={heroImg1} 
                    alt="Kota project" 
                    className="w-full h-full object-cover"
                  /> */}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="font-medium text-text-dark">
                    Kota
                  </p>
                </div>
                <p className="text-xs text-text-normal">
                  Product design
                </p>
                <p className="text-xs text-text-muted">
                  Reimagining how global benefits work
                </p>
              </div>

              {/* Advisable Project */}
              <div className="flex flex-col gap-2 max-w-[400px] mb-3">
                <div className="aspect-[1120/634.055] bg-[#edf2fc] rounded-xs overflow-hidden relative">
                <div className="aspect-[1120/634.055] bg-[#f4f7f0] rounded-xs relative overflow-hidden flex items-center justify-center">
                <p className='text-sm text-text-muted'> WIP </p>
                  {/* <img 
                    src={advisableImg9} 
                    alt="Advisable project" 
                    className="w-full h-full object-cover opacity-80"
                  /> */}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="font-medium text-text-dark">
                    Advisable
                  </p>
                </div>
                <p className="font-normal text-xs text-text-normal">
                  Design and Webflow development
                </p>
                <p className="font-normal text-xs text-text-muted">
                  A (now sunset) freelancer marketplace for top-of-the-industry marketing specialists
                </p>
              </div>

              {/* Carturesti Project */}
              <div className="flex flex-col gap-2 max-w-[400px] mb-3">
                <div className="aspect-[1120/634.055] bg-[#f4f7f0] rounded-xs relative overflow-hidden flex items-center justify-center">
                  <p className='text-sm text-text-muted'> WIP </p>
                  {/* <img 
                    src={carturestiImg1} 
                    alt="Carturesti project" 
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <div className="flex gap-2 items-center">
                  <p className="font-sans font-medium text-base text-text-dark">
                    Carturesti
                  </p>
                </div>
                <p className="font-sans font-normal text-xs text-text-normal">
                  Product designer
                </p>
                <p className="font-sans font-normal text-xs text-text-muted">
                  Making a case for Romania's largest bookstore to build a mobile app
                </p>
              </div>
            </div>
            <Link 
              to="/work" 
              className="font-sans font-medium text-base text-text-accent hover:underline"
            >
              View all work and design explorations
            </Link>
          </div>
        </div>

        {/* Writing Section */}
        <div className="flex gap-6 items-start md:flex-row flex-col mb-20">
          <SectionHeader title="Writing" />
          <div className="flex flex-col gap-8 w-full max-w-[480px]">
            {articles.map((article) => (
              <Link 
                key={article.slug}
                to={`/writing/${encodeURIComponent(article.slug)}`}
                className="flex flex-col gap-1.5"
              >
                <p className="font-sans font-medium text-base text-text-dark hover:text-text-accent transition-colors">
                  {article.title}
                </p>
                <p className="font-sans font-normal text-xs text-text-muted">
                  {article.description}
                </p>
              </Link>
            ))}
            <Link 
              to="/writing" 
              className="font-sans font-medium text-base text-text-accent hover:underline"
            >
              View all writing
            </Link>
          </div>
        </div>

        {/* Reading Section */}
        <div className="flex gap-6 items-start mb-20 flex-col md:flex-row">
          <SectionHeader title="Reading" />
          <div className="flex flex-col gap-8 max-w-[480px]">
            <div className="flex flex-col gap-4">
              <div className="flex gap-6 items-start">
                {books.slice(0, 4).map((book, index) => (
                  <div 
                    key={book.id} 
                    className="flex-1 aspect-[174/234] relative rounded-xs shadow-xs overflow-hidden"
                  >
                    {book.coverImage ? (
                      <img 
                        src={book.coverImage} 
                        alt={`${book.title} cover`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#eee8de]"></div>
                    )}
                  </div>
                ))}
              </div>
              <p className="font-sans font-normal text-xs text-text-muted">
                {getAllBooks().length} books added to Reading
              </p>
            </div>
            <Link 
              to="/reading" 
              className="font-sans font-medium text-base text-text-accent hover:underline"
            >
              View my bookshelf on the web
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="flex gap-6 items-start mb-20 w-full flex-col md:flex-row">
          <SectionHeader title="About" />
          <div className="flex flex-col gap-8 w-full max-w-[480px]">
            <div className="font-sans font-normal text-base text-text-dark space-y-3">
              <p>
                <span>Currently working at </span>
                <a href="https://www.kota.io" className="text-color-accent underline" target="_blank" rel="noopener noreferrer">Kota</a>
                <span> where we shape the future of how companies and their employees interact with benefits.</span>
              </p>
              <p>
                Specializing in product design, I joined start-ups as their first designer to work across product, web, and branding for a consistent and attentive customer experience.
              </p>
            </div>
          </div>
        </div>

        {/* Explore/Footer Section */}
        <div className="flex gap-6 items-start flex-col md:flex-row">
          <SectionHeader title="Explore" />
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start gap-3 justify-between">
              <div className="flex gap-3 items-center">
                <Link 
                  to="/work" 
                  className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
                >
                  Work
                </Link>
                <span className="font-serif text-lg text-text-dark opacity-30">/</span>
                <Link 
                  to="/reading" 
                  className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
                >
                  Reading
                </Link>
                <span className="font-serif text-lg text-text-dark opacity-30">/</span>
                <Link 
                  to="/writing" 
                  className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
                >
                  Writing
                </Link>
              </div>
              <div className="relative inline-block">
                <button
                  onClick={copyEmail}
                  className="font-serif font-semibold text-lg text-text-dark underline transition-opacity hover:text-text-accent"
                >
                  Copy my email
                </button>
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        enter: { duration: 0.2, ease: "easeOut" },
                        exit: { duration: 1, ease: "easeOut" }
                      }}
                      className="tooltip"
                      style={{
                        pointerEvents: 'none'
                      }}
                      transformTemplate={({ x, y }) => `translateX(-50%) translateY(${y || 0})`}
                    >
                      Email copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex gap-12 items-end">
              <div className="flex gap-3 items-center flex-col-reverse md:flex-row">
                <p className="font-sans font-normal text-base text-text-muted whitespace-nowrap">
                  Timisoara, Romania {currentTime && `(${currentTime})`}
                </p>
                <div className="flex gap-3 items-center">
                <span className="font-sans text-base text-text-muted hidden">/</span>
                <a 
                  href="https://x.com/alexvlazar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans font-normal text-base text-text-muted underline hover:text-text-accent transition-colors"
                >
                  X
                </a>
                <span className="font-sans text-base text-text-muted">/</span>
                <a 
                  href="https://www.linkedin.com/in/alexvlazar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans font-normal text-base text-text-muted underline hover:text-text-accent transition-colors"
                >
                  LinkedIn
                </a>
                <span className="font-sans text-base text-text-muted">/</span>
                <a 
                  href="https://www.are.na/alex-lazar/channels" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-sans font-normal text-base text-text-muted underline hover:text-text-accent transition-colors"
                >
                    Are.na
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WideContainer>
    </div>
  );
}

export default Homepage;
