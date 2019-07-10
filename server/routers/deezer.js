
const express = require('express')
const router = express.Router();
const Deezer = require('../modules/deezer')

const MAX_RESULT_PROVIDED = 5;

router.get('/search', function (req, res) {
    if(!req.query.q) {
        res.send('Invalid query')
        return;
    }

    let max = req.query.max || MAX_RESULT_PROVIDED;

    Deezer.findTracks(encodeURI(req.query.q)).then(val => {
        let trackArrays = val.data;
        trackArrays = trackArrays.splice(0, max);
        res.send(trackArrays)
    })
})

router.get('/album/:id', function (req, res) {
    let id = req.params.id;
    Deezer.getAlbum(id).then(val => {
        res.send(val);
    });
})

module.exports = router;