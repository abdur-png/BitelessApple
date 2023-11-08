const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./db.js') ;

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://ar7165:49fRMJTK@class-mongodb.cims.nyu.edu/ar7165",{
    // useNewURLParser:true,
    // useUnitedTopology:true
})  
    .then(() => console.log("Connected to DB"))
    .catch(console.err);

app.listen(21667, ()=> console.log(`Server listening on port 21667`));