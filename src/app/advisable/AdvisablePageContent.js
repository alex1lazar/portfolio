"use client";

import React from 'react';
import Navbar from '../../components/common/Navbar';
import XLContainer from '../../components/containers/XLContainer';
import NarrowContainer from '../../components/containers/NarrowContainer';
import ProjectImageRowGrid from '../../components/ProjectImageRowGrid';
import { getProjectConfig } from '../../lib/projectConfigs';
import advisableSlider6 from '../../assets/advisable/Slider 6.webp';
import advisableSlider7 from '../../assets/advisable/Slider 7.webp';
import advisableSlider8 from '../../assets/advisable/Slider 8.webp';
import advisableSlider9 from '../../assets/advisable/Slider 9.webp';

const advisableDetailImageMap = {
  'Slider 6.webp': advisableSlider6,
  'Slider 7.webp': advisableSlider7,
  'Slider 8.webp': advisableSlider8,
  'Slider 9.webp': advisableSlider9,
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

