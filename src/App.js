import HomeHero from './components/HomeHero';
import NarrowContainer from './components/containers/NarrowContainer';
import './App.css';
import WideContainer from './components/containers/WideContainer';
import Slider from './components/Slider';
import LastPublished from './components/LastPublished';
import ProgressList from './components/ProgressList/ProgressList';
import AboutSection from './components/AboutSection';
import Reading from './pages/Reading';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App max-w-[1440px] mx-auto">
        <Routes>
          <Route path="/reading" element={<Reading />} />
          <Route path="/" element={
            <main className="mx-auto">
              <WideContainer>
                <NarrowContainer>
                  <HomeHero />
                </NarrowContainer>
                <Slider />
                <NarrowContainer>
                  <AboutSection />
                  <ProgressList />
                </NarrowContainer>
                <LastPublished />
              </WideContainer>
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
