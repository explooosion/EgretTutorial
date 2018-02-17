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
    var Bird = (function (_super) {
        __extends(Bird, _super);
        function Bird(texture_json, texture_png) {
            var _this = _super.call(this) || this;
            _this.v1 = 1;
            _this.v2 = 20;
            _this.limitMinHight = 0;
            _this.birdFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
            _this.bird = new egret.MovieClip(_this.birdFactorty.generateMovieClipData('bird'));
            _this.bird.x = 100;
            _this.addChild(_this.bird);
            _this.bird.gotoAndPlay('bird_fly', -1);
            _this.bird.addEventListener(egret.Event.ENTER_FRAME, _this.enterFrameHandler, _this);
            return _this;
        }
        Bird.prototype.enterFrameHandler = function (event) {
            this.bird.y = this.bird.y + this.v1;
            this.v1 = this.v1 + 1;
            if (this.bird.y >= this.limitMinHight - this.bird.height * 1.7) {
                this.v1 = 0;
            }
        };
        Bird.prototype.flyStart = function () {
            this.v2 = 20;
            this.v1 = 1;
            this.bird.removeEventListener(egret.Event.ENTER_FRAME, this.flyHandler, this);
            this.bird.addEventListener(egret.Event.ENTER_FRAME, this.flyHandler, this);
        };
        Bird.prototype.flyHandler = function () {
            this.bird.y = this.bird.y - this.v2;
            this.v2 = this.v2 - 0.8;
            if (this.v2 < 0) {
                this.v2 = 20;
                this.bird.removeEventListener(egret.Event.ENTER_FRAME, this.flyHandler, this);
            }
        };
        return Bird;
    }(egret.DisplayObjectContainer));
    flappy.Bird = Bird;
    __reflect(Bird.prototype, "flappy.Bird");
})(flappy || (flappy = {}));
//# sourceMappingURL=Bird.js.map