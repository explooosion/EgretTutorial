var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Player = (function () {
    function Player(team, hp, attack, x, y, others) {
        this.team = team;
        this.hp = hp;
        this.attack = attack;
        this.x = x;
        this.y = y;
        this.others = others;
    }
    return Player;
}());
__reflect(Player.prototype, "Player");
var GameData = (function () {
    function GameData() {
        // Game Server
        this.reconnectTimeout = 3000;
        this.serverAddress = '60.249.179.126';
        this.serverPort = 8083;
        this.masterId = 'dadkfh';
        this.clientId = 'mqttclient123456';
        this.playerId = '';
        this.mapId = '';
    }
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map