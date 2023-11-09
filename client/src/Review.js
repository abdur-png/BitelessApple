import React from 'react';
import axios from 'axios';

const Review = ({ review, removeReviewFromList, setReviewToEdit }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/reviews/${review._id}`);
      removeReviewFromList(review._id);
    } catch (error) {
      console.error('Error deleting review:', error.response.data.message);
    }
  };

  return (
    <div>
      <h4>Rating: {review.rating}</h4>
      <p>{review.comment}</p>
      <button onClick={() => setReviewToEdit(review)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Review;
