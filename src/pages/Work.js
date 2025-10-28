import React from 'react';
import WideContainer from '../components/containers/WideContainer';
import ProjectBlock from '../components/ProjectBlock';
import Slider from '../components/Slider';

import advisableImg1 from '../assets/advisable/Slider 1.png';
import advisableImg2 from '../assets/advisable/Slider 2.png';
import advisableImg3 from '../assets/advisable/Slider 3.png';
import advisableImg4 from '../assets/advisable/Slider 4.png';
import advisableImg5 from '../assets/advisable/Slider 5.png';
import advisableImg6 from '../assets/advisable/Slider 6.png';
import advisableImg7 from '../assets/advisable/Slider 7.png';
import advisableImg8 from '../assets/advisable/Slider 8.png';
import advisableImg9 from '../assets/advisable/Slider 9.png';
import carturestiImg1 from '../assets/carturesti/Slider 1.png';
import carturestiImg2 from '../assets/carturesti/Slider 2.png';
import carturestiImg3 from '../assets/carturesti/Slider 3.png';
import carturestiImg4 from '../assets/carturesti/Slider 4.png';
import carturestiImg5 from '../assets/carturesti/Slider 5.png';
const advisableSlides = [advisableImg1, advisableImg2, advisableImg3, advisableImg4, advisableImg5, advisableImg6, advisableImg7, advisableImg8, advisableImg9];

const carturestiSlides = [carturestiImg1, carturestiImg2, carturestiImg3, carturestiImg4, carturestiImg5];



function Work() {
  return (
    <div className="homepage-background pt-40 pb-20">
      <WideContainer>
        {/* Kota Project */}
        <ProjectBlock
          title="Kota"
          subtitle="Reimagining how global benefits work"
          description="Leading design at Kota from 10s of customers to 1000s across 4 main platforms."
        >
          {/* Pass kotaSlides once you've created the array above */}
          <Slider />
        </ProjectBlock>

        {/* Advisable Project */}
        <ProjectBlock
          title="Advisable.com"
          subtitle="A sunset marketplace for marketing specialists"
          description="Joined to design across web and product while building for growth initiatives with Webflow"
        >
          {/* Pass advisableSlides once you've created the array above */}
          <Slider images={advisableSlides} />
        </ProjectBlock>

        {/* Carturesti Project */}
        <ProjectBlock
          title="Carturesti.ro"
          subtitle="An imagined mobile app for their digital efforts"
          description="A self-started project coming from my annoyance with their e-commerce experience"
        >
          {/* Pass carturestiSlides once you've created the array above */}
          <Slider images={carturestiSlides} />
        </ProjectBlock>
      </WideContainer>
    </div>
  );
}

export default Work;

