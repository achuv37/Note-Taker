const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// Get request for notes.
app.get('/notes', (req,res ) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});






app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});