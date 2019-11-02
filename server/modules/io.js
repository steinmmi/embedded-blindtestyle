const log = require("./log");
const Game = require('./game')
const Model = require('../model')
const Websocket = require('ws');
const url = require('url')

let io;
let screenSocket;
module.exports = () => {
    io = new Websocket.Server({
        port: '9700'
    });

    io.on("connection", (socket) => {
        socket.on('close', () => {
            if(!socket.player) return;
            Game.removePlayer(socket.player);
            log.warn(
                `${log.colors.Bright +
                    (socket.player.name || socket.handshake.address) +
                    log.colors.Reset} disconnected`
            );
            if(socket.player == Game.gm)
                Game.gm = null;
            Game.addColor(socket.player.color);
            Game.addName(socket.player.name);
            broadcastAll(io, JSON.stringify({
                mutation: 'removePlayer',
                player: socket.player
            }));
        })
        socket.on('message', (msg) => {
            msg = JSON.parse(msg)
            switch(msg.type) {
                case 'setRole':
                    if(msg.data === 'screen')
                        setScreen(socket)
                    else newPlayer(socket);
                    break;
                case 'getSong':
                    broadcastAll(io, JSON.stringify( {
                        mutation: 'setPlayingState',
                        isPlaying: true
                    }))
                    sendNewMusic()
                    break;
                case 'pushedButton':
                    if(Game.actualPlayer) return;
                    Game.actualPlayer = socket.player
                    broadcastAll(io, JSON.stringify({
                        mutation: 'setCurrentPlayer',
                        player: socket.player
                    }))
                    break;
                case 'setResponse':
                    if(!Game.actualPlayer) return;
                    if(msg.data === 'correct') {
                        log.info('Gamemaster pushed green button')
                        Game.players[findByName(Game.actualPlayer)]['score']++;
                        broadcastAll(io, JSON.stringify(
                            {
                                mutation: 'addScore',
                                player: Game.actualPlayer,
                                score: 1
                            }
                        ))
                        broadcastAll(io, JSON.stringify( {
                            mutation: 'setPlayingState',
                            isPlaying: false
                        }))
                        broadcastAll(io, JSON.stringify({
                            mutation: 'setCurrentPlayer',
                            player: null
                        }))
                        Game.actualPlayer = undefined;
                    } else if(msg.data === 'incorrect') {
                        log.info('Gamemaster pushed red button')
                    } else {
                        log.error('Unhandled response type :' + msg)
                    }
                    break;
                default:
                    log.error('Unhandled message : ' + msg)
            }
        })        
        
        /* let path = socket.handshake.query.path;
        log.print(`${socket.handshake.address} connected | path : ${path}`); */
        /* if (path == "/play" || path == "/gm") {
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
        */
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

function broadcastAll(wss, data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === Websocket.OPEN) {
          client.send(data);
        }
      });
}

function broadcast(wss, ws, data) {
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === Websocket.OPEN) {
          client.send(data);
        }
      });
}

function newPlayer(socket) {
    socket.player = Game.generatePlayer(socket);
    log.print(
        `New player is now ${log.colors.Bright +
            socket.player.name +
            log.colors.Reset}`
    );
    
    socket.send(JSON.stringify({
        mutation: 'setPlayer',
        player: socket.player
    }))
    broadcastAll(io, JSON.stringify({
        mutation: 'addPlayer',
        player: socket.player
    }));
    socket.send(JSON.stringify(
        {
            mutation: 'setPlayers',
            players: Game.players
        }
    ))
    Game.addPlayer(socket.player)
}

function setScreen(socket) {
    Game.screensocket = socket
    socket.send(JSON.stringify(
        {
            mutation: 'setPlayers',
            players: Game.players
        }
    ))
    sendNewMusic()
}

function sendNewMusic() {
    Model.songs.getRandom().then(song => {
        log.info("Playing music : " + song.title);
        
        broadcastAll(io, JSON.stringify({
            mutation: 'setCurrentSong',
            song: song
        }))
        
        Game.canAnswer = true;
    });
}