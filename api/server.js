require('dotenv').config(); 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Phone, Review } = require('./db.js'); // assuming your db.js is in the same directory
const ReviewManager = require('./ReviewManager.js');
const reviewManager = new ReviewManager(Review);
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

console.log('MongoDB URI:', process.env.DSN);
mongoose.connect(process.env.DSN, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
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
app.get('/api/phones/names', async (req, res) => {
  try {
    const phoneNames = await Phone.distinct('phone_name');
    res.json(phoneNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('phone');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/phones/:phoneName/reviews', async (req, res) => {
  try {
    const { phoneName } = req.params;
    const phone = await Phone.findOne({ phone_name: phoneName });
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    const reviews = await Review.find({ phone: phone._id }).populate('phone');
    res.json(reviews);
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
  try {
    let phone = await Phone.findOne({ phone_name: req.params.phoneName });
    if (!phone) {
      phone = new Phone({ phone_name: req.params.phoneName });
      await phone.save();
    }

    const savedReview = await reviewManager.addReview({
      rating: req.body.rating,
      comment: req.body.comment,
      phone: phone._id,
      // user: req.user._id (if needed)
    });

    phone.reviews.push(savedReview._id);
    await phone.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a review by ID
app.put('/api/reviews/:reviewId', async (req, res) => {
  try {
    const updatedReview = await reviewManager.updateReview(req.params.reviewId, req.body);
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a review by ID
app.delete('/api/reviews/:reviewId', async (req, res) => {
  try {
    const result = await reviewManager.deleteReview(req.params.reviewId);
    if (!result) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// Apply the error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 21667;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

