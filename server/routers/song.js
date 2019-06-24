
const express = require('express')
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
const Model = require('../model');

router.post("/add", function(req, res) {
    res.send(Model.songs.insertOne(req.body, req.files.file))
});

router.get('/get/:id', (req, res) => {
    let path = `./songs/${req.params.id}.mp3`;
    try {
        if (fs.existsSync(path)) {
          res.download(path)
        }
        else throw new Error(`No such file : ${req.params.id}.mp3`)
      } catch(err) {
        res.send(err.message)
      }
});
router.get('/info/:id', (req, res) => {
    let id = req.params.id
    res.send(Model.songs.get(id))
});

router.get('/get', (req, res) => {
    res.send('oui')
    Model.songs.getRandom();
});
module.exports = router;