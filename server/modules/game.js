class Game {
    static addPlayer(player) {
        Game.players.push(player);
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
