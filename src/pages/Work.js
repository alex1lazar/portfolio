import React from 'react';
import WideContainer from '../components/containers/WideContainer';
import ProjectBlock from '../components/ProjectBlock';
import Slider from '../components/Slider';

import carturestiImg1 from '../assets/carturesti/Slider 1.webp';
import carturestiImg2 from '../assets/carturesti/Slider 2.webp';
import carturestiImg3 from '../assets/carturesti/Slider 3.webp';
import carturestiImg4 from '../assets/carturesti/Slider 4.webp';
import carturestiImg5 from '../assets/carturesti/Slider 5.webp';
const carturestiSlides = [carturestiImg1, carturestiImg2, carturestiImg3, carturestiImg4, carturestiImg5];

import { getProjectConfig } from '../lib/projectConfigs';

const kota = getProjectConfig('kota');
const advisable = getProjectConfig('advisable');

function Work() {
  const kotaWorkPreviewBaseUrl = `/projects/${kota.key}/work-preview`;
  const advisableWorkPreviewBaseUrl = `/projects/${advisable.key}/work-preview`;

  const kotaSlides = kota.workPreview.images.map((img) => `${kotaWorkPreviewBaseUrl}/${img.file}`);
  const advisableSlides = advisable.workPreview.images.map((img) => `${advisableWorkPreviewBaseUrl}/${img.file}`);

  return (
    <div className="bg-background-primary pt-40 pb-20">
      <WideContainer>
        {/* Kota Project */}
        <ProjectBlock
          title={kota.title}
          subtitle={kota.subtitle}
          description={kota.description}
          link="/kota"
        >
          {/* Pass kotaSlides once you've created the array above */}
          <Slider images={kotaSlides} />
        </ProjectBlock>

        {/* Advisable Project */}
        <ProjectBlock
          title={advisable.title}
          subtitle={advisable.subtitle}
          description={advisable.description}
          link="/advisable"
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

