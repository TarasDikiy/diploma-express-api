const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

//Midleweare
app.use(bodyParser.json());
app.use(cors());

//Routs
userRoute = require('./Routes/userRoute');
app.use('/user', userRoute);

//MongoDB connection
mongoose.connect(process.env.ATLAS_URI, () => {
    console.log('Successful connection to MongoDB');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });