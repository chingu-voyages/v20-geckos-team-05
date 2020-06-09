const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

// Connect To Mongodb
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, './client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));