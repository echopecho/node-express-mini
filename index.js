// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
const port = '8000';

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).json({error: 'The users information could not be retrieved.'});
    })
});

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if(newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(() => {
        res.status(201).json(newUser);
      })
      .catch (() => {
        res.status(500).json({error: "There was an error while saving the user to the database."})
      })
  } else {
    res.status(400).json({error: "Please provide name and bio for the user."})
  }
})


server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})