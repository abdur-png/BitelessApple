import mongoose from 'mongoose';
const mongoURI = 'mongodb://ar7165:49fRMJTK@class-mongodb.cims.nyu.edu:21667/ar7165';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Exporting the connection
export default mongoose;

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
      camera: String,
      battery: String,
      os: String,
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
  
  const Review = mongoose.model('Review', reviewSchema);
  
  const Phone = mongoose.model('Phone', phoneSchema);
  
  const User = mongoose.model('User', userSchema);

// // Export the models for use in other parts of your application
export { User, Phone, Review };
 