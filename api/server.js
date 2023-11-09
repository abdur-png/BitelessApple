require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Phone, Review } = require('./db.js'); // assuming your db.js is in the same directory

const app = express();

app.use(express.json());
app.use(cors());

const JWT_SECRET = "ILOVEAIT"; 

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token is missing or invalid' });
  }

  const token = authHeader.substring(7); // Cut "Bearer " from the header to get the token

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};


mongoose.connect("mongodb://ar7165:49fRMJTK@class-mongodb.cims.nyu.edu/ar7165",{
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to DB!"))
  .catch(console.error);

  const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ message: error.message || "An unexpected error occurred" });
  };
  app.use(errorHandler);
// CREATE a new phone
app.post('/phones', async (req, res) => {
  try {
    const newPhone = new Phone(req.body);
    const savedPhone = await newPhone.save();
    res.status(201).json(savedPhone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all phones
app.get('/phones', async (req, res) => {
    console.log("GET request received for /phones");
    try {
      const phones = await Phone.find();
      console.log("Phones found:", phones);
      res.json(phones);
    } catch (error) {
      console.error("Error fetching phones:", error);
      res.status(500).json({ message: error.message });
    }
  });
  

// READ a single phone by ID
app.get('/phones/:id', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a phone by ID
app.patch('/phones/:id', async (req, res) => {
  try {
    const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json(phone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a phone by ID
app.delete('/phones/:id', async (req, res) => {
  try {
    const phone = await Phone.findByIdAndDelete(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json({ message: 'Phone deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.hash); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' }); // Tokens should have an expiration

    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
});

app.post('/api/phones/:phoneModel/reviews', async (req, res) => {
  try {
    // Find the phone by name (assuming phoneName is unique)
    const phone = await Phone.findOne({ model: req.params.phoneName });
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }

    // Create a new review with the phone ID and the review data
    const newReview = new Review({
      ...req.body,
      phone: phone._id,
      user: req.user._id
    });

    // Save the review
    const savedReview = await newReview.save();

    // Optionally, add the review to the phone's reviews array
    phone.reviews.push(savedReview._id);
    await phone.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Edit a review
app.put('/reviews/:reviewId', authenticate, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.reviewId;

    // Find the review and update it
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: req.user._id }, // ensure that the review belongs to the user
      { rating, comment },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found or user not authorized to edit this review' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a review
app.delete('/reviews/:reviewId', authenticate, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Find the review and delete it
    const review = await Review.findOneAndDelete({ _id: reviewId, user: req.user._id });

    if (!review) {
      return res.status(404).json({ message: 'Review not found or user not authorized to delete this review' });
    }

    // Remove the review from the associated phone
    await Phone.findByIdAndUpdate(review.phone, { $pull: { reviews: review._id } });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    // stack trace should not be returned in production
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
