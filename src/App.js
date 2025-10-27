import Navbar from './components/common/Navbar';
import Homepage from './components/Homepage'; 
import Writing from './pages/Writing';
import Article from './pages/Article';
import Work from './pages/Work';
import CarturestiCaseStudy from './pages/CarturestiCaseStudy';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reading from './pages/Reading';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <main className="homepage-background">
              <Navbar />
              <Homepage />
            </main>
          } />
          <Route path="/writing" element={
            <main className="homepage-background min-h-screen">
              <Navbar />
              <Writing />
            </main>
          } />
          <Route path="/writing/:slug" element={
            <main className="homepage-background min-h-screen">
              <Navbar />
              <Article />
            </main>
          } />
          <Route path="/reading" element={
            <main className="homepage-background">
              <Navbar />
              <Reading />
            </main>
          } />
          <Route path="/work" element={
            <main className="homepage-background min-h-screen">
              <Navbar />
              <Work />
            </main>
          } />
          <Route path="/carturesti" element={
            <main className="homepage-background min-h-screen">
              <Navbar />
              <CarturestiCaseStudy />
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
