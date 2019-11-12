let Log = require('./log')
class Game {
    static addPlayer(player) {
        Game.players.push(player);
    }

    static generatePlayer(socket) {
        return {
            name: Game.getName(),
            score: 0,
            color: Game.getColor(),
            id: socket.id
        };
    }

    static getName() {
        return Game.names.shift();
    }

    static getColor() {
        return Game.colors.shift();
    }

    static addColor(color) {
        Game.colors.push(color);
    }

    static addName(name) {
        Game.names.push(name)
    }
    static removePlayer(player) {
        let id = Game.players.indexOf(player)
        if(id !== -1) {
            Game.players.splice(id,1)
            return true
        }
        else {
        Log.error('Cannot remove player ' + player)
        }
    }
    static set screensocket(n) {
        Game._screensocket = n
    }
    static get screensocket() {
        return Game._screensocket
    }
    static changeTurn(wss) {
        let indexGm = Game.players.indexOf(Game.gm)
        let newGm = Game.players[indexGm+1] || Game.players[0]
        Game.gm = newGm
        
        wss.clients.forEach( (el, i) => {
            if(!el.player) return;
            if(newGm.name === el.player.name) {
                el.send(JSON.stringify({
                    mutation: 'setRoute',
                    route: 'gamemaster'
                }))
            } else {
                el.send(JSON.stringify({
                    mutation: 'setRoute',
                    route: 'play'
                }))
            }
            
      });
    }
}

Game.names = [
    "Ornithorynque rassasié",
    "Bison futé",
    "Canard content",
    "Chiot timide",
    "Aigle furieux",
    "Cerf Volant",
    "Raton-laveur laveur",
    "Requin flemmard",
    "Tortue ninja",
    "Chat méchant",
    "Gaselle maladroite",
    "Chibrax velu",
    "Poney ténébreux",
    "Otarie amicale",
    "Pigeon vénéneux"
];
Game.screensocket;
Game.players = [];
Game.gm;
Game.canAnswer = true;
Game.actualPlayer;
Game.colors = [ "#232355", "#882244", "#451200", "#931267",
                '#229944', '#501090', "#00AA00", "#AA0000",
                "#0000AA", "#A8D912", "#BB8731", "#C23A87", "#98B9C3", "#22AAF3", "#7754EA"];
if (!(Game.colors.length === Game.names.length))
    throw new Error('Colors and names must have the same length')

module.exports = Game;
