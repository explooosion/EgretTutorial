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
    var Tube = (function (_super) {
        __extends(Tube, _super);
        function Tube() {
            var _this = _super.call(this) || this;
            // 水管陣列
            _this.tubeArr = [];
            // 起始位置
            _this.positionStart = 1920;
            // 最低位置
            _this.positionMinHeight = 650;
            // 場景移動速度
            _this.speed = 10;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Tube.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        /**
         * 工廠建造水管
         */
        Tube.prototype.tubeFactoryHandler = function (event) {
            var tube = util.createBitmapByName("tube_png");
            var y = Math.floor(Math.random() * 251) + 150; // 400~150
            var direction = Math.floor(Math.random() * 2) + 0 > 0 ? true : false; // 400~150
            // 1 倒向 0 正向
            if (direction) {
                tube.x = this.positionStart + 100;
                tube.y = y;
                tube.width = 100;
                tube.height = y;
                tube.rotation = -180;
            }
            else {
                tube.x = this.positionStart + 100;
                tube.y = this.positionMinHeight - y;
                tube.width = 100;
                tube.height = y;
            }
            this.textureWidth = 100;
            this.tubeArr.push(tube);
            this.addChild(tube);
        };
        /**
         * 滾動 - ENTER_FRAME
         */
        Tube.prototype.enterFrameHandler = function (event) {
            for (var i = 0; i < this.tubeArr.length; i++) {
                if (this.tubeArr[i].x <= -1 * this.textureWidth) {
                    this.tubeArr.shift();
                }
                this.tubeArr[i].x -= this.speed;
            }
        };
        /**
         * 開始工作
         */
        Tube.prototype.start = function () {
            this.tubeArr = [];
            this.timer = new egret.Timer(1800, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.tubeFactoryHandler, this);
            this.timer.start();
        };
        /**
         * 暫停滾動
         */
        Tube.prototype.pause = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.tubeFactoryHandler, this);
            this.timer.stop();
        };
        return Tube;
    }(egret.DisplayObjectContainer));
    flappy.Tube = Tube;
    __reflect(Tube.prototype, "flappy.Tube");
})(flappy || (flappy = {}));
//# sourceMappingURL=Tube.js.map