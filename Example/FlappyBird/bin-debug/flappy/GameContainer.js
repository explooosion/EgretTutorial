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
var flappy;
(function (flappy) {
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.myScore = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameContainer.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        GameContainer.prototype.createGameScene = function () {
            var _this = this;
            this.bg = new flappy.BgMap();
            this.bg.start();
            this.addChild(this.bg);
            this.tube = new flappy.Tube();
            this.tube.start();
            this.addChild(this.tube);
            this.mybird = new flappy.Bird(RES.getRes('bird_json'), RES.getRes('bird_png'));
            this.mybird.limitMinHight = this.bg.textureHeight;
            this.addChild(this.mybird);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) { _this.mybird.flyStart(); }, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameHitTest, this);
            this.scorePanel = new flappy.ScorePanel();
            // Timer 
            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, function () { _this.myScore++; }, this);
            this.timer.start();
        };
        GameContainer.prototype.gameHitTest = function () {
            var _this = this;
            this.tube.tubeArr.forEach(function (tube) {
                if (util.hitTest(_this.mybird.bird, tube)) {
                    _this.removeEventListener(egret.Event.ENTER_FRAME, _this.gameHitTest, _this);
                    console.log('hit!!!!');
                    _this.bg.pause();
                    _this.tube.pause();
                    _this.timer.stop();
                    // 顯示分數
                    _this.scorePanel.showScore(_this.myScore);
                    _this.scorePanel.x = (_this.stage.stageWidth - _this.scorePanel.width) / 2;
                    _this.scorePanel.y = 100;
                    _this.addChild(_this.scorePanel);
                    return;
                }
            });
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    flappy.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "flappy.GameContainer");
})(flappy || (flappy = {}));
//# sourceMappingURL=GameContainer.js.map