// App.js
import backgroundImage from './website_image.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from './HomePage';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import LoginPage from './loginpage';
import ReviewsDisplay from './ReviewsDisplay';
import ReviewsPage from './ReviewsPage';
import DeviceReviews from './DeviceReviews'
const apiBaseUrl = process.env.REACT_APP_API_URL;


const rootStyle = {
  backgroundColor: 'black',
  color: 'white',
  minHeight: '100vh', // Use minHeight to ensure it covers at least the full height of the viewport
  margin: 0, // Reset default margin
  padding: 0, // Reset default padding
};

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [phoneName, setPhoneName] = useState('');
  const [reviewToEdit, setReviewToEdit] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!phoneName) return;

      try {
        const response = await axios.get(`${apiBaseUrl}/api/phones/${encodeURIComponent(phoneName)}/reviews`);
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
    <Router>
      <div style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
        <Navigation />
      </div>
  
      {/* Background div is fixed to cover the entire screen and stays behind other content */}
      <div style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'fixed', // Fixed position to cover the entire viewport
        top: 0,
        left: 0,
        zIndex: -1 // Lower z-index to keep it behind the content
      }} />
  
      <Routes> 
        <Route path="/" element={<HomePage setPhoneName={setPhoneName} />} />
        <Route path="/reviews" element={
          <>
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
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/reviews-page" element={
          <ReviewsPage
            reviews={reviews}
            addOrUpdateReviewToList={addOrUpdateReviewToList}
            reviewToEdit={reviewToEdit}
            setReviewToEdit={setReviewToEdit}
            removeReviewFromList={removeReviewFromList}
          />
        } />
        <Route path="/phones/:deviceName/reviews" element={<DeviceReviews />} />
        <Route path="/all-reviews" element={<ReviewsDisplay />} /> 
        <Route path="/review-form" element={<ReviewForm 
          addOrUpdateReviewToList={addOrUpdateReviewToList}
          reviewToEdit={null} // You can pass null if the initial state is not needed
          setReviewToEdit={setReviewToEdit}
        />} />
      </Routes>
    </Router>
  );
};  

export default App;
