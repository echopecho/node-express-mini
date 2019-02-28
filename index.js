// implement your API here
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

const server = express();
const port = '8000';

server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).json({error: 'The users information could not be retrieved.'});
    })
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if(user) {
        res.send(user);
      } else {
        res.status(404).json({error: "The user with the specified ID does not exist."});
      }
    })
    .catch(() => {
      res.status(500).json({error: 'The users information could not be retrieved.'});
    })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if(newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(() => {
        res.status(201).json(newUser);
      })
      .catch (() => {
        res.status(500).json({error: "There was an error while saving the user to the database."});
      })
  } else {
    res.status(400).json({error: "Please provide name and bio for the user."});
  }
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if(user) {
        db.remove(id)
          .then(() => {
            res.status(201).json({success: "User was deleted."});
          })
          .catch(() => {
            res.status(500).json({error: "The user could not be removed."});
          })
      } else {
        res.status(404).json({error: "The user with the specified ID does not exist."});
      }
    })
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;

  db.findById(id)
    .then(user => {
      if(user) {
        if(updateUser.name && updateUser.bio) {
        db.update(id, updateUser)
          .then(test => {
            if(test === 1) {
              db.findById(id)
                .then(updated => {
                  res.status(200).json(updated)
                })
            }
          })
          .catch(() => {
            res.status(500).json({error: "The user information could not be modified."});
          })
        } else {
          res.status(400).json({errorMessage: "Please provide name and bio for the user."});
        }
      } else {
        res.status(404).json({error: "The user with the specified ID does not exist."});
      }
  })
})



server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})