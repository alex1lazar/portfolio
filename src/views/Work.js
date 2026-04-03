'use client';

import React from 'react';
import XLContainer from '../components/containers/XLContainer';
import WorkProjectRow from '../components/WorkProjectRow';
import { getProjectConfig } from '../lib/projectConfigs';

import carturestiImg1 from '../assets/carturesti/Slider 1.webp';
import carturestiImg2 from '../assets/carturesti/Slider 2.webp';
import carturestiImg3 from '../assets/carturesti/Slider 3.webp';
import carturestiImg4 from '../assets/carturesti/Slider 4.webp';
import carturestiImg5 from '../assets/carturesti/Slider 5.webp';
const carturestiSlides = [carturestiImg1, carturestiImg2, carturestiImg3, carturestiImg4, carturestiImg5];

import kotaWp1 from '../assets/kota/Slider 1.webp';
import kotaWp2 from '../assets/kota/Slider 2.webp';
import kotaWp3 from '../assets/kota/Slider 3.webp';
import kotaWp4 from '../assets/kota/Slider 4.webp';
import kotaWp5 from '../assets/kota/Slider 5.webp';
const kotaSlides = [kotaWp1, kotaWp2, kotaWp3, kotaWp4, kotaWp5];

import advWp1 from '../assets/advisable/Slider 1.webp';
import advWp2 from '../assets/advisable/Slider 2.webp';
import advWp3 from '../assets/advisable/Slider 3.webp';
import advWp4 from '../assets/advisable/Slider 4.webp';
import advWp5 from '../assets/advisable/Slider 5.webp';
const advisableSlides = [advWp1, advWp2, advWp3, advWp4, advWp5];

const kota = getProjectConfig('kota');
const advisable = getProjectConfig('advisable');
const kotaImageAlts = kota.workPreview.images.map((img) => img.alt);
const advisableImageAlts = advisable.workPreview.images.map((img) => img.alt);

const carturestiTitle = 'Carturesti.ro';
const carturestiSubtitle = 'An imagined mobile app for their digital efforts';
const carturestiImageAlts = carturestiSlides.map(
  (_, i) => `${carturestiTitle} work preview ${i + 1}`
);

function Work() {

  return (
    <div className="bg-background-primary pt-40 pb-20">
      <XLContainer>
        <WorkProjectRow
          title={kota.title}
          subtitle={kota.subtitle}
          href="/kota"
          images={kotaSlides}
          imageAlts={kotaImageAlts}
        />

        <WorkProjectRow
          title={advisable.title}
          subtitle={advisable.subtitle}
          href="/advisable"
          images={advisableSlides}
          imageAlts={advisableImageAlts}
        />

        <WorkProjectRow
          title={carturestiTitle}
          subtitle={carturestiSubtitle}
          href="/carturesti"
          images={carturestiSlides}
          imageAlts={carturestiImageAlts}
        />
      </XLContainer>
    </div>
  );
}

export default Work;

