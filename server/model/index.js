const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const log = require('../modules/log');


var db;
let model;
// Connect to database
model = {
    connect: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost/", { useNewUrlParser: true },function(error, client) {
                if (error) reject(error)
                log.info('Connected to Database');
                db = client.db('blindtestyle');
                resolve();
            });
        });
    },
    songs: {
        getAll: () => {
            return new Promise((resolve, reject) => {
                db.collection("songs").find().toArray((err, doc) => {
                    if(err) reject(err);
                    resolve(doc)
                })
            })
        },
        getRandom: () => {
            // db.songs.update({"played": true}, {$set: {played: false}})
            return new Promise((resolve, reject) => {
                db.collection("songs").aggregate([ {$match: {"played": false} }, {$sample: {size: 1}} ]).toArray((err, doc) => {
                    if(err) reject(err);
                    console.log(doc[0]);
                    resolve(doc[0])
                    db.collection("songs").updateOne({_id: doc[0]._id}, {$set: {"played": true}}, (err, res) => {
                        if(err) reject(err);
                        resolve(doc[0]);
                    })
                });
            });
        },
        get: (id) => {
            return new Promise((resolve, reject) => {
                db.collection("songs").findOne({'_id': new ObjectID(id)}, (err, doc) => {
                    console.log(err);
                    
                    if(err != null) {
                        reject(err);
                    }
                    resolve(doc);
                });
            });
        },
        insertOne: (song, file) => {
            return new Promise((resolve, reject) => {

                
            db.collection("songs").insertOne(song, null, function(error, results) {
                if (error) reject(error)
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
};


module.exports = model;