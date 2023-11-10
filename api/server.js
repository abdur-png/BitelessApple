require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
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


mongoose.connect(process.env.DSN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
  .then(() => console.log("Connected to DB!"))
  .catch(console.error);

  const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ message: error.message || "An unexpected error occurred" });
  };
  app.use(errorHandler);
// CREATE a new phone

app.post('/api/phones', async (req, res) => {
  try {
    const newPhone = new Phone(req.body);
    const savedPhone = await newPhone.save();
    res.status(201).json(savedPhone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all phones
app.get('/api/phones', async (req, res) => {
  try {
    const phones = await Phone.find();
    res.json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// app.get('//api/phones/:id', async (req, res) => {
//   console.log("text 1, 2");
// });
// READ a single phone by ID
app.get('/api/phones/:id', async (req, res) => {
  console.log(req.params.id)
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
app.patch('/api/phones/:id', async (req, res) => {
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
app.delete('/api/phones/:id', async (req, res) => {
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
app.post('/api/phones/:phoneName/reviews', async (req, res) => {
  console.log(req.params.phoneName);
  const { phoneName } = req.params;
  const { rating, comment } = req.body;
  try {
    let phone = await Phone.findOne({ phone_name: phoneName });
      
    if (!phone) {
      phone = new Phone({ phone_name: phoneName });
      await phone.save();
    }
    console.log(phone);

    const newReview = new Review({
      rating,
      comment,
      phone: phone._id,
      // user: req.user._id
    });

    const savedReview = await newReview.save();
    phone.reviews.push(savedReview._id);
    await phone.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a review by ID
app.put('/api/reviews/:reviewId', async (req, res) => {
  const { rating, comment } = req.body;
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a review by ID
app.delete('/api/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    // Using deleteOne with the condition directly
    const result = await Review.deleteOne({ _id: reviewId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Apply the error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});