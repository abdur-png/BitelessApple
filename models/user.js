import mongoose from './db.mjs';

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

const User = mongoose.model('User', userSchema);

export default User;
