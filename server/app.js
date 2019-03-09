const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const log = require('./modules/log');
error = false
let names = [
    'Ornithorynque rassasié',
    'Bison futé',
    'Canard content',
    'Chiot timide',
    'Aigle furieux',
]
let colors = ['red','blue','green','purple','orange']
let players = []

if(!(colors.length === names.length)) {  // ! Basic test
    log.print('colors and names are not the same size', 'error')
    error = true;
}

function findByName({name}) {
    let i = 0;
    let find = false;

    do {
        if (name === players[i]['name']) {
        find = true;
        }
        i++;
    } while ( i < players.length && !find);
    return find ? i - 1 : -1;
}

io.on("connection", socket => {
    let path = socket.handshake.query.path
    log.print(`${socket.handshake.address} connected | path : ${path}`);
    if(path == "/play") {
        
        let name = names.shift()
        socket.player = {
            name: name,
            score: 0,
            color: colors.shift()
        }
        log.print(`${socket.handshake.address} is now ${socket.player.name}`)
        players.push(socket.player)

        socket.broadcast.emit('user_logon', socket.player)
        socket.emit('login_data', socket.player)
        socket.on('disconnect', function () {
            log.warn(`${socket.player.name || socket.handshake.address} disconnected`)
            colors.push(socket.player.color)
            names.push(socket.player.name)
            let id = findByName(socket.player, 1)
            if(id >= 0) players.splice(id, 1)
            io.emit('user_logout', socket.player)
        });
        socket.on('push', () => {
            log.info(`${log.colors.Bright}${socket.player.name}${log.colors.Reset} pushed the button`)
            players[findByName(socket.player)].score++;
            io.emit('user_update', {
                player: socket.player,
                data: {score: 1}
            })
        })
    } else screenSocket = socket
    socket.emit('user_list', players)
});


if (error) {
    log.print('An error occured, aborting...', 'error')
    return 0
}
http.listen(4201, "0.0.0.0");