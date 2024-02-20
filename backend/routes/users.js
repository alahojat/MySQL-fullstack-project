var express = require('express');
var router = express.Router();
const { randomUUID } = require('crypto');

const CryptoJS = require('crypto-js');

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
router.post('/', function(req, res, next) {

  let userName = req.body.userName;
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;
  let cryptedPassword = CryptoJS.AES.encrypt(userPassword, "Salt Key").toString();
  let uuid = randomUUID();

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "INSERT into users (uuid, userName, userEmail, userPassword) VALUES (?, ?, ?, ?)";
    let values = [uuid, userName, userEmail, cryptedPassword];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);

      console.log("new user", data);
      res.json({message: "Your new user is added"});
    })
  })
});

module.exports = router;
