const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


let names = [
    'Bison futé',
    'Canard content',
    'Chiot timide',
    'Aigle furieux',
]

let players = []

let colors = ['red','blue','green','purple','gold','orange']

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
    if(path == "/play") {
        let name = names.shift()
        socket.player = {
            name: name,
            score: 0,
            color: colors.shift()
        }
        players.push(socket.player)
        socket.broadcast.emit('user_logon', socket.player)
    
        socket.emit('login_data', socket.player)
        console.log("Connection");
        socket.on('disconnect', function () {
            colors.push(socket.player.color)
            names.push(socket.player.name)
            let id = findByName(socket.player, 1)
            if(id >= 0) players.splice(id, 1)
            io.emit('user_logout', socket.player)
        });
        socket.on('push', () => {
            players[findByName(socket.player)].score++;
            io.emit('user_update', {
                player: socket.player,
                data: {score: 1}
            })
        })
    } else screenSocket = socket
    socket.emit('user_list', players)
});

http.listen(4201, "0.0.0.0");