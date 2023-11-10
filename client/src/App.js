
import axios from 'axios';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import React, { useState, useEffect } from 'react';


const App = () => {
  const [reviews, setReviews] = useState([]);
  const [phoneName, setPhoneName] = useState(''); // Initialize with an empty string or actual default phone name

  useEffect(() => {
    const fetchReviews = async () => {
      if (!phoneName) return; // Do not fetch if phoneName is not set

      try {
        const response = await axios.get(`http;//localhost:3000/api/phones/${encodeURIComponent(phoneName)}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error.response?.data?.message || error.message);
      }
    };
    
    fetchReviews();
  }, [phoneName]);

  const addReviewToList = (review) => {
    setReviews([...reviews, review]);
  };

  const removeReviewFromList = (id) => {
    setReviews(reviews.filter((review) => review._id !== id));
  };

  const setReviewToEdit = (review) => {
    
  };

  return (
    <div>
      <h1>Phone Reviews</h1>
      <ReviewForm phoneName={phoneName} addReviewToList={addReviewToList} />
      <ReviewsList
        reviews={reviews}
        removeReviewFromList={removeReviewFromList}
        setReviewToEdit={setReviewToEdit}
      />
    </div>
  );
};

export default App;