import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewForm = ({ addOrUpdateReviewToList, reviewToEdit, setReviewToEdit }) => {
  // Initialize the form state
  const [phoneName, setPhoneName] = useState(''); // Use this state for the phone name input
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  // If editing a review, set the form fields to the current review's values
  useEffect(() => {
    if (reviewToEdit) {
      setPhoneName(reviewToEdit.phoneName || ''); // Ensure phoneName is not undefined
      setRating(reviewToEdit.rating ? reviewToEdit.rating.toString() : ''); // Convert rating to string
      setComment(reviewToEdit.comment || '');
    } else {
      // Reset to default if not editing
      setPhoneName('');
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
        response = await axios.put(`http://localhost:3000/api/reviews/${reviewToEdit._id}`, {
          rating: parseInt(rating),
          comment
        });
      } else {
        // Create mode: POST request to create a new review
        response = await axios.post(`http://localhost:3000/api/phones/${encodeURIComponent(phoneName)}/reviews`, {
          rating: parseInt(rating),
          comment
        });
      }

      addOrUpdateReviewToList(response.data);
      // Reset the form fields
      setPhoneName('');
      setRating('');
      setComment('');
      if (reviewToEdit) {
        setReviewToEdit(null); // Exit edit mode
      }
    } catch (error) {
      console.error('Error submitting review:', error.response?.data?.message || error);
      alert('Error submitting review: ' + (error.response?.data?.message || 'The request failed'));
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
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%' // Ensure input fields use full width
  };

  const buttonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    marginTop: '10px'
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ maxWidth: '500px', marginLeft: '20px' }}> {/* Container for the form */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="phoneName" style={labelStyle}>Phone Name:</label>
        <input
          type="text"
          id="phoneName"
          value={phoneName}
          onChange={(e) => setPhoneName(e.target.value)}
          style={inputStyle}
        />

        <label htmlFor="rating" style={labelStyle}>Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={inputStyle}
        />

        <label htmlFor="comment" style={labelStyle}>Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;