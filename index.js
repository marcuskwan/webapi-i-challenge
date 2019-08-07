// import express
const express = require("express");

// import data file
const Users = require("./data/db.js"); //

// users has find(), findById(), insert(), remove(), update() methods

// create server
const server = express();

// make express parse JSON
server.use(express.json());

// GET
// get users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(error =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." }),
    );
});

// get user by id
server.get('/api/users', (req, res) => {
  const id = req.params.id
  Users
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "Can't find user})
        }
        })
    .catch(err => {
      res.status(500).json({ message: 'there was an error while trying to retrieve user' })
    })
});

//POST
// create a user
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  if (userInfo.name && userInfo.bio) {
    Users
      .insert(newUser)
      .then(id => {
        Users
          .findById(id)
          .then(user => {
            res.status(200).json(user)
          })
          .catch(err => {
            res.status(404).json(message: 'user with the specified id could not be found')
          })
      })
      .catch(err => {
        res.status(500).json({ message: 'there was an error while saving user' })
      })
  } else {
    res.status(400).json({ message: 'please provide a name and bio for this user' })
  }
});

//DELETE
// delete a user by id
server.delete("/api/users/:id", (req, res) => {
  // deletingUserId
  const deletingUserId = req.params.id;

  Users.remove(deletingUserId)
    .then(deletingUserId => {
      if (deletingUserId) {
        res.status(200).json(deletingUserId);
      } else {
        res
          .status(400)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

// update a user
server.put("/api/users/:id", (req, res) => {
  const updatingUserId = req.params.id;
  const { name, bio } = req.body;
  console.log("logging req.body", req.body);

  if (name && bio) {
    Users.update(updatingUserId, req.body)
      .then(idResponse => {
        if (idResponse === 1) {
          res.status(200).json(idResponse);
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "we cannot save the updates" });
      });
  } else {
    res.status(400).json({ message: "Please provide name and bio" });
  }
});

const port = 8000;
server.listen(port, () => console.log("\nserver's golden\n"));
