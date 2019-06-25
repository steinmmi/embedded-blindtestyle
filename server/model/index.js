const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const log = require('../modules/log');


var db;
// Connect to database
MongoClient.connect("mongodb://localhost/", { useNewUrlParser: true },function(error, client) {
    if (error) throw error;
    db = client.db('blindtestyle');
});



let model = {
    songs: {
        getRandom: () => {
            return new Promise((resolve, reject) => {
                db.collection("songs").aggregate([ { $sample: { size: 1 } } ]).toArray((err, doc) => {
                    if(err) reject(err);
                    resolve(doc[0]);
                });
            });
        },
        get: (id) => {
            return new Promise((resolve, reject) => {
                db.collection("songs").findOne({'_id': new ObjectID(id)}, (err, doc) => {
                    if(err) reject(err);
                    resolve(doc);
                });
            });
        },
        insertOne: (song, file) => {
            return new Promise((resolve, reject) => {
            db.collection("songs").insertOne(song, null, function(error, results) {
                if (error) throw error;
                let sampleFile = file;
                sampleFile.mv(`./songs/${results.insertedId}.mp3`, (err) => {
                    if(err) reject(err);
                    log.info('New file uploaded');
                    resolve();
                });
            });
        });
        }
    }
}

module.exports = model;