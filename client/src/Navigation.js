// Navigation.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navigation.css';
import logo from './applelogo.png'; // Ensure this path is correct

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      {/* Logo always displayed */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Company Logo" />
        </Link>
      </div>

      {/* Navigation links displayed */}
      <ul className="nav-links">
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/mac">Mac</Link></li>
        <li><Link to="/reviews-page">Reviews</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
