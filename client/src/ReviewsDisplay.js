
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './ReviewsDisplay.css';

const ReviewsDisplay = () => {
  const [devices, setDevices] = useState([]); // New state for devices
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/phones/names`);
        setDevices(response.data); // Set the device names here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching devices:', error);
        setError('Failed to fetch devices.');
        setLoading(false);
      }
    };

    fetchDevices();
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
    return <div style={pageStyles}>Loading devices...</div>;
  }

  if (error) {
    return <div style={pageStyles}>Error: {error}</div>;
  }

  return (
    <div className="page-container">
      <h1>All Devices</h1>
      <ul className="device-list">
        {devices.map((deviceName) => (
          <li key={deviceName} className="device-list-item">
            <Link to={`/phones/${encodeURIComponent(deviceName)}/reviews`} className="device-link">
              {deviceName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsDisplay;
