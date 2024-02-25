var express = require('express');
var router = express.Router();
const { randomUUID } = require('crypto');

const CryptoJS = require('crypto-js');
const { log } = require('console');

// GET all users for testing purposes only
router.get('/', function(req, res) {
  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }
    let sql = "SELECT * FROM users";

    connection.query(sql, (err, data) => {
      if (err) console.log("err", data);
      res.json(data);
    })
  })
});

// GET specific user by ID
router.get('/:userId', function(req, res) {
  const userId = req.params.userId;

  connection.connect((err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    let sql = "SELECT userName FROM users WHERE uuid = ?"; 
    let values = [userId];

    connection.query(sql, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (data.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(data[0]);
    });
  });
});


// POST a new user
router.post('/add', function(req, res, next) {
  let userName = req.body.userName;
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;
  let cryptedPassword = CryptoJS.AES.encrypt(userPassword, "Salt Key").toString();
  let uuid = randomUUID();

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let sql = "INSERT into users (uuid, userName, userEmail, userPassword) VALUES (?, ?, ?, ?)";
    let values = [uuid, userName, userEmail, cryptedPassword];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);
      res.json({ message: "You are logged in", user:uuid });
    })
  })
});


// Login a user
router.post('/login', function(req, res, next) {
  let checkEmail = req.body.userEmail;
  let checkPassword = req.body.userPassword;

  connection.connect((err) => {
      if (err) {
          return res.status(500).json({ error: 'Internal server error' });
      }

      let sql = "SELECT * FROM users WHERE userEmail = ?";
      let values = [checkEmail];

      connection.query(sql, values, (err, data) => {
          if (err) {
              return res.status(500).json({ error: 'Internal server error' });
          }

          if (data.length === 0) {
              return res.status(401).json({ error: 'Invalid email or password' });
          }

          let storedPassword = CryptoJS.AES.decrypt(data[0].userPassword, "Salt Key").toString(CryptoJS.enc.Utf8);

          if (storedPassword === checkPassword) {
              res.json({ message: "You are logged in", user: data[0].uuid });
          } else {
              res.status(401).json({ error: 'Invalid email or password' });
          }
      });
  });
});

module.exports = router;
