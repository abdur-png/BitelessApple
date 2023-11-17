// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import logo from './applelogo.png'; 
const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Company Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/reviews-page">Review Form</Link></li>
        <li><Link to="/all-reviews">All Reviews</Link></li> 
      </ul>
    </nav>
  );
};

export default Navigation;
