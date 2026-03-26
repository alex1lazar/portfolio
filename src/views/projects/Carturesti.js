import React from 'react';
import WideContainer from '../../components/containers/WideContainer';
import NarrowContainer from '../../components/containers/NarrowContainer';
import CaseStudySlider from '../../components/CaseStudySlider';

const ProjectHeader = ({ title, company, role, period, links }) => (
  <div className="border-b border-gray-200 pb-8 mb-8">
    <h1 className="text-4xl font-serif mb-6">{title}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="mb-4">
          <h3 className="text-text-tertiary mb-1">Company</h3>
          <p>{company}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-text-tertiary mb-1">Role</h3>
          <p>{role}</p>
        </div>
        <div>
          <h3 className="text-text-tertiary mb-1">Period</h3>
          <p>{period}</p>
        </div>
      </div>
      <div>
        <h3 className="text-text-tertiary mb-4">Links</h3>
        <div className="space-y-2">
          {links.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-text-link hover:underline"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Carturesti = () => {
  const projectData = {
    title: "A better digital experience for Romania's largest book retailer",
    company: "Self started project for Carturesti.ro",
    role: "Product Designer",
    period: "Jan 2023 - March 2023",
    links: [
      { text: "Figma prototype", url: "#" }
    ],
    description: "Carturesti is the largest book retailer in Romania. It has 43 physical libraries in the entire country and about 1.5 million average visits for its online e-commerce platform carturesti.ro.",
    context: "This is my go-to retail store when I just want to casually browse. As with most large bookstores, it's a place where you can buy unique gifts, lifestyle items, apparel, or music. Their in-person experience is carefully considered, but their online experience is lacking.",
    SliderImages: [
      {
        src: "/images/projects/carturesti/current-1.png",
        alt: "Current Carturesti website homepage",
        caption: "The current homepage with overwhelming navigation"
      },
      {
        src: "/images/projects/carturesti/current-2.png",
        alt: "Current product listing page",
        caption: "Product listing with cluttered interface"
      },
      {
        src: "/images/projects/carturesti/current-3.png",
        alt: "Current product detail page",
        caption: "Product detail page with poor information hierarchy"
      }
    ],
    mobileAppImages: [
      {
        src: "/images/projects/carturesti/mobile-1.png",
        alt: "New mobile app homepage",
        caption: "Clean, focused homepage with clear navigation"
      },
      {
        src: "/images/projects/carturesti/mobile-2.png",
        alt: "New product listing page",
        caption: "Streamlined product listing with better categorization"
      },
      {
        src: "/images/projects/carturesti/mobile-3.png",
        alt: "New product detail page",
        caption: "Improved product detail page with better information hierarchy"
      }
    ]
  };

  return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <ProjectHeader {...projectData} />
          
          <div className="prose prose-lg max-w-none">
            <p className="p-large mb-8">{projectData.description}</p>
            
            <h2>Context</h2>
            <p className="mb-8">{projectData.context}</p>

            <h2>Putting the investment into perspective</h2>
            <p className="mb-8">
              I'm certain that a better web and mobile experience will increase sales over time, 
              capture the younger market (age 15-24), and keep the existing customers engaged.
            </p>

            <h3>Mobile vs web</h3>
            <p className="mb-8">
              Web platforms are cheaper to build and more easily accessible than mobile apps. 
              It's already common sense that having a good web experience for desktop and mobile 
              reduces bounce rates and increases sales.
            </p>

            <h3>Usage on phones</h3>
            <ul className="list-disc pl-6 mb-8">
              <li>78% of people would rather access a store from an app compared to a mobile website.</li>
              <li>Retail has 3 times more mobile sessions than desktop sessions.</li>
              <li>Nearly 90% of mobile time is spent on apps.</li>
              <li>Gen Z, an important age group for Carturesti, spends 66% of their digital time using smartphone apps.</li>
              <li>73% of Millenials shop on mobile 1-4 times per week.</li>
            </ul>

            <h2>What's going wrong with their online store?</h2>
            <p className="mb-8">
              In this slideshow, I break down their e-commerce platform. Screen by screen, 
              I point out elements and behaviors that affect the user experience.
            </p>

            <CaseStudySlider images={projectData.SliderImages} />

            <h2>Mobile design context</h2>
            <h3>Simple, efficient design</h3>
            <p className="mb-8">
              The design was not meant to stand out. My mission was improve their user experience, 
              create a versatile UI system, and provide ideas on how this retailer could sell more 
              through a mobile app.
            </p>

            <h3>For thoughtful readers and buyers</h3>
            <p className="mb-8">
              Carturesti's main user is the reader. These people are thoughtful and have the 
              patience to look for the right thing. They need information and context first.
            </p>

            <h3>Colors, typography, and iconography</h3>
            <h4>Color palette</h4>
            <p className="mb-8">
              I built a neutral color palette starting from their brand color. These neutral 
              colors are the most used in mobile applications. I kept the green as their brand 
              color and added some tints and shades for versatility. Orange is used for buttons, 
              call-to-actions, and discounts.
            </p>

            <h4>Typography</h4>
            <p className="mb-8">
              I wanted to pair a serif with a sans serif to balance the fanciness of their 
              physical stores with a modern look. The serif typeface New York was created by 
              Apple and gives the application an elegant look that works great for a bookstore. 
              It's used mainly for headings and product categories.
            </p>

            <CaseStudySlider images={projectData.mobileAppImages} />

            <h2>UX Takeaways</h2>
            <h3>Intermediary Product Category Pages</h3>
            <p className="mb-8">
              One thing that feels too convoluted on Carturesti's website is the navigation bar. 
              It opens up a larger number of subcategories that just feels like too much.
            </p>

            <h3>Homepage & content curation</h3>
            <p className="mb-8">
              Just as in a physical store, you're not always sure what you're looking for. 
              If you know that you'd like to read "Catcher in the Rye" you orient yourself inside 
              the store and look for the Fiction aisle, authors starting in S (J.D. Salinger).
            </p>

            <h3>Empty states</h3>
            <p className="mb-8">
              Although they can yield substantial benefits for the business, empty states are 
              often overlooked. From a UX standpoint, it's incredibly important to reduce 
              confusion and provide moments of delight.
            </p>

            <h2>Conclusions</h2>
            <p className="mb-8">
              Carturesti has an incredible presence in Romania with its 43 physical stores and 
              a substantial following online. However, their online experience falls short 
              compared to the thoughtful and immersive in-store experience.
            </p>
          </div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );
};

export default Carturesti; 