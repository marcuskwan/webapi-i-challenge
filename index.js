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
        .then(users => res.status(200).json(users) )
        .catch(error => res.status(500).json({ error: "The users information could not be retrieved." })) )
});

// get user by id
server.get("/api/users/:id", (req, res) => {
    // getting the user id
    const userId = req.params.id;
    Users.findById(userId)
        .then(user => {
            // if array (user) is empty.., can't use === [] because no arrays are the same unless assigned a ref
            if (user.length === 0) {
                res.status(400)
                    .json({ message: "The user with the specified ID does not exist." })
            }
            // else return user json
            else {
                res.status(200)
                    .json(user)
            }
        })
        .catch(error => res.status(404)
            .json({ error: "The user information could not be retrieved." }))
})

//POST
// create a user
server.post("/api/users", (req, res) => {
// newUser
  const newUser = req.body;

  Users.insert(newUser)
      .then(newUserId => {
          // if name or bio was missing..
          if (!newUser.name || !newUser.bio) {
              res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
          }
          // otherwise return the newUserId json
          else {
              res.status(201).json(newUserId);
          }
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    });
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
              res.status(400).json({ message: "The user with the specified ID does not exist." })
          }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." });
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
