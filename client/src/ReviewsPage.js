import React from 'react';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

// Add props if there are any to pass down to the ReviewForm or ReviewsList
const ReviewsPage = ({ reviews, addOrUpdateReviewToList, reviewToEdit, setReviewToEdit, removeReviewFromList }) => {
    return (
      <div style={{ backgroundColor: 'white', height: '100vh' }}>
        <h1>Phone Reviews</h1>
        <ReviewForm
          addOrUpdateReviewToList={addOrUpdateReviewToList}
          reviewToEdit={reviewToEdit}
          setReviewToEdit={setReviewToEdit}
        />
        <ReviewsList
          reviews={reviews}
          removeReviewFromList={removeReviewFromList}
          setReviewToEdit={setReviewToEdit}
        />
      </div>
    );
  };
  

export default ReviewsPage;
