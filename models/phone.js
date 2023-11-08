import mongoose from './db.mjs';

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

const Phone = mongoose.model('Phone', phoneSchema);

export default Phone;
