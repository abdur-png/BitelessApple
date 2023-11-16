import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navigation.css';
import logo from './applelogo.png'; // Make sure this path is correct

const Navigation = () => {
  const location = useLocation();
  
  // Determine if we're on the reviews page
  const isReviewPage = location.pathname === '/reviews-page';

  return (
    <nav className="navigation">
      {!isReviewPage && (
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Company Logo" />
          </Link>
        </div>
      )}
      <ul className={`nav-links ${isReviewPage ? 'nav-links--review-page' : ''}`}>
        {!isReviewPage && (
          <>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/mac">Mac</Link></li>
          </>
        )}
        <li><Link to="/reviews-page">Reviews</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
