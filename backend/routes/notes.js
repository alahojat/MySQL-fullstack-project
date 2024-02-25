var express = require('express');
var router = express.Router();
const { randomUUID } = require('crypto');

const connection = require('../lib/conn.js');

// GET all notes for testing purposes only
router.get('/', function(req, res) {
  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "SELECT * FROM notes";

    connection.query(sql, (err, data) => {
      if (err) console.log("err", data);
      res.json(data);
    })
  })
});

// GET all notes for specific user using ID
router.get('/:userID', function(req, res) {
  const userID = req.params.userID;

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "SELECT * FROM notes WHERE userID = ?";

    connection.query(sql, [userID], (err, data) => {
      if (err) console.log("err", data);
      res.json(data);
    })
  })
});

// POST add a new note for a specific user
router.post('/add', function(req, res, next) {
  let noteTitle = req.body.title;
  let noteText = req.body.noteText;
  let userID = req.body.uuid;
  let noteID = randomUUID();

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    let sql = "INSERT into notes (title, noteText, userID, uuid) VALUES (?, ?, ?, ?)";
    let values = [noteTitle, noteText, userID, noteID];

    connection.query(sql, values, (err, data) => {
      if (err) {
        console.log("err", data);
        return res.status(500).json({ error: "Error adding new note" });
      }
      
      let newNote = {
        title: noteTitle,
        noteText: noteText,
        userID: userID,
        uuid: noteID
      };

      return res.status(201).json(newNote);
    });
  });
});

// PUT edit an existing note
router.put('/edit/:noteID', function(req, res) {
  let noteID = req.params.noteID
  let noteText = req.body.noteText;
 
  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "UPDATE notes SET noteText = ? WHERE uuid = ?";
    let values = [noteText, noteID];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);
     res.json({ noteID: noteID, noteText: noteText });
    })
  })
});


// DELETE a specific note for a user
router.delete('/delete', function(req, res) {
let specificNote = req.body.uuid;

  connection.connect((err) => {
    if (err) {
      console.log("err", err);
    }

    let sql = "DELETE from notes WHERE uuid = ?";
    let values = [specificNote];

    connection.query(sql, values, (err, data) => {
      if (err) console.log("err", data);
    res.json(values);
    })
  })
});


module.exports = router;
