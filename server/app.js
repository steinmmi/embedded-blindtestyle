const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const log = require("./modules/log");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require("mongodb").MongoClient;

app.use(cors());
app.use(fileUpload());
app.use(express.json());

error = false;
let names = [
    "Ornithorynque rassasié",
    "Bison futé",
    "Canard content",
    "Chiot timide",
    "Aigle furieux"
];
let colors = ["red", "blue", "green", "purple", "orange"];
let players = [];
let gm;
let canAnswer = true;
let actualPlayer;
if (!(colors.length === names.length)) {
    // ! Basic test
    log.print("colors and names are not the same size", "error");
    error = true;
}

function findByName({name}) {
    let i = 0;
    let find = false;

    do {
        if (name === players[i]["name"]) {
            find = true;
        }
        i++;
    } while (i < players.length && !find);
    return find ? i - 1 : -1;
}

io.on("connection", socket => {
    let path = socket.handshake.query.path;
    log.print(`${socket.handshake.address} connected | path : ${path}`);
    if (path == "/play" || path == "/gm") {
        let name = names.shift();
        socket.player = {
            name: name,
            score: 0,
            color: colors.shift(),
            id: socket.id
        };

        log.print(
            `${socket.handshake.address} is now ${log.colors.Bright +
                socket.player.name +
                log.colors.Reset}`
        );
        if (players.length === 0) {
            log.print(
                `${log.colors.Bright +
                    socket.player.name +
                    log.colors.Reset} is the new Game Master`
            );
            gm = socket.player;
        }
        players.push(socket.player);
        socket.broadcast.emit("user_logon", socket.player);
        socket.emit("login_data", socket.player);

        socket
            .on("disconnect", function() {
                log.warn(
                    `${log.colors.Bright +
                        (socket.player.name || socket.handshake.address) +
                        log.colors.Reset} disconnected`
                );
                colors.push(socket.player.color);
                names.push(socket.player.name);
                let id = findByName(socket.player, 1);
                if (id >= 0) players.splice(id, 1);
                io.emit("user_logout", socket.player);
            })
            .on("push", () => {
                if (actualPlayer || !canAnswer) {
                    return;
                }
                log.info(
                    `${log.colors.Bright +
                        socket.player.name +
                        log.colors.Reset} pushed the button`
                );
                actualPlayer = socket.player;
                io.emit("pushed", socket.player);
            })
            .on("isGoodAnswer", state => {
                if (actualPlayer) {
                    if (state) {
                        io.emit("user_update", {
                            player: actualPlayer,
                            data: {score: 1}
                        });
                        players[findByName(actualPlayer)].score++;
                        let newGm;
                        players.forEach((player, id) => {
                            if (gm.name === player.name) {
                                newGm =
                                    id + 1 < players.length
                                        ? players[id + 1]
                                        : players[0];
                                io.sockets.connected[newGm.id].emit(
                                    "change:turn",
                                    true
                                );
                                log.print(
                                    `${log.colors.Bright +
                                        newGm.name +
                                        log.colors
                                            .Reset} is the new Game Master`
                                );
                            }
                            if (newGm !== player)
                                io.sockets.connected[player.id].emit(
                                    "change:turn",
                                    false
                                );
                        });
                        gm = newGm;
                        canAnswer = false;
                    }
                    io.emit("answer", {
                        correct: state
                    });
                    actualPlayer = null;
                }
            });
    } else {
        socket.on("music:next", () => {
            let nb = Math.ceil(Math.random() * 5);
            log.info("Playing music number " + nb);
            socket.emit("music:next", nb);
            canAnswer = true;
        });
        screenSocket = socket;
    }
    socket.emit("user_list", players);
});

if (error) {
    log.print("An error occured, aborting...", "error");
    return 0;
}
http.listen(4201, "0.0.0.0");

app.post("/song/add", function(req, res) {
    MongoClient.connect("mongodb://localhost/", function(error, client) {
        if (error) throw error;
        db = client.db("blindtestyle");
        db.collection("songs").insertOne(req.body, null, function(error, results) {
            if (error) throw error;
            let sampleFile = req.files.file;
            sampleFile.mv(`./songs/${results.insertedId}.mp3`, (err) => {
                if(err) throw err
            });
            log.info('File uploaded')
            res.send(true);
        });
    });
});

app.get('/song/get/:id', (req, res) => {
    res.download(`./songs/${req.params.id}.mp3`);
});
app.get('/song/info/:id', (req, res) => {
    MongoClient.connect("mongodb://localhost/", function(error, client) {
        if (error) throw error;
        db = client.db("blindtestyle");
        db.collection("songs").findOne({'_id': new ObjectID(req.params.id)}, (err, doc) => {
            res.send(doc);
        });
    });
});

log.print("Server is now active");
