var express = require('express');
var router = express.Router();
const { randomUUID } = require('crypto');

const connection = require('../lib/conn.js');


// Get all notes
router.get('/', function(req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }
    let sql = "SELECT * FROM notes";

    connection.query(sql, (err, data) => {
      if (err) console.log("err", data);
      console.log("to do note", data);
      res.json(data);
    })
  })
});

// add a new note
router.post('/', function(req, res, next) {

  let noteTitle = req.body.title;
  let noteText = req.body.noteText;
  let userID = req.body.userID;
  let noteID = randomUUID();

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "INSERT into notes (title, noteText, userID, uuid) VALUES (?, ?, ?, ?)";
    let values = [noteTitle, noteText, userID, noteID];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);

      console.log("to do note", data);
      res.json({message: "New note is saved"});
    })
  })
});


module.exports = router;
