const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const log = require('../modules/log')

let model = {
    songs: {
        getRandom: () => {
            return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost/", { useNewUrlParser: true },function(error, client) {
                if (error) throw error;
                db = client.db("blindtestyle");
                db.collection("songs").aggregate([ { $sample: { size: 1 } } ]).toArray((err, doc) => {
                    resolve(doc[0])
                });
            })
        })
        },
        get: (id) => {
            MongoClient.connect("mongodb://localhost/", { useNewUrlParser: true },function(error, client) {
                if (error) throw error;
                db = client.db("blindtestyle");
                db.collection("songs").findOne({'_id': new ObjectID(id)}, (err, doc) => {
                    return true;
                });
            });
            return 0;
        },
        insertOne: (song, file) => {
            MongoClient.connect("mongodb://localhost/", { useNewUrlParser: true }, function(error, client) {
            if (error) throw error;
            db = client.db("blindtestyle");
            db.collection("songs").insertOne(song, null, function(error, results) {
                if (error) throw error;
                let sampleFile = file;
                sampleFile.mv(`./songs/${results.insertedId}.mp3`, (err) => {
                if(err) throw err
            });
            log.info('File uploaded')
            return true;
        });
    });
        }
    }
}

module.exports = model;