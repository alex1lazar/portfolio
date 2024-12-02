import Navbar from './components/common/Navbar';
import HomeHero from './components/HomeHero';
import NarrowContainer from './components/containers/NarrowContainer';
import './App.css';
import WideContainer from './components/containers/WideContainer';

function App() {
  return (
    <div className="App">
      <main className="mx-auto">
        <WideContainer>
          <NarrowContainer>
            <HomeHero />
        </NarrowContainer>
        </WideContainer>
      </main>
    </div>
  );
}

export default App;
