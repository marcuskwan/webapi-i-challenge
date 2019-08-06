// import express
const express = require("express");

// import data file
const Users = require("./data/db.js"); //

// users has find(), findById(), insert(), remove(), update() methos

// create server
const server = express();

// make express parse JSON
server.use(express.json());

// GET requests
// get users
server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => res.status(200).json(users) )
        .catch(error => res.status(500).json({ message: 'error getting list of users' })) )
});

// get user by id
server.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    Users.findById(userId)
        .then(user=>res.status(200).json())
    .catch(error=>res.status(500).json({message: 'error finding user by id'}))
})

//POST
// create a user
server.post("/api/users", (req, res) => {

  const newUser = req.body;

  Users.insert(newUser)
    .then(newUserId => {
      res.status(200).json(newUserId);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding new user" });
    });
});

//DELETE
// delete a user by id
server.delete("/api/users/:id", (req, res) => {
  const deletingUserId = req.params.id;

  Users.remove(deletingUserId)
    .then(deletingUserId => {
      res.status(200).json(deletingUserId);
    })
    .catch(error => {
      res.status(500).json({ message: "error removing user" });
    });
});

// update a user
server.put("/api/users/:id", (req, res) => {
  const updatingUserId = req.params.id;
  const updatedUser = req.body;

  Users.update(updatingUserId, updatedUser)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating user" });
    });
});

const port = 8000;
server.listen(port, () => console.log("\napi running\n"));
