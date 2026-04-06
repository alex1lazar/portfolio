"use client";

import React from 'react';
import Navbar from '../../components/common/Navbar';
import XLContainer from '../../components/containers/XLContainer';
import ProjectImageRowGrid from '../../components/ProjectImageRowGrid';
import { getProjectConfig } from '../../lib/projectConfigs';
import kotaImage1 from '../../assets/kota/Slider 1.webp';
import kotaImage2 from '../../assets/kota/Slider 2.webp';
import kotaImage3 from '../../assets/kota/Slider 3.webp';
import kotaImage4 from '../../assets/kota/Slider 4.webp';
import kotaImage5 from '../../assets/kota/Slider 5.webp';
import kotaImage6 from '../../assets/kota/Slider 6.png';
import kotaImage7 from '../../assets/kota/Slider 7.png';
import kotaImage8 from '../../assets/kota/Slider 8.webp';
import kotaImage9 from '../../assets/kota/Slider 9.webp';

const kotaDetailImageMap = {
  'Slider 1.webp': kotaImage1,
  'Slider 2.webp': kotaImage2,
  'Slider 3.webp': kotaImage3,
  'Slider 4.webp': kotaImage4,
  'Slider 5.webp': kotaImage5,
  'Slider 6.png': kotaImage6,
  'Slider 7.png': kotaImage7,
  'Slider 8.webp': kotaImage8,
  'Slider 9.webp': kotaImage9
};

export default function KotaPageContent() {
  const kota = getProjectConfig('kota');

  return (
    <div className="bg-background-primary min-h-screen">
      <XLContainer>
      <Navbar />
      <div className="pt-40 pb-20">
            <div className="flex mb-2">
              <h2 className="font-serif text-text-dark">
                {kota.title}
                <span className="text-text-muted mx-2 font-normal">/</span>
                <span className="text-text-dark text-text-muted font-normal">{kota.subtitle}</span>
              </h2>
            </div>

            <p className="text-base text-text-dark max-w-l mb-12">
              {kota.description}
            </p>
          <ProjectImageRowGrid rows={kota.detailGrid.rows} imageMap={kotaDetailImageMap} />
      </div>
      </XLContainer>
    </div>
  );
}

