const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));







app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});