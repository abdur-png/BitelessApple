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
  const [averageRating, setAverageRating] = useState(0);
  const [mostCommonWord, setMostCommonWord] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/phones/${encodeURIComponent(deviceName)}/reviews`);
        setReviews(response.data);
        setLoading(false);

        // Calculate average rating
        const totalRating = response.data.reduce((acc, review) => acc + review.rating, 0);
        setAverageRating((totalRating / response.data.length).toFixed(2));

        // Calculate the most common word excluding stop words
        const comments = response.data.map(review => review.comment.toLowerCase());
        const words = comments.join(' ').match(/\w+/g) || [];
        const wordFrequencies = words.reduce((acc, word) => {
          if (!stopWords.has(word)) {
            acc[word] = (acc[word] || 0) + 1;
          }
          return acc;
        }, {});

        let mostCommon = { word: '', count: 0 };
        for (const [word, count] of Object.entries(wordFrequencies)) {
          if (count > mostCommon.count) {
            mostCommon = { word, count };
          }
        }

        setMostCommonWord(mostCommon.word);

      } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        setError('Failed to load reviews.');
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
    paddingLeft: '80px',
  };
  const headingStyles = {
    marginBottom: '40px', // Increase the distance between the heading and the search bar
  };

  const tableStyles = {
    borderCollapse: 'collapse',
    marginLeft: '0', // Aligns table to the left
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
    width: 'auto', 
    maxWidth: 'none',
    border: '1px solid #ffffff',
  };

  const thStyles = {
    backgroundColor: '#007bff', // Blue header background
    color: 'white',
    padding: '10px',
    borderBottom: '1px solid #ffffff',
    width: '100px', // Sets a fixed width for the "Rating" column
    borderRight: '1px solid #ffffff',
    border: '1px solid #ffffff',
  };

  const tdStyles = {
    padding: '10px',
    borderBottom: '1px solid #ffffff',
    color: 'white',
    borderRight: '1px solid #ffffff',
    border: '1px solid #ffffff',
  };

  const searchContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
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
      <h1 style={headingStyles}>Requested features for {deviceName}</h1>
      <p>Average Rating: {averageRating}</p>
      <p>Most Requested Feature: {mostCommonWord}</p>
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
                <td style={{ ...tdStyles, textAlign: 'center' }}>{review.rating}</td>
                <td style={tdStyles}>{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const stopWords = new Set([
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
    'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
    'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
    'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
    'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
    'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
    'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down',
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here',
    'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
    'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
    'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'change', 
    'nothing', 'say', 'reduce','higher', 'basic', 'best', 'make'
  ]);
export default DeviceReviews;