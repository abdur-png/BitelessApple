// ReviewsDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const pageStyles = {
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
  };


  if (loading) {
    return <div style={pageStyles}>Loading reviews...</div>;
  }

  if (error) {
    return <div style={pageStyles}>Error: {error}</div>;
  }

  return (
    <div style={pageStyles}>
      <h1>All Reviews</h1>
      <ul>
        {Array.isArray(reviews) && reviews.map((review) => (
          <li key={review._id}>
            {/* Make sure to access the phone name correctly if it's a populated object */}
            <h3>{review.phone?.phone_name}</h3> 
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsDisplay;
