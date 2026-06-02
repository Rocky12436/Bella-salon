import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import UserBooking from './pages/UserBooking';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function TopNav() {
  const location = useLocation();
  const isBook = location.pathname === '/book';
  const isAdmin = location.pathname.startsWith('/admin');
  const isHome = !isBook && !isAdmin;

  return (
    <nav className="top-nav">
      <Link to="/" className="brand">Bela<span>Salon</span></Link>
      <div className="nav-tabs">
        <Link to="/" className={`nav-tab ${isHome ? 'active' : ''}`}>Home</Link>
        <Link to="/book" className={`nav-tab ${isBook ? 'active' : ''}`}>Book Now</Link>
        <Link to="/admin" className={`nav-tab ${isAdmin ? 'active' : ''}`}>Admin Panel</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<UserBooking />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
