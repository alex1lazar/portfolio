"use client";

import React from 'react';
import Navbar from '../../components/common/Navbar';
import XLContainer from '../../components/containers/XLContainer';
import NarrowContainer from '../../components/containers/NarrowContainer';
import ProjectImageRowGrid from '../../components/ProjectImageRowGrid';
import { getProjectConfig } from '../../lib/projectConfigs';
import advisableImage6 from '../../assets/advisable/Slider 6.webp';
import advisableImage7 from '../../assets/advisable/Slider 7.webp';
import advisableImage8 from '../../assets/advisable/Slider 8.webp';
import advisableImage9 from '../../assets/advisable/Slider 9.webp';
import advisableImage1 from '../../assets/advisable/Slider 1.webp';
import advisableImage2 from '../../assets/advisable/Slider 2.webp';
import advisableImage3 from '../../assets/advisable/Slider 3.webp';
import advisableImage4 from '../../assets/advisable/Slider 4.webp';
import advisableImage5 from '../../assets/advisable/Slider 5.webp';

const advisableDetailImageMap = {
  'Slider 6.webp': advisableImage6,
  'Slider 7.webp': advisableImage7,
  'Slider 8.webp': advisableImage8,
  'Slider 9.webp': advisableImage9,
  'Slider 1.webp': advisableImage1,
  'Slider 2.webp': advisableImage2,
  'Slider 3.webp': advisableImage3,
  'Slider 4.webp': advisableImage4,
  'Slider 5.webp': advisableImage5,
};

export default function AdvisablePageContent() {
  const advisable = getProjectConfig('advisable');

  return (
    <div className="bg-background-primary min-h-screen">
      <XLContainer>
        <Navbar />
        <div className="pt-40 pb-20">       
            <div className="flex mb-2">
              <h2 className="font-serif text-text-dark">
                {advisable.title}
                <span className="text-text-muted mx-2 font-normal">/</span>
                <span className="text-text-dark text-text-muted font-normal">{advisable.subtitle}</span>
              </h2>
            </div>

            <p className="text-base text-text-dark max-w-l mb-12">
              {advisable.description}
            </p>
            <ProjectImageRowGrid rows={advisable.detailGrid.rows} imageMap={advisableDetailImageMap} />
      </div>
      </XLContainer>
    </div>
  );
}

