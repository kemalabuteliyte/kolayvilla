import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-content">
              <Link to="/" className="navbar-brand">
                🏡 KolayVilla
              </Link>
              <div className="navbar-nav">
                <Link to="/" className="btn btn-secondary btn-sm">
                  Home
                </Link>
                <Link to="/templates" className="btn btn-secondary btn-sm">
                  Templates
                </Link>
                <Link to="/builder" className="btn btn-primary btn-sm">
                  Start Building
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
