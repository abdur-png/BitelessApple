import React from 'react';
import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_URL;
const Review = ({ review, removeReviewFromList, setReviewToEdit }) => {
  const handleDelete = async () => {
    try {
      // Note that the authentication header has been removed
      const response = await axios.delete(`${apiBaseUrl}/api/reviews/${review._id}`);

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
