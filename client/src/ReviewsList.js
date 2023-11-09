import React from 'react';
import Review from './Review';

const ReviewsList = ({ reviews, removeReviewFromList, setReviewToEdit }) => {
  return (
    <div>
      {reviews.map(review => (
        <Review
          key={review._id}
          review={review}
          removeReviewFromList={removeReviewFromList}
          setReviewToEdit={setReviewToEdit}
        />
      ))}
    </div>
  );
};

export default ReviewsList;
