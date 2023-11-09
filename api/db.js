const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.DSN; // Assuming you store your MongoDB URI in an environment variable for security

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  savedPhones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phone'
  }]
});

const phoneSchema = new mongoose.Schema({
  brand: String,
  model: String,
  specs: {
    ram: String,
    storage: String,
    // camera: String,
    battery: String,
    // os: String,
    screensize: String,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  phone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phone'
  },
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
const Phone = mongoose.model('Phone', phoneSchema);
const Review = mongoose.model('Review', reviewSchema);

// Export the models for use in other parts of your application
module.exports = {
  mongoose, // exporting mongoose might be useful if you need the connection elsewhere
  User,
  Phone,
  Review
};
