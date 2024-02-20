var express = require('express');
var router = express.Router();
const { randomUUID } = require('crypto');

const CryptoJS = require('crypto-js');
const { log } = require('console');

// Get all users
router.get('/', function(req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }
    let sql = "SELECT * FROM users";

    connection.query(sql, (err, data) => {
      if (err) console.log("err", data);
      console.log("to do note", data);
      res.json(data);
    })
  })
});


// add a new user
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


      console.log("new user", data);
      res.json({ message: "You are logged in", user:uuid });
    })
  })
});


// Login user
router.post('/login', function(req, res, next) {
  let checkEmail = req.body.userEmail;
  let checkPassword = req.body.userPassword;

  console.log("HALLÅ EMAIL", checkEmail);
  console.log("HALLÅ LÖÖÖÖSEN", checkPassword);

  connection.connect((err) => {
      if (err) {
          console.log("Error connecting to database:", err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      let sql = "SELECT * FROM users WHERE userEmail = ?";
      let values = [checkEmail];

      connection.query(sql, values, (err, data) => {
          if (err) {
              console.log("Error querying database:", err);
              return res.status(500).json({ error: 'Internal server error' });
          }

          console.log("VAD ÄR DET FÖR EMAIL", checkEmail);

          if (data.length === 0) {
              // No user found with the provided credentials
              return res.status(401).json({ error: 'Invalid email or password' });
          }


          console.log("HEJ HEJ HÄR ÄR DATAN", data);

          let storedPassword = CryptoJS.AES.decrypt(data[0].userPassword, "Salt Key").toString(CryptoJS.enc.Utf8);

          if (storedPassword === checkPassword) {
              // Passwords match, send successful login response
              res.json({ message: "You are logged in", user: data[0].uuid });
          } else {
              // Passwords don't match, send unauthorized response
              res.status(401).json({ error: 'Invalid email or password' });
          }
      });
  });
});

module.exports = router;
