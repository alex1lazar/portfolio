"use client";

import React from 'react';
import Navbar from '../../components/common/Navbar';
import WideContainer from '../../components/containers/WideContainer';
import NarrowContainer from '../../components/containers/NarrowContainer';
import ProjectImageRowGrid from '../../components/ProjectImageRowGrid';
import { getProjectConfig } from '../../lib/projectConfigs';
import kotaSlider6 from '../../assets/kota/Slider 6.png';
import kotaSlider7 from '../../assets/kota/Slider 7.png';
import kotaSlider8 from '../../assets/kota/Slider 8.webp';
import kotaSlider9 from '../../assets/kota/Slider 9.webp';
import kotaSlider10 from '../../assets/kota/Slider 10.webp';

const kotaDetailImageMap = {
  'Slider 6.png': kotaSlider6,
  'Slider 7.png': kotaSlider7,
  'Slider 8.webp': kotaSlider8,
  'Slider 9.webp': kotaSlider9,
  'Slider 10.webp': kotaSlider10,
};

export default function KotaPageContent() {
  const kota = getProjectConfig('kota');

  return (
    <div className="bg-background-primary min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20">
        <WideContainer>
          <NarrowContainer>
            <div className="flex justify-center mb-6">
              <h2 className="text-center font-serif text-text-dark">
                {kota.title}
                <span className="text-text-muted mx-2 font-normal">/</span>
                <span className="text-text-dark text-text-muted font-normal">{kota.subtitle}</span>
              </h2>
            </div>

            <p className="text-center text-base text-text-dark max-w-3xl px-4 mb-12">
              {kota.description}
            </p>

            <ProjectImageRowGrid rows={kota.detailGrid.rows} imageMap={kotaDetailImageMap} />
          </NarrowContainer>
        </WideContainer>
      </div>
    </div>
  );
}

