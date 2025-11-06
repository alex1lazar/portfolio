import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import { getAllArticles } from '../lib/articles';
import { getAllBooks } from '../lib/books';

// import heroImg1 from '../assets/hero/Slider 1.png';
// import advisableImg9 from '../assets/advisable/Slider 9.png';
// import carturestiImg1 from '../assets/carturesti/Slider 1.png';
import WideContainer from './containers/WideContainer';
import Navbar from './common/Navbar';
import AboutDrawer from './common/AboutDrawer';
import PrimaryButton from './common/PrimaryButton';
import ExploreSection from './ExploreSection';

function Homepage() {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [isAboutDrawerOpen, setIsAboutDrawerOpen] = useState(false);

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
                <Navbar hideName={true} onOpenAbout={() => setIsAboutDrawerOpen(true)} />
              </div>
            </div>
         
          <div className="flex flex-row justify-between gap-3 w-full">
            <p className="font-serif font-semibold text-lg text-text-dark max-w-lg">
              Software designer working with companies that aim for a world-class customer experience
            </p>
            <div className="flex gap-3 hidden md:block">
              <Navbar hideName={true} onOpenAbout={() => setIsAboutDrawerOpen(true)} />
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="pt-20 mb-40">
          <div className="rounded-xs overflow-hidden">
            <Slider />
          </div>
        <div className="flex gap-6 items-start mt-6 flex-col md:flex-row">
          <div className="w-[128px] hidden md:block"></div>
          <div className="flex flex-col gap-8 w-full max-w-[480px]">
            <PrimaryButton to="/work">
              View work and design explorations
            </PrimaryButton>
          </div>
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
            <PrimaryButton to="/writing">
              View all writing
            </PrimaryButton>
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
            <PrimaryButton to="/reading">
              View my bookshelf on the web
            </PrimaryButton>
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
            <PrimaryButton 
              onClick={() => setIsAboutDrawerOpen(true)}
              className="text-left"
            >
              More about 
            </PrimaryButton>
          </div>
        </div>

        {/* Explore/Footer Section */}
        <ExploreSection onOpenAbout={() => setIsAboutDrawerOpen(true)} />
      </WideContainer>
      
      {/* About Drawer */}
      <AboutDrawer isOpen={isAboutDrawerOpen} onClose={() => setIsAboutDrawerOpen(false)} />
    </div>
  );
}

export default Homepage;
