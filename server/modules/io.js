const log = require("./log");
const Game = require('./game')
const Model = require('../model')
module.exports = http => {
    const io = require("socket.io")(http);
    io.on("connection", socket => {
        let path = socket.handshake.query.path;
        log.print(`${socket.handshake.address} connected | path : ${path}`);
        if (path == "/play" || path == "/gm") {
            socket.player = {
                name: Game.getName(),
                score: 0,
                color: Game.getColor(),
                id: socket.id
            };

            log.print(
                `${socket.handshake.address} is now ${log.colors.Bright +
                    socket.player.name +
                    log.colors.Reset}`
            );
            if (Game.players.length === 0 || !Game.gm) {
                log.print(
                    `${log.colors.Bright +
                        socket.player.name +
                        log.colors.Reset} is the new Game Master`
                );
                socket.emit("change:turn",true);
                Game.gm = socket.player;
            } else {
                socket.emit("change:turn",false);
            }
            Game.addPlayer(socket.player)

            socket.broadcast.emit("user_logon", socket.player); // Notify all about new player
            socket.emit("login_data", socket.player); // Give new player his infos

            socket.on("disconnect", function () {
                    log.warn(
                        `${log.colors.Bright +
                            (socket.player.name || socket.handshake.address) +
                            log.colors.Reset} disconnected`
                    );
                    if(socket.player == Game.gm)
                        Game.gm = null;
                    
                    Game.addColor(socket.player.color);
                    Game.addName(socket.player.name);
                    let id = findByName(socket.player, 1);
                    if (id >= 0) Game.players.splice(id, 1);
                    io.emit("user_logout", socket.player);
                })
                .on("push", () => {
                    if (Game.actualPlayer || !Game.canAnswer) {
                        return;
                    }
                    log.info(
                        `${log.colors.Bright +
                            socket.player.name +
                            log.colors.Reset} pushed the button`
                    );
                    Game.actualPlayer = socket.player;
                    io.emit("pushed", socket.player);
                })
                .on("isGoodAnswer", state => {
                    if (Game.actualPlayer) {
                        if (state) {
                            io.emit("user_update", {
                                player: Game.actualPlayer,
                                data: {
                                    score: 1
                                }
                            });
                            Game.players[findByName(Game.actualPlayer)].score++;
                            let newGm;
                            Game.players.forEach((player, id) => {
                                if (Game.gm.name === player.name) {
                                    newGm =
                                        id + 1 < Game.players.length ?
                                        Game.players[id + 1] :
                                        Game.players[0];
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
                            Game.gm = newGm;
                            Game.canAnswer = false;
                        }
                        io.emit("answer", {
                            correct: state
                        });
                        Game.actualPlayer = null;
                    }
                });
        } else { // If socket is screen
            socket.on("music:next", () => {
                // TODO: Get data from Model
                Model.songs.getRandom().then(song => {
                    console.log(song);
                    
                    log.info("Playing music : " + song.title);
                    io.emit("music:next", song);
                    Game.canAnswer = true;
                });
                
            });
            Game.screenSocket = socket;
        }
        socket.emit("user_list", Game.players);
    });
};

function findByName({name}) {
    let i = 0;
    let find = false;

    do {
        if (name === Game.players[i]["name"]) {
            find = true;
        }
        i++;
    } while (i < Game.players.length && !find);
    return find ? i - 1 : -1;
}