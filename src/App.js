import Navbar from './components/common/Navbar';
import Homepage from './components/Homepage'; 
import Writing from './pages/Writing';
import Article from './pages/Article';
import Work from './pages/Work';
import CarturestiCaseStudy from './pages/CarturestiCaseStudy';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Reading from './pages/Reading';
import { fadeIn } from './lib/motion';

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
            <CarturestiCaseStudy />
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
