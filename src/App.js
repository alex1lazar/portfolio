import Navbar from './components/common/Navbar';
import Homepage from './components/Homepage'; 
import Writing from './pages/Writing';
import Article from './pages/Article';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
