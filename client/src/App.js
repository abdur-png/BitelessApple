import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [phoneName, setPhoneName] = useState('');
  const [reviewToEdit, setReviewToEdit] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!phoneName) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/phones/${encodeURIComponent(phoneName)}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error.response?.data?.message || error.message);
      }
    };

    fetchReviews();
  }, [phoneName]);

  const addOrUpdateReviewToList = (review) => {
    if (reviewToEdit) {
      setReviews(reviews.map(r => (r._id === review._id ? review : r)));
    } else {
      setReviews([...reviews, review]);
    }
    setReviewToEdit(null);
  };

  const removeReviewFromList = (id) => {
    setReviews(reviews.filter((review) => review._id !== id));
  };

  return (
    <div>
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

export default App;
