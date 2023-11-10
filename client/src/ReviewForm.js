import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = () => {
  const [phoneName, setPhoneName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      // Ensure phoneName is correctly set from the input field
      if (!phoneName) {
        throw new Error('Phone name is required.');
      }

      const response = await axios.post(`http://localhost:3000/api/phones/${encodeURIComponent(phoneName)}/reviews`, {
        rating,
        comment
      });

    //   const addReviewToList = (newReview) => {
    //     setReviews(currentReviews => [...currentReviews, newReview]);
    //   };

      console.log(response.data);
    } catch (error) {
      // Gracefully inform the user of a failure
      alert(error.response?.data?.message || 'Error submitting review.');
      console.error('Error submitting review:', error.response?.data?.message || error);
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
