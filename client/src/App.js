// import React, { useState } from 'react';
// import axios from 'axios';

// const ReviewForm = () => {
//   const [model, setModel] = useState('');
//   const [review, setReview] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('/api/reviews', { model, review });
//       console.log(response.data);
//       // Add logic to handle successful submission (like clearing the form or providing user feedback)
//     } catch (error) {
//       console.error(error);
//       // Handle errors (e.g., display an error message to the user)
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Phone Model:
//         <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
//       </label>
//       <label>
//         Review:
//         <textarea value={review} onChange={(e) => setReview(e.target.value)} />
//       </label>
//       <button type="submit">Submit Review</button>
//     </form>
//   );
// };

// export default ReviewForm;import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import React, { useState, useEffect } from 'react';


const App = () => {
  const [reviews, setReviews] = useState([]);
  // Replace 'PHONE_NAME_HERE' with the actual name of the phone you want to query.
  const phoneId = 'PHONE_NAME_HERE'; // Example: 'iPhone-12'

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Ensure the URL is correct based on your backend API structure
        const response = await axios.get(`/api/phones/${encodeURIComponent(phoneId)}/reviews`);
        setReviews(response.data);
      } catch (error) {
        // Make sure to access the correct error property based on the actual error object structure
        console.error('Error fetching reviews:', error.response?.data?.message || error.message);
      }
    };
    
    if (phoneId !== 'PHONE_NAME_HERE') {
      fetchReviews();
    }
  }, [phoneId]);

  const addReviewToList = (review) => {
    setReviews([...reviews, review]);
  };

  const removeReviewFromList = (id) => {
    setReviews(reviews.filter((review) => review._id !== id));
  };

  const setReviewToEdit = (review) => {
    // Set state for review to be edited, and pass it down to ReviewForm
    // Implementation depends on how you want to handle editing reviews.
  };

  return (
    <div>
      <h1>Phone Reviews</h1>
      <ReviewForm phoneId={phoneId} addReviewToList={addReviewToList} />
      <ReviewsList
        reviews={reviews}
        removeReviewFromList={removeReviewFromList}
        setReviewToEdit={setReviewToEdit}
      />
    </div>
  );
};

export default App;
