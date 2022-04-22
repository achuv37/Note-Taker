const express = require('express');
const fs = require('fs');
const path = require('path');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 5001;

const app = express();

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// Get request for notes.
app.get('/notes', (req,res ) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Get request for api/notes
app.get('/api/notes' , (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
  });
});
// post request for adding notes
app.post('/api/notes' , (req, res) => {
  fs.readFile('./db/db.json', 'utf8' , (err,data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    const noteString = JSON.stringify(notes);
    fs.writeFile('./db/db.json', noteString , (err, data)  => {
      res.json(newNote);
    });
  });
});




// Express-js wildcard route
app.get('*', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '/public/index.html'));
})







app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});