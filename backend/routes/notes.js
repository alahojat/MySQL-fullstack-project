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

// Get all notes for specific user
router.get('/:userID', function(req, res, next) {
  const userID = req.params.userID;

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }
    let sql = "SELECT * FROM notes WHERE userID = ?";

    connection.query(sql, [userID], (err, data) => {
      if (err) console.log("err", data);
      console.log("Notes for user", userID, ":", data);
      res.json(data);
    })
  })
});

// add a new note
router.post('/add', function(req, res, next) {

  let noteTitle = req.body.title;
  let noteText = req.body.noteText;
  let userID = req.body.uuid;
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

// edit a note
router.put('/edit/:noteID', function(req, res, next) {
  let noteID = req.params.noteID
  let noteTitle = req.body.title;
  let noteText = req.body.noteText;
 

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "UPDATE notes SET title = ?, noteText = ? WHERE uuid = ?";
    let values = [noteTitle, noteText, noteID];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);

      console.log("Your note is updated!");
      res.json({message: "Your note is updated!"});
    })
  })
});



// delete a specific note
router.delete('/delete', function(req, res, next) {

let specificNote = req.body.uuid;

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "DELETE from notes WHERE uuid = ?";
    let values = [specificNote];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);

      console.log("deleted note", data);
      res.json({message: "This note is deleted"});
    })
  })
});


module.exports = router;
