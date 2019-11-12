
const express = require('express')
const router = express.Router();
const fs = require('fs');
const Model = require('../model');

router.post("/add", function(req, res) {
    Model.songs.insertOne(req.body, req.files.file).then(() => {
        res.send(true);
    }).catch(err => {
        res.send(err);
    })
});

router.get('/getAll', (req, res) => {
    Model.songs.getAll().then(val => {
        res.send(JSON.stringify(val))
    })
})
router.get('/get/:id', (req, res) => {
    let path = `./songs/${req.params.id}.mp3`;
    try {
        if (fs.existsSync(path)) {
            res.download(path);
        }
        else throw new Error(`No such file : ${req.params.id}.mp3`)
    } catch(err) {
        res.send(err.message)
    }
});
router.get('/info/:id', (req, res) => {
    let id = req.params.id;
    Model.songs.get(id).then(val => {
        res.send(JSON.stringify(val));
    }).catch(err => {
        res.send(err);
    });
});
module.exports = router;