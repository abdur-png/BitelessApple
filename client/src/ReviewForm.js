import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [phoneName, setPhoneName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an endpoint to add a review by phone name
      const response = await axios.post(`/api/phones/${phoneName}/reviews`, {
        rating,
        comment
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting review:', error.response.data);
    }
  };

  return (
    <form onSubmit={submitReview}>
      <label htmlFor="phoneName">Phone Name:</label>
      <input
        type="text"
        id="phoneName"
        value={phoneName}
        onChange={(e) => setPhoneName(e.target.value)}
      />
      
      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <label htmlFor="comment">Comment:</label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
