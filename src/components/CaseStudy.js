import React, { useState } from 'react';
import NarrowContainer from './containers/NarrowContainer';
import WideContainer from './containers/WideContainer';

const CaseStudy = ({ 
  title, 
  subtitle, 
  role, 
  period, 
  content, 
  heroImage, 
  slideshowImages = [],
  mobileImages = [],
  onBack 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const nextMobileSlide = () => {
    setCurrentMobileSlide((prev) => (prev + 1) % mobileImages.length);
  };

  const prevMobileSlide = () => {
    setCurrentMobileSlide((prev) => (prev - 1 + mobileImages.length) % mobileImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-32 pb-16">
        <WideContainer>
          <NarrowContainer>
            <button 
              onClick={onBack}
              className="flex items-center text-text-secondary hover:text-text-primary mb-8 transition-colors font-sans text-base"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2 rotate-180">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Writing
            </button>
            
            <h1 className="text-[1.75rem] leading-[2.25rem] font-serif mb-6">{title}</h1>
            <p className="text-xl text-text-secondary mb-8 font-sans text-base">{subtitle}</p>
            
            <div className="flex flex-wrap gap-8 text-sm font-sans text-base">
              <div>
                <span className="text-text-tertiary">Role</span>
                <p className="font-medium">{role}</p>
              </div>
              <div>
                <span className="text-text-tertiary">Period</span>
                <p className="font-medium">{period}</p>
              </div>
            </div>
          </NarrowContainer>
        </WideContainer>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <img 
            src={heroImage} 
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="pb-16">
        <WideContainer>
          <NarrowContainer>
            <div className="prose prose-lg max-w-none">
              {content.map((section, index) => (
                <div key={index} className="mb-12">
                  {section.type === 'paragraph' && (
                    <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
                      {section.content}
                    </p>
                  )}
                  
                  {section.type === 'heading' && (
                    <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-6 mt-12">{section.content}</h2>
                  )}
                  
                  {section.type === 'subheading' && (
                    <h3 className="text-xl font-medium mb-4 mt-8 font-sans text-base">{section.content}</h3>
                  )}
                  
                  {section.type === 'list' && (
                    <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary font-sans text-base">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.type === 'stats' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                      {section.items.map((stat, statIndex) => (
                        <div key={statIndex} className="bg-gray-50 p-6 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-2 font-sans text-base">{stat.value}</div>
                          <div className="text-text-secondary font-sans text-base">{stat.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </NarrowContainer>
        </WideContainer>
      </div>

      {/* Slideshow */}
      {slideshowImages.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <WideContainer>
            <NarrowContainer>
              <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-8 text-center">What's going wrong with their online store?</h2>
            </NarrowContainer>
          </WideContainer>
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img 
                src={slideshowImages[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-auto"
              />
            </div>
            {slideshowImages.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8 15L13 10L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentSlide + 1} / {slideshowImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Design Section */}
      <div className="mb-16">
        <WideContainer>
          <NarrowContainer>
            <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-8">Mobile design context</h2>
            <h3 className="text-xl font-medium mb-6 font-sans text-base">Simple, efficient design</h3>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              The design was not meant to stand out. My mission was improve their user experience, create a versatile UI system, and provide ideas on how this retailer could sell more through a mobile app.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              I wanted to showcase how easy it is, even for one person, to create a nicer online experience while also considering the business needs of an e-commerce platform.
            </p>
            
            <h3 className="text-xl font-medium mb-6 font-sans text-base">Principles for designing the app</h3>
            <h4 className="text-lg font-medium mb-4 font-sans text-base">For thoughtful readers and buyers</h4>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              Carturesti's main user is the reader. These people are thoughtful and have the patience to look for the right thing. They need information and context first.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              If you'd take some time and observe the people in their physical store, they'd match my description. Unless Carturesti's visitors know exactly what they want, they take the time to casually look through the store.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              I've observed that the younger generation (15-24 years old) is very present in their stores. This fact is visible in their online traffic as well. From what I see, they are particularly interested in manga, classics, vinyl records, Funko Pop figurines, or other lifestyle items that have character.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              It only makes sense for Carturesti to scale up its online efforts and turn this demographic into loyal customers.
            </p>
          </NarrowContainer>
        </WideContainer>
      </div>

      {/* Mobile Screens Slideshow */}
      {mobileImages.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <WideContainer>
            <NarrowContainer>
              <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-8 text-center">Screen-by-screen UX breakdown</h2>
            </NarrowContainer>
          </WideContainer>
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img 
                src={mobileImages[currentMobileSlide]} 
                alt={`Mobile screen ${currentMobileSlide + 1}`}
                className="w-full h-auto"
              />
            </div>
            {mobileImages.length > 1 && (
              <>
                <button 
                  onClick={prevMobileSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={nextMobileSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8 15L13 10L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentMobileSlide + 1} / {mobileImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* UX Takeaways */}
      <div className="mb-16">
        <WideContainer>
          <NarrowContainer>
            <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-8">UX Takeaways</h2>
            
            <h3 className="text-xl font-medium mb-6 font-sans text-base">Intermediary Product Category Pages</h3>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              One thing that feels too convoluted on Carturesti's website is the navigation bar. It opens up a larger number of subcategories that just feels like too much.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              I wanted to simplify that in the mobile application and make use of intermediary product category pages. These are screens where you can browse through the main categories like books, music, home & decor, have a larger perspective of what's in store, and then narrow it down to what you're looking for.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              This helps undecided users by informing their decisions. They learn what product types might be suitable (or available) by introducing subcategories.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              For the company, it's also a great opportunity to introduce or promote a specific subcategory encouraging users to choose a narrower path before displaying an overwhelming amount of items.
            </p>

            <h3 className="text-xl font-medium mb-6 font-sans text-base">Homepage & content curation</h3>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              Just as in a physical store, you're not always sure what you're looking for.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              If you know that you'd like to read "Catcher in the Rye" you orient yourself inside the store and look for the Fiction aisle, authors starting in S (J.D. Salinger). That would be the longer path in a mobile application. The best and fastest would be to search for it using the search bar.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              But if you want to just browse, the physical store provides you with a large number of cues. I wanted to emulate this behavior in the application as well.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              Amazon and Netflix do this perfectly. They show you collections, top charts, popular subcategories, and popular items within a category. It allows people to naturally browse and discover more products they could like. Just as a librarian would point out to you Popular Fiction Books, Discounted Books, Popular Deals, etc. the application showcases these types of collections to allow further discovery.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-8">
              This behavior, if done right, increases the time spent in-app, the tendency to add more to the shopping cart or wishlist, and in the end, drives up sales.
            </p>

            <h3 className="text-xl font-medium mb-6 font-sans text-base">Empty states</h3>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              Although they can yield substantial benefits for the business, empty states are often overlooked.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              From a UX standpoint, it's incredibly important to reduce confusion and provide moments of delight. Giving extra thought to empty states can reduce churn, increase product engagement, and reduces the chances of users turning to competitors.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              In this app, two common empty states could be present if the Shopping Basket or Favorites lists are empty. I wanted to provide users a way out and search for more products or the ability to quickly add something to these lists.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              For both the Shopping Basket and Favorites screens, you could do that by:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary font-sans text-base">
              <li>Having a button that directs them to the most relevant page (Product in our case).</li>
              <li>Suggesting Recently Viewed items.</li>
              <li>Showcasing items in the Wishlist (to be added to the Shopping Basket).</li>
              <li>If they haven't used the app at all and there is no information about them, the application could still suggest trending products.</li>
            </ul>
          </NarrowContainer>
        </WideContainer>
      </div>

      {/* Conclusions */}
      <div className="pb-16">
        <WideContainer>
          <NarrowContainer>
            <h2 className="text-[1.75rem] leading-[2.25rem] font-serif mb-8">Conclusions</h2>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              Carturesti has an incredible presence in Romania with its 43 physical stores and a substantial following online. However, their online experience falls short compared to the thoughtful and immersive in-store experience.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              It's evident that the people and the business as a whole genuinely care about the products they're selling. But still, certain aspects of their online presence can impact their brand experience and business metrics.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary mb-6">
              My intent with this redesign was to make it easier for people, whether or not they have Carturesti stores nearby, to discover and purchase products they will love.
            </p>
            <p className="font-sans text-base leading-relaxed text-text-secondary">
              And if from a business perspective the investment makes sense, a handful of designers could skyrocket carturesti.ro and their online customer satisfaction.
            </p>
          </NarrowContainer>
        </WideContainer>
      </div>
    </div>
  );
};

export default CaseStudy;
