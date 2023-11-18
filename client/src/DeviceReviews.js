import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeviceReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { deviceName } = useParams(); 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
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
  }, [deviceName]);

  const sortedAndFilteredReviews = reviews
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    })
    .filter((review) => review.comment.toLowerCase().includes(searchKeyword));

  const sortReviews = (direction) => {
    setSortDirection(direction);
  };

  const searchFilter = (event) => {
    setSearchKeyword(event.target.value.toLowerCase());
  };
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
    alignItems: 'flex-start',
    paddingTop: '100px',
  };

  const tableStyles = {
    borderCollapse: 'collapse',
    marginLeft: '0', // Aligns table to the left
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    width: 'auto', 
    maxWidth: 'none',
  };

  const thStyles = {
    backgroundColor: '#007bff', // Blue header background
    color: 'white',
    padding: '10px',
    borderBottom: '1px solid #ffffff',
    width: '100px', // Sets a fixed width for the "Rating" column
    width: '50px', // Adjust width for the "Rating" column
    borderRight: '1px solid #ffffff',
  };

  const tdStyles = {
    padding: '10px',
    borderBottom: '1px solid #ffffff',
    color: 'white',
    borderRight: '1px solid #ffffff',
  };

  const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const searchInputStyles = {
    padding: '10px',
    marginLeft: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    height: '30px', // Reduced height for the search box
    width: '200px',
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
      <div style={searchContainerStyles}>
        <label htmlFor="searchComments" style={{ marginRight: '10px' }}>Search comments:</label>
        <input
          id="searchComments"
          type="text"
          onChange={searchFilter}
          placeholder="Type to search..."
          style={searchInputStyles}
        />
      </div>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles} onClick={() => sortReviews(sortDirection === 'asc' ? 'desc' : 'asc')}>
              Rating {sortDirection === 'asc' ? '↑' : '↓'}
            </th>
            <th style={{ ...thStyles, width: 'auto', borderRight: 'none' }}>Comment</th> {/* Let the comment column take the remaining space */}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredReviews.map((review) => (
            <tr key={review._id}>
              <td style={tdStyles}>{review.rating}</td>
              <td style={{ ...tdStyles, borderRight: 'none' }}>{review.comment}</td> {/* Let the comment column take the remaining space */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceReviews;