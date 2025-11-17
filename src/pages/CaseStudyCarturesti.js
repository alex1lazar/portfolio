import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CaseStudy from '../components/CaseStudy';
import { problemImagesFormatted, solutionImagesFormatted } from '../lib/carturestiImages';
import { loadMarkdownCaseStudy } from '../lib/markdownParser';

const CaseStudyCarturesti = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
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
        
        // Parse markdown to sections
        const parsedSections = loadMarkdownCaseStudy(markdownContent, carouselMap);
        setSections(parsedSections);
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
      heroImage="https://via.placeholder.com/1200x600/f0f0f0/666?text=Carturesti+Hero+Image"
      onBack={handleBack}
    />
  );
};

export default CaseStudyCarturesti;
