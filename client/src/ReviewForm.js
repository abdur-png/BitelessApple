import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const ReviewForm = ({ addOrUpdateReviewToList, reviewToEdit, setReviewToEdit }) => {
  // Initialize the form state with the first iPhone model as default
  const [phoneModel, setPhoneModel] = useState('iPhone 13');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  // List of iPhone models for the dropdown
  const iphoneModels = [
    'iPhone 15',
    'iPhone 15 Pro',
    'iPhone 15 Pro Max',
    'MacBook Air',
    'MacBook Pro',
    'iPad',
    'iPad Air',
    'iPad Pro',
    'Apple Watch Series 9',
    'Apple Watch Ultra 2',
    'Apple Watch SE',
    'Apple Vision Pro',
    'AirPods Pro',
    'AirPods',
    'AirPods Max',
    'HomePod',

    // Add additional iPhone models here as needed
  ];

  // If editing a review, set the form fields to the current review's values
  useEffect(() => {
    if (reviewToEdit) {
      setPhoneModel(reviewToEdit.phoneName || iphoneModels[0]);
      setRating(reviewToEdit.rating ? reviewToEdit.rating.toString() : '');
      setComment(reviewToEdit.comment || '');
    } else {
      setPhoneModel(iphoneModels[0]);
      setRating('');
      setComment('');
    }
  }, [reviewToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (reviewToEdit) {
        // Edit mode: PUT request to update the existing review
        response = await axios.put(`${apiBaseUrl}/api/reviews/${reviewToEdit._id}`, {
          phoneName: phoneModel,
          rating: parseInt(rating, 10),
          comment
        });
      } else {
        // Create mode: POST request to create a new review
        response = await axios.post(`${apiBaseUrl}/api/phones/${encodeURIComponent(phoneModel)}/reviews`, {
          rating: parseInt(rating, 10),
          comment
        });
      }

      addOrUpdateReviewToList(response.data);
      // Reset the form fields
      setPhoneModel(iphoneModels[0]);
      setRating('');
      setComment('');
      if (reviewToEdit) {
        setReviewToEdit(null); // Exit edit mode
      }
    } catch (error) {
      console.error('Error submitting feature request:', error.response?.data?.message || error.message || 'The request failed');
      alert('Error submitting feature request: ' + (error.response?.data?.message || error.message || 'The request failed'));
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '0',
    padding: '20px'
  };

  const inputStyle = {
    marginBottom: '15px', // More space between form elements
    padding: '12px', // Bigger padding for larger touch targets
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: 'calc(100% - 24px)', // Adjust the width based on padding
    fontSize: '1rem', // Bigger font size for better readability
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    marginTop: '10px',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ maxWidth: '500px', marginLeft: '20px' }}> {/* Container for the form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="phoneModel" style={labelStyle}>Choose Device:</label>
        <select
          id="phoneModel"
          value={phoneModel}
          onChange={(e) => setPhoneModel(e.target.value)}
          style={inputStyle}
        >
          {iphoneModels.map(model => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <label htmlFor="rating" style={labelStyle}>Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1" // Minimum value for rating
          max="5" // Maximum value for rating
          style={inputStyle}
        />

        <label htmlFor="comment" style={labelStyle}>Feature Request Details:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={inputStyle}
          rows="4" // Set the number of rows for the textarea to define its height
        />

        <button type="submit" style={buttonStyle}>Submit Feature Request</button>
      </form>
    </div>
  );
};

export default ReviewForm;
