import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import MedsPage from './components/MedsPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="bg-pink-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/meds" element={<MedsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

