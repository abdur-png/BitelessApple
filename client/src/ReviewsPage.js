//ReviewsPage.js
import React from 'react';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

const ReviewsPage = ({
  reviews,
  addOrUpdateReviewToList,
  reviewToEdit,
  setReviewToEdit,
  removeReviewFromList
}) => {

  const pageStyles = {
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '100px',
  };

  // Inline style for the header
  const headerStyles = {
    margin: '0 0 30px', // Reduced space below the header to accommodate more content
  };

  // Inline style for the description paragraph
  const descriptionStyles = {
    textAlign: 'center',
    maxWidth: '670px', // Max width for better readability
    marginBottom: '30px', // Space below the description
  };

  // Inline style for the encouragement text
  const encouragementStyles = {
    textAlign: 'center',
    fontSize: '1.1rem', // Slightly larger font for emphasis
    fontWeight: 'bold',
    margin: '20px 0', // Space above and below the text
  };

  return (
    <div style={pageStyles}>
      <h1 style={headerStyles}>Feature Request - Help Us Improve!</h1>
      <p style={descriptionStyles}>
        Your feedback is vital to us! Tell us what features you'd like to see on your favorite devices.
      </p>
      <ReviewForm
        addOrUpdateReviewToList={addOrUpdateReviewToList}
        reviewToEdit={reviewToEdit}
        setReviewToEdit={setReviewToEdit}
      />
      <p style={encouragementStyles}>
        Your ideas bring us closer to perfection – we can't wait to hear them!
      </p>
    </div>
  );
};

export default ReviewsPage;
