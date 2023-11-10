import React from 'react';
import axios from 'axios';

const Review = ({ review, removeReviewFromList, setReviewToEdit }) => {
  const handleDelete = async () => {
    try {
      // Note that the authentication header has been removed
      const response = await axios.delete(`http://localhost:3000/api/reviews/${review._id}`);

      // If the delete was successful, remove the review from the list
      if (response.status === 200) {
        removeReviewFromList(review._id);
      }
    } catch (error) {
      console.error('Error deleting review:', error.response?.data?.message || error);
      alert('Error deleting review: ' + (error.response?.data?.message || 'The request failed'));
    }
  };

  const handleEdit = () => {
    setReviewToEdit(review);
  };

  return (
    <div>
      <h4>Rating: {review.rating}</h4>
      <p>{review.comment}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Review;
