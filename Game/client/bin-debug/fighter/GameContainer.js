var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fighter;
(function (fighter) {
    /**
    * 主游戏容器
    */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameContainer.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        GameContainer.prototype.createGameScene = function () {
            var _this = this;
            this.bg = new fighter.BgMap();
            this.addChild(this.bg);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            //开始按钮
            this.btnStart = fighter.createBitmapByName("button_join_png"); //开始按钮
            this.btnStart.x = (this.stageW - this.btnStart.width) / 2; //居中定位
            this.btnStart.y = (this.stageH - this.btnStart.height) / 2; //居中定位
            this.btnStart.touchEnabled = true; //开启触碰
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            // this.addChild(this.btnStart);
            //开始按钮
            var _btnStart = fighter.createBitmapByName("button_join_png"); //开始按钮
            _btnStart.x = (this.stageW - _btnStart.width) / 5; //居中定位
            _btnStart.y = (this.stageH - _btnStart.height) / 5; //居中定位
            _btnStart.touchEnabled = true; //开启触碰
            _btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.bg.pause(); }, this);
            // this.addChild(_btnStart);
            //我的飞机
            this.myFighter = new fighter.Airplane(RES.getRes("man_png"), 100, "man_png");
            this.myFighter.y = this.stageH - this.myFighter.height - 50;
            // this.addChild(this.myFighter);
            this.gameStart();
        };
        /**游戏开始*/
        GameContainer.prototype.gameStart = function () {
            this.bg.start();
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        };
        /**游戏画面更新*/
        GameContainer.prototype.gameViewUpdate = function (evt) {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset = 60 / fps;
            // var bullet: fighter.Bullet;
            // bullet.y -= 12 * speedOffset;
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    fighter.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "fighter.GameContainer");
})(fighter || (fighter = {}));
//# sourceMappingURL=GameContainer.js.map