import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const ReviewForm = ({ addOrUpdateReviewToList, reviewToEdit, setReviewToEdit }) => {
  const [phoneModel, setPhoneModel] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
  ];

  useEffect(() => {
    if (reviewToEdit) {
      setPhoneModel(reviewToEdit.phoneName || iphoneModels[0]);
      setRating(reviewToEdit.rating ? reviewToEdit.rating.toString() : '');
      setComment(reviewToEdit.comment || '');
    }
  }, [reviewToEdit, iphoneModels]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Input validation
    if (!rating.trim() || !comment.trim()) {
      setErrorMessage('Rating and comment cannot be empty.');
      return;
    }

    // Submit form
    try {
      let response;
      if (reviewToEdit) {
        // Edit mode
        response = await axios.put(`${apiBaseUrl}/api/reviews/${reviewToEdit._id}`, {
          phoneName: phoneModel,
          rating: parseInt(rating, 10),
          comment,
        });
      } else {
        // Create mode
        response = await axios.post(`${apiBaseUrl}/api/phones/${encodeURIComponent(phoneModel)}/reviews`, {
          rating: parseInt(rating, 10),
          comment,
        });
      }
      
      addOrUpdateReviewToList(response.data);
      setSuccessMessage('Request submitted successfully!');
      
      // Reset form fields
      setPhoneModel('');
      setRating('');
      setComment('');
      
      if (reviewToEdit) {
        setReviewToEdit(null);
      }
      
    } catch (error) {
      setErrorMessage('Error submitting review: ' + (error.response?.data?.message || error.message || 'Please try again later.'));
    }
  };

  return (
    <div className="review-form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    {successMessage && (
      <div style={{ color: 'green', marginBottom: '20px' }}>{successMessage}</div> // Added marginBottom here
    )}
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="phoneModel">Choose Device:</label>
        <select
          id="phoneModel"
          value={phoneModel}
          onChange={(e) => setPhoneModel(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        >
          <option value=""> </option>
          {iphoneModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="comment">Feature Request Details:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <button type="submit" className="submit-button" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
          Submit Feature Request
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;