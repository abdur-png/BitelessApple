import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeviceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { deviceName } = useParams(); // Extract the device name from URL params

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Encode the deviceName to ensure the URL is correctly formatted
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/phones/${encodeURIComponent(deviceName)}/reviews`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching reviews for ${deviceName}:`, error);
        setError(`Failed to fetch reviews for ${deviceName}.`);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [deviceName]); // Depend on deviceName to refetch when it changes

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
    return <div style={pageStyles}>Loading reviews for {deviceName}...</div>;
  }

  if (error) {
    return <div style={pageStyles}>Error: {error}</div>;
  }

  return (
    <div style={pageStyles}>
      <h1>Reviews for {deviceName}</h1>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review._id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
            </li>
          ))
        ) : (
          <p>No reviews found for this device.</p>
        )}
      </ul>
    </div>
  );
};

export default DeviceReviews;
