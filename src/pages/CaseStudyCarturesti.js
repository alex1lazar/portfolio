import React from 'react';
import { useNavigate } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy';
import { problemImagesFormatted, solutionImagesFormatted } from '../lib/carturestiImages';

const CaseStudyCarturesti = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/writing');
  };

  // Case study content structured as flexible sections
  const sections = [
    {
      type: 'overview',
      title: 'What you\'ll learn',
      items: [
        'How to identify UX problems in existing e-commerce platforms',
        'Mobile app design principles for retail businesses',
        'The business case for mobile app investments in retail'
      ]
    },
    {
      type: 'paragraph',
      content: 'This is my go-to retail store when I just want to casually browse. As with most large bookstores, it\'s a place where you can buy unique gifts, lifestyle items, apparel, or music. Their in-person experience is carefully considered, but their online experience is lacking.'
    },
    {
      type: 'paragraph',
      content: 'I buy most of my books and gifts for loved ones at this store. Each Carturesti location has a unique architecture, and the physical experience is thoughtfully considered. It\'s a calming and relaxing experience to wander through their stores.'
    },
    {
      type: 'paragraph',
      content: 'However, the online experience provided by Carturesti is terrible. I rarely use their website, except when I have a very specific item in mind. Browsing for something online feels like more of a hassle than visiting their physical stores.'
    },
    {
      type: 'paragraph',
      content: 'It is highly likely that this poor online experience is impacting their sales and customer satisfaction.'
    },
    {
      type: 'paragraph',
      content: 'Moreover, whenever I make a purchase in-store, I scan my Carturesti Card to receive loyalty points and special deals on certain books. Unfortunately, there is no virtual option for the Carturesti Card, so I must have it on me at all times.'
    },
    {
      type: 'paragraph',
      content: 'This made me think that Carturesti could benefit from a mobile application, which would have a significant impact. Personalization, gamification, and other loyalty programs on retail mobile applications are doing wonders for these businesses. Out of all the stores I visit and things I buy online, I would be happiest if Carturesti could provide me with a better experience and results in exchange for some data.'
    },
    {
      type: 'paragraph',
      content: 'However, the question remains: would this investment be worth it?'
    },
    {
      type: 'heading',
      content: 'Putting the investment into perspective'
    },
    {
      type: 'paragraph',
      content: 'I\'m certain that a better web and mobile experience will increase sales over time, capture the younger market (age 15-24), and keep the existing customers engaged.'
    },
    {
      type: 'paragraph',
      content: 'Spending more time in mobile apps, checking products\' in-store availability, more frequent online shopping. I had observed these actions in my behavior as well as in my friends\' usage of internet. But I wasn\'t exactly sure what\'s happening at a macro level.'
    },
    {
      type: 'paragraph',
      content: 'That\'s why I gathered all these relevant statistics.'
    },
    {
      type: 'subheading',
      content: 'Mobile vs web'
    },
    {
      type: 'paragraph',
      content: 'Web platforms are cheaper to build and more easily accessible than mobile apps. It\'s already common sense that having a good web experience for desktop and mobile reduces bounce rates and increases sales.'
    },
    {
      type: 'paragraph',
      content: 'But the real gold pot for large retail businesses is hidden inside mobile applications. They are much faster than responsive web platforms, they offer personalization, notifications, and gamification systems that create a better user experience for customers and more profitable user sessions for the company.'
    },
    {
      type: 'paragraph',
      content: 'The cost to develop mobile applications is significantly larger than to create responsive web platforms. But the investment starts to make sense when you look at the customers\' usage of online time.'
    },
    {
      type: 'subheading',
      content: 'Usage on phones'
    },
    {
      type: 'list',
      items: [
        '78% of people would rather access a store from an app compared to a mobile website.',
        'Retail has 3 times more mobile sessions than desktop sessions.',
        'Nearly 90% of mobile time is spent on apps.',
        'Gen Z, an important age group for Carturesti, spends 66% of their digital time using smartphone apps.',
        '73% of Millenials shop on mobile 1-4 times per week.',
        'On average, people spend 3 hours and 40 minutes using their mobile devices each day. Just 10% of that time is spent on a mobile web browser.'
      ]
    },
    {
      type: 'subheading',
      content: 'Conversions and personalization in mobile apps'
    },
    {
      type: 'list',
      items: [
        'Eighty percent of consumers report that they\'re more likely to buy from a business that offers personalized experiences, and 90% say personalization is highly appealing to them.',
        'Conversion rates from mobile apps are three times higher than mobile sites.',
        'Mobile shoppers spend twice as much money as other customers.',
        '53% of smartphone users buy from company-specific apps.',
        'Nearly half (48 percent) of all consumers have left a business\'s website and made a purchase on another site or in-store simply because it was poorly curated.',
        '83% of consumers are willing to share their data to "receive the benefits of a personalized experience."',
        '74% of marketers claim that e-commerce personalization has a "strong" or "extreme" impact on online retailers.'
      ]
    },
    {
      type: 'paragraph',
      content: 'Along with being my favorite store, the statistics above helped me decide to design a new mobile application for Carturesti.'
    },
    {
      type: 'paragraph',
      content: 'It\'s likely to be an incredibly impactful initiative for Carturesti. Their offline experience is wonderful and places the brand in an incredible position to cement its leading status for book/lifestyle retail.'
    },
    {
      type: 'paragraph',
      content: 'But before designing, I wanted to understand what are biggest problems on their web platform.'
    },
    {
      type: 'carousel',
      title: 'What\'s going wrong with their online store?',
      images: problemImagesFormatted.length > 0 
        ? problemImagesFormatted 
        : [
            {
              src: 'https://via.placeholder.com/1200x726/f0f0f0/666?text=Add+problem+images+to+assets/carturesti/problems/',
              alt: 'Error - Missing image',
            }
          ],
      aspectRatio: '200/121'
    },
    {
      type: 'heading',
      content: 'Mobile design context'
    },
    {
      type: 'subheading',
      content: 'Simple, efficient design'
    },
    {
      type: 'paragraph',
      content: 'The design was not meant to stand out. My mission was improve their user experience, create a versatile UI system, and provide ideas on how this retailer could sell more through a mobile app.'
    },
    {
      type: 'paragraph',
      content: 'I wanted to showcase how easy it is, even for one person, to create a nicer online experience while also considering the business needs of an e-commerce platform.'
    },
    {
      type: 'subheading',
      content: 'Principles for designing the app'
    },
    {
      type: 'subheading',
      content: 'For thoughtful readers and buyers'
    },
    {
      type: 'paragraph',
      content: 'Carturesti\'s main user is the reader. These people are thoughtful and have the patience to look for the right thing. They need information and context first.'
    },
    {
      type: 'paragraph',
      content: 'If you\'d take some time and observe the people in their physical store, they\'d match my description. Unless Carturesti\'s visitors know exactly what they want, they take the time to casually look through the store.'
    },
    {
      type: 'paragraph',
      content: 'I\'ve observed that the younger generation (15-24 years old) is very present in their stores. This fact is visible in their online traffic as well. From what I see, they are particularly interested in manga, classics, vinyl records, Funko Pop figurines, or other lifestyle items that have character.'
    },
    {
      type: 'paragraph',
      content: 'It only makes sense for Carturesti to scale up its online efforts and turn this demographic into loyal customers.'
    },
    {
      type: 'carousel',
      title: 'Screen-by-screen UX breakdown',
      images: solutionImagesFormatted.length > 0 
        ? solutionImagesFormatted 
        : [
            {
              src: 'https://via.placeholder.com/1200x726/f0f0f0/666?text=Add+solution+images+to+assets/carturesti/solutions/',
              alt: 'Placeholder - Missing image',
            }
          ],
      aspectRatio: '200/121'
    },
    {
      type: 'heading',
      content: 'UX Takeaways'
    },
    {
      type: 'subheading',
      content: 'Intermediary Product Category Pages'
    },
    {
      type: 'paragraph',
      content: 'One thing that feels too convoluted on Carturesti\'s website is the navigation bar. It opens up a larger number of subcategories that just feels like too much.'
    },
    {
      type: 'paragraph',
      content: 'I wanted to simplify that in the mobile application and make use of intermediary product category pages. These are screens where you can browse through the main categories like books, music, home & decor, have a larger perspective of what\'s in store, and then narrow it down to what you\'re looking for.'
    },
    {
      type: 'paragraph',
      content: 'This helps undecided users by informing their decisions. They learn what product types might be suitable (or available) by introducing subcategories.'
    },
    {
      type: 'paragraph',
      content: 'For the company, it\'s also a great opportunity to introduce or promote a specific subcategory encouraging users to choose a narrower path before displaying an overwhelming amount of items.'
    },
    {
      type: 'link',
      url: 'https://www.nngroup.com/articles/progressive-disclosure/',
      text: 'Learn more about the psychology behind intermediary product category pages here.'
    },
    {
      type: 'subheading',
      content: 'Homepage & content curation'
    },
    {
      type: 'paragraph',
      content: 'Just as in a physical store, you\'re not always sure what you\'re looking for.'
    },
    {
      type: 'paragraph',
      content: 'If you know that you\'d like to read "Catcher in the Rye" you orient yourself inside the store and look for the Fiction aisle, authors starting in S (J.D. Salinger). That would be the longer path in a mobile application. The best and fastest would be to search for it using the search bar.'
    },
    {
      type: 'paragraph',
      content: 'But if you want to just browse, the physical store provides you with a large number of cues. I wanted to emulate this behavior in the application as well.'
    },
    {
      type: 'paragraph',
      content: 'Amazon and Netflix do this perfectly. They show you collections, top charts, popular subcategories, and popular items within a category. It allows people to naturally browse and discover more products they could like. Just as a librarian would point out to you Popular Fiction Books, Discounted Books, Popular Deals, etc. the application showcases these types of collections to allow further discovery.'
    },
    {
      type: 'paragraph',
      content: 'This behavior, if done right, increases the time spent in-app, the tendency to add more to the shopping cart or wishlist, and in the end, drives up sales.'
    },
    {
      type: 'subheading',
      content: 'Empty states'
    },
    {
      type: 'paragraph',
      content: 'Although they can yield substantial benefits for the business, empty states are often overlooked.'
    },
    {
      type: 'paragraph',
      content: 'From a UX standpoint, it\'s incredibly important to reduce confusion and provide moments of delight. Giving extra thought to empty states can reduce churn, increase product engagement, and reduces the chances of users turning to competitors.'
    },
    {
      type: 'paragraph',
      content: 'In this app, two common empty states could be present if the Shopping Basket or Favorites lists are empty. I wanted to provide users a way out and search for more products or the ability to quickly add something to these lists.'
    },
    {
      type: 'paragraph',
      content: 'For both the Shopping Basket and Favorites screens, you could do that by:'
    },
    {
      type: 'list',
      items: [
        'Having a button that directs them to the most relevant page (Product in our case).',
        'Suggesting Recently Viewed items.',
        'Showcasing items in the Wishlist (to be added to the Shopping Basket).',
        'If they haven\'t used the app at all and there is no information about them, the application could still suggest trending products.'
      ]
    },
    {
      type: 'heading',
      content: 'Conclusions'
    },
    {
      type: 'paragraph',
      content: 'Carturesti has an incredible presence in Romania with its 43 physical stores and a substantial following online. However, their online experience falls short compared to the thoughtful and immersive in-store experience.'
    },
    {
      type: 'paragraph',
      content: 'It\'s evident that the people and the business as a whole genuinely care about the products they\'re selling. But still, certain aspects of their online presence can impact their brand experience and business metrics.'
    },
    {
      type: 'paragraph',
      content: 'My intent with this redesign was to make it easier for people, whether or not they have Carturesti stores nearby, to discover and purchase products they will love.'
    },
    {
      type: 'paragraph',
      content: 'And if from a business perspective the investment makes sense, a handful of designers could skyrocket carturesti.ro and their online customer satisfaction.'
    }
  ];

  return (
    <CaseStudy
      title="Carturesti.ro"
      subtitle="This is my go-to retail store when I just want to casually browse. As with most large bookstores, it's a place where you can buy unique gifts, lifestyle items, apparel, or music. Their in-person experience is carefully considered, but their online experience is lacking."
      role="Mobile Designer"
      period="Jan - March 2023"
      sections={sections}
      heroImage="https://via.placeholder.com/1200x600/f0f0f0/666?text=Carturesti+Hero+Image"
      onBack={handleBack}
    />
  );
};

export default CaseStudyCarturesti;
