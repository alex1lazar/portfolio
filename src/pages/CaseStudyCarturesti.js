import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy';
import { problemImagesFormatted, solutionImagesFormatted, heroImage } from '../lib/carturestiImages';
import { loadMarkdownCaseStudy } from '../lib/markdownParser';

const CaseStudyCarturesti = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [heroImageFromMarkdown, setHeroImageFromMarkdown] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load markdown file
    const loadMarkdown = async () => {
      try {
        const response = await fetch(new URL('../assets/carturesti/Carturesti ro.md', import.meta.url));
        const markdownContent = await response.text();
        
        // Map carousel names to image arrays
        const carouselMap = {
          'problems': problemImagesFormatted,
          'solutions': solutionImagesFormatted
        };
        
        // Map image names to image imports (for hero images and inline images)
        // Add more images here as needed, then reference them in markdown with:
        // <!-- HERO_IMAGE:filename.png --> (full-width hero)
        // <!-- IMAGE:filename.png --> (inline within text container)
        const imageMap = {
          'Cover.png': heroImage
        };
        
        // Parse markdown to sections and hero image
        const { sections: parsedSections, heroImage: parsedHeroImage } = loadMarkdownCaseStudy(markdownContent, carouselMap, imageMap);
        setSections(parsedSections);
        setHeroImageFromMarkdown(parsedHeroImage);
        setLoading(false);
      } catch (error) {
        console.error('Error loading markdown:', error);
        setLoading(false);
        // Show error state or empty sections
        setSections([]);
      }
    };

    loadMarkdown();
  }, []);

  const handleBack = () => {
    navigate('/writing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <p className="text-text-secondary">Loading case study...</p>
      </div>
    );
  }

  return (
    <CaseStudy
      title="Imagining a mobile experience for Romania's largest book retailer"
      subtitle="Carturesti has 57 beautifully designed stores and an exceptional in-store experience. Yet, their online experience hides huge potential."
      role="Mobile Designer"
      period="Jan - March 2023"
      sections={sections}
      heroImage={heroImageFromMarkdown}
      onBack={handleBack}
    />
  );
};

export default CaseStudyCarturesti;
