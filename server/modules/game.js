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
}

Game.names = [
    "Ornithorynque rassasié",
    "Bison futé",
    "Canard content",
    "Chiot timide",
    "Aigle furieux",
    "Cerf Volant"
];
Game.screensocket;
Game.players = [];
Game.gm;
Game.canAnswer = true;
Game.actualPlayer;
Game.colors = [ "#232355", "#882244", "#451200", "#931267", '#229944', '#501090'];
if (!(Game.colors.length === Game.names.length))
    throw new Error('Colors and names must have the same length')

module.exports = Game;
