import HomeHero from './components/HomeHero';
import NarrowContainer from './components/containers/NarrowContainer';
import './App.css';
import WideContainer from './components/containers/WideContainer';
import Slider from './components/Slider';
import LastPublished from './components/LastPublished';
import ProgressList from './components/ProgressList/ProgressList';
function App() {
  return (
    <div className="App">
      <main className="mx-auto">
        <WideContainer>
          <NarrowContainer>
            <HomeHero />
          </NarrowContainer>
          <Slider />
          <NarrowContainer>
            <ProgressList />
          </NarrowContainer>
          <LastPublished />
        </WideContainer>
      </main>
    </div>
  );
}

export default App;
