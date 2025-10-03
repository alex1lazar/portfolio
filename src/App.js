import Navbar from './components/common/Navbar';
import Homepage from './components/Homepage'; 
import Writing from './pages/Writing';
import CarturestiCaseStudy from './pages/CarturestiCaseStudy';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <main className="homepage-background min-h-screen">
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
          <Route path="/writing/carturesti-case-study" element={
            <main className="min-h-screen">
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
