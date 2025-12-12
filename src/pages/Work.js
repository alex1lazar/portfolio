import React from 'react';
import WideContainer from '../components/containers/WideContainer';
import ProjectBlock from '../components/ProjectBlock';
import Slider from '../components/Slider';

import advisableImg1 from '../assets/advisable/Slider 1.webp';
import advisableImg2 from '../assets/advisable/Slider 2.webp';
import advisableImg3 from '../assets/advisable/Slider 3.webp';
import advisableImg4 from '../assets/advisable/Slider 4.webp';
import advisableImg5 from '../assets/advisable/Slider 5.webp';
import advisableImg6 from '../assets/advisable/Slider 6.webp';
import advisableImg7 from '../assets/advisable/Slider 7.webp';
import advisableImg8 from '../assets/advisable/Slider 8.webp';
import advisableImg9 from '../assets/advisable/Slider 9.webp';
import carturestiImg1 from '../assets/carturesti/Slider 1.webp';
import carturestiImg2 from '../assets/carturesti/Slider 2.webp';
import carturestiImg3 from '../assets/carturesti/Slider 3.webp';
import carturestiImg4 from '../assets/carturesti/Slider 4.webp';
import carturestiImg5 from '../assets/carturesti/Slider 5.webp';
import kotaImg1 from '../assets/kota/Slider 1.webp';
import kotaImg2 from '../assets/kota/Slider 2.webp';
import kotaImg3 from '../assets/kota/Slider 3.webp';
import kotaImg4 from '../assets/kota/Slider 4.webp';
import kotaImg5 from '../assets/kota/Slider 5.webp';
import kotaImg6 from '../assets/kota/Slider 6.png';
import kotaImg7 from '../assets/kota/Slider 7.png';
import kotaImg8 from '../assets/kota/Slider 8.webp';
import kotaImg9 from '../assets/kota/Slider 9.webp';
import kotaImg10 from '../assets/kota/Slider 10.webp';

const advisableSlides = [advisableImg1, advisableImg2, advisableImg3, advisableImg4, advisableImg5, advisableImg6, advisableImg7, advisableImg8, advisableImg9];
const carturestiSlides = [carturestiImg1, carturestiImg2, carturestiImg3, carturestiImg4, carturestiImg5];
const kotaSlides = [kotaImg1, kotaImg2, kotaImg3, kotaImg4, kotaImg5, kotaImg6, kotaImg7, kotaImg8, kotaImg9, kotaImg10];


function Work() {
  return (
    <div className="bg-background-primary pt-40 pb-20">
      <WideContainer>
        {/* Kota Project */}
        <ProjectBlock
          title="Kota"
          subtitle="Reimagining how global benefits work"
          description="Leading design at Kota from 10s of customers to 1000s across 4 main platforms."
        >
          {/* Pass kotaSlides once you've created the array above */}
          <Slider images={kotaSlides} />
        </ProjectBlock>

        {/* Advisable Project */}
        <ProjectBlock
          title="Advisable.com"
          subtitle="A sunset marketplace for marketing specialists"
          description="Designed across product and web while building for growth with Webflow"
        >
          {/* Pass advisableSlides once you've created the array above */}
          <Slider images={advisableSlides} delay={1000} />
        </ProjectBlock>

        {/* Carturesti Project */}
        <ProjectBlock
          title="Carturesti.ro"
          subtitle="An imagined mobile app for their digital efforts"
          description="A self-started project coming from my annoyance with their e-commerce experience"
          link="/carturesti"
        >
          {/* Pass carturestiSlides once you've created the array above */}
          <Slider images={carturestiSlides} delay={2000} />
        </ProjectBlock>
      </WideContainer>
    </div>
  );
}

export default Work;

