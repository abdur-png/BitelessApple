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

mongoose.connect("mongodb://ar7165:49fRMJTK@class-mongodb.cims.nyu.edu/ar7165",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB!"))
  .catch(console.error);

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

app.post('/login', async (req, res) => {
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
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while trying to log in', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
