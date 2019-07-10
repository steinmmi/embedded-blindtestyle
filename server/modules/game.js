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
    "Aigle furieux"
];
Game.screensocket;
Game.players = [];
Game.gm;
Game.canAnswer = true;
Game.actualPlayer;
Game.colors = [ "blue", "green", "purple", "orange", 'cyan'];
if (!(Game.colors.length === Game.names.length))
    throw new Error('Colors and names must have the same length')

module.exports = Game;
