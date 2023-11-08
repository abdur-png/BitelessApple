import mongoose from 'mongoose';
const mongoURI = 'mongodb://ar7165:49fRMJTK@class-mongodb.cims.nyu.edu:21667/ar7165';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Exporting the connection
export default mongoose;

// Define a User Schema
// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }, // Note: Store a hashed version of the password.
//     email: { type: String, required: true, unique: true },
//     // ... any other user related fields
// });

// // Define a Phone Specification Schema
// const PhoneSpecSchema = new mongoose.Schema({
//     brand: { type: String, required: true },
//     model: { type: String, required: true },
//     releaseDate: { type: Date },
//     specifications: {
//         ram: String,
//         storage: String,
//         camera: String,
//         battery: String,
//         os: String,
//         // ... other specifications
//     },
//     reviews: [
//         {
//             reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//             reviewText: String,
//             rating: Number,
//             // ... other review fields
//         },
//     ],
//     // ... any other phone related fields
// });

// // Create the models
// const User = mongoose.model('User', UserSchema);
// const PhoneSpec = mongoose.model('PhoneSpec', PhoneSpecSchema);

// // Export the models for use in other parts of your application
// export { User, PhoneSpec };
 