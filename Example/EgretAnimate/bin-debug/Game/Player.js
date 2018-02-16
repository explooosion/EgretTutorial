var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(texture_json, texture_png) {
            var _this = _super.call(this) || this;
            _this.playerFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
            _this.player = new egret.MovieClip(_this.playerFactorty.generateMovieClipData('metal'));
            _this.player.touchEnabled = true;
            _this.player.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchHandler, _this);
            _this.player.addEventListener(egret.MovieClipEvent.COMPLETE, _this.loopComplete, _this);
            _this.addChild(_this.player);
            _this.player.gotoAndPlay('stand', -1);
            return _this;
        }
        Player.prototype.touchHandler = function (event) {
            this.player.gotoAndPlay('eat', 1);
            this.player.touchEnabled = false;
        };
        Player.prototype.loopComplete = function (event) {
            this.player.gotoAndPlay('stand', -1);
            this.player.touchEnabled = true;
        };
        return Player;
    }(egret.DisplayObjectContainer));
    Game.Player = Player;
    __reflect(Player.prototype, "Game.Player");
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map