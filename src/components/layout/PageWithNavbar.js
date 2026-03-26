'use client';

import React from 'react';
import Navbar from '../common/Navbar';

export default function PageWithNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
