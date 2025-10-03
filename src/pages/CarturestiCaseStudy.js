import React from 'react';
import { useNavigate } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy';

const CarturestiCaseStudy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/writing');
  };

  // Case study content structured as sections
  const content = [
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
    }
  ];

  // Placeholder images - you'll need to replace these with actual images
  const slideshowImages = [
    // These would be screenshots of the current Carturesti website showing UX issues
    'https://via.placeholder.com/1200x800/f0f0f0/666?text=Carturesti+Website+Issue+1',
    'https://via.placeholder.com/1200x800/f0f0f0/666?text=Carturesti+Website+Issue+2',
    'https://via.placeholder.com/1200x800/f0f0f0/666?text=Carturesti+Website+Issue+3'
  ];

  const mobileImages = [
    // These would be the mobile app design screens
    'https://via.placeholder.com/400x800/f0f0f0/666?text=Mobile+Screen+1',
    'https://via.placeholder.com/400x800/f0f0f0/666?text=Mobile+Screen+2',
    'https://via.placeholder.com/400x800/f0f0f0/666?text=Mobile+Screen+3',
    'https://via.placeholder.com/400x800/f0f0f0/666?text=Mobile+Screen+4',
    'https://via.placeholder.com/400x800/f0f0f0/666?text=Mobile+Screen+5'
  ];

  return (
    <CaseStudy
      title="Carturesti.ro"
      subtitle="This is my go-to retail store when I just want to casually browse. As with most large bookstores, it's a place where you can buy unique gifts, lifestyle items, apparel, or music. Their in-person experience is carefully considered, but their online experience is lacking."
      role="Mobile Designer"
      period="Jan - March 2023"
      content={content}
      heroImage="https://via.placeholder.com/1200x600/f0f0f0/666?text=Carturesti+Hero+Image"
      slideshowImages={slideshowImages}
      mobileImages={mobileImages}
      onBack={handleBack}
    />
  );
};

export default CarturestiCaseStudy;
