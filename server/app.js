const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on("connection", socket => {
    console.log("Connection");
    socket.on('disconnect', function () {
        console.log('Déconnection');  
    });
    socket.on('push', () => {
        console.log("il y a eu un appui");
        
    })
});

http.listen(4201, "127.0.0.1");