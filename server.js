const express = require('express');
const fs = require('fs');
const path = require('path');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 4900;

const app = express();
// Middleware
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
// This gets notes saved and joins it in db.json
app.get('/api/notes' , (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

// post request for adding notes
app.post('/api/notes' , (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    const noteString = JSON.stringify(notes);
    fs.writeFileSync('./db/db.json', noteString , (err, data)  => {
      res.json(notes);
    });
  });

// Deleting notes
app.delete("/api/notes/:id" , (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((note) => note.id !== req.params.id);
  const noteString = JSON.stringify(delNote);
  fs.writeFileSync('./db/db.json', noteString , (err, data)  => {
    res.json(delNote);
});
});



// Home page
app.get('/', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '/public/index.html'));
})


// Express-js wildcard route
app.get('*', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '/public/index.html'));
})







app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});