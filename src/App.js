import Navbar from './components/common/Navbar';
import Homepage from './components/Homepage'; 
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
