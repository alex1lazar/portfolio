import React from 'react';
import { useParams, Link } from 'react-router-dom';
import WideContainer from '../../components/containers/WideContainer';
import ContentWheelGrid from '../../components/explore/ContentWheel/ContentWheelGrid';

// Import images from the codebase
import heroImg1 from '../../assets/hero/Slider 1.webp';
import heroImg2 from '../../assets/hero/Slider 2.webp';
import heroImg3 from '../../assets/hero/Slider 3.webp';
import heroImg4 from '../../assets/hero/Slider 4.webp';
import advisableImg1 from '../../assets/advisable/Slider 1.webp';
import advisableImg2 from '../../assets/advisable/Slider 2.webp';
import advisableImg3 from '../../assets/advisable/Slider 3.webp';
import carturestiImg1 from '../../assets/carturesti/Slider 1.webp';
import carturestiImg2 from '../../assets/carturesti/Slider 2.webp';
import kotaImg1 from '../../assets/kota/Slider 1.webp';
import kotaImg2 from '../../assets/kota/Slider 2.webp';
import kotaImg3 from '../../assets/kota/Slider 3.webp';

// Placeholder data with real images from the codebase
const getPlaceholderData = () => {
  return [
    { id: 1, title: 'Hero Slider 1', description: 'A fascinating article about design and user experience', type: 'article', image: heroImg1 },
    { id: 2, title: 'Hero Slider 2', description: 'An insightful video exploring modern web development', type: 'video', image: heroImg2 },
    { id: 3, title: 'Hero Slider 3', description: 'A collection of beautiful design inspiration', type: 'image', image: heroImg3 },
    { id: 4, title: 'Hero Slider 4', description: 'Deep dive into creative thinking and problem solving', type: 'article', image: heroImg4 },
    { id: 5, title: 'Advisable Slider 1', description: 'Tutorial on advanced React patterns and techniques', type: 'video', image: advisableImg1 },
    { id: 6, title: 'Advisable Slider 2', description: 'Showcase of minimalist design principles', type: 'image', image: advisableImg2 },
    { id: 7, title: 'Advisable Slider 3', description: 'Exploring the future of digital interfaces', type: 'article', image: advisableImg3 },
    { id: 8, title: 'Carturesti Slider 1', description: 'Case study on building scalable applications', type: 'video', image: carturestiImg1 },
    { id: 9, title: 'Carturesti Slider 2', description: 'Visual storytelling through photography', type: 'image', image: carturestiImg2 },
    { id: 10, title: 'Kota Slider 1', description: 'Understanding user behavior and psychology', type: 'article', image: kotaImg1 },
    { id: 11, title: 'Kota Slider 2', description: 'Masterclass on design systems and components', type: 'video', image: kotaImg2 },
    { id: 12, title: 'Kota Slider 3', description: 'Abstract art and creative expression', type: 'image', image: kotaImg3 },
  ];
};

const ContentWheel = () => {
  const { name } = useParams();
  
  // Format the content wheel name for display
  const formatName = (name) => {
    if (!name) return 'ContentWheel';
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const items = getPlaceholderData();

  return (
    <div className="pb-16 min-h-screen">
      <WideContainer>
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/work"
            className="font-serif font-semibold text-lg text-text-dark underline hover:text-text-accent transition-colors"
          >
            Back to Work
          </Link>
        </div>
        <div className="mb-64"></div>
        {/* Circular Grid */}
        <ContentWheelGrid items={items} />
      </WideContainer>
    </div>
  );
};

export default ContentWheel;

