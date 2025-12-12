import React, { Suspense } from 'react';
import Navbar from './components/common/Navbar';
import Homepage from './components/Homepage'; 
import Writing from './pages/Writing';
import Article from './pages/Article';
import Work from './pages/Work';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Reading from './pages/Reading';
import SlotWheel from './pages/SlotWheel';
import { fadeIn } from './lib/motion';
import WideContainer from './components/containers/WideContainer';
import NarrowContainer from './components/containers/NarrowContainer';

// Lazy load the Carturesti case study to reduce initial bundle size
const CaseStudyCarturesti = React.lazy(() => import('./pages/CaseStudyCarturesti'));
// Lazy load the ContentWheel exploration
const ContentWheel = React.lazy(() => import('./pages/explore/ContentWheel'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary pt-10 md:pt-20"
          >
            <Homepage />
          </motion.main>
        } />
        <Route path="/writing" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen pt-10 md:pt-20"
          >
            <Navbar />
            <Writing />
          </motion.main>
        } />
        <Route path="/writing/:slug" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen pt-10 md:pt-20"
          >
            <Navbar />
            <Article />
          </motion.main>
        } />
        <Route path="/reading" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen pt-10 md:pt-20"
          >
            <Navbar />
            <Reading />
          </motion.main>
        } />
        <Route path="/work" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen pt-10 md:pt-20"
          >
            <Navbar />
            <Work />
          </motion.main>
        } />
        <Route path="/carturesti" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen pt-10 md:pt-20"
          >
            <Navbar />
            <Suspense fallback={
              <div className="pt-32">
                <WideContainer>
                  <NarrowContainer>
                    <div className="text-center">
                      <p className="text-text-secondary">Loading case study...</p>
                    </div>
                  </NarrowContainer>
                </WideContainer>
              </div>
            }>
              <CaseStudyCarturesti />
            </Suspense>
          </motion.main>
        } />
        <Route path="/explore/:name" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen pt-10 md:pt-20"
          >
            <Suspense fallback={
              <div className="pt-32">
                <WideContainer>
                  <div className="text-center">
                    <p className="text-text-secondary">Loading content wheel...</p>
                  </div>
                </WideContainer>
              </div>
            }>
              <ContentWheel />
            </Suspense>
          </motion.main>
        } />
        <Route path="/slotwheel" element={
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={{ duration: 0.2 }}
            className="bg-background-primary min-h-screen"
          >
            <SlotWheel />
          </motion.main>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
