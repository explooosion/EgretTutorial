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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this.ObjectMask();
    };
    Main.prototype.ObjectMask = function () {
        //画一个红色的正方形
        var square = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0, 0, 100, 100);
        square.graphics.endFill();
        this.addChild(square);
        //画一个蓝色的圆形
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(25, 25, 25);
        circle.graphics.endFill();
        this.addChild(circle);
        square.mask = circle;
        square.touchEnabled = true;
        square.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            // click to see the mask changing
            square.mask = square.mask ? null : circle;
        }, this);
    };
    Main.prototype.RectangleMask = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2 = new egret.Shape();
        shp2.graphics.beginFill(0x00ff00);
        shp2.graphics.drawCircle(0, 0, 20);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;
        var rect = new egret.Rectangle(20, 20, 30, 50);
        shp.mask = rect;
    };
    Main.prototype.unMask = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2 = new egret.Shape();
        shp2.graphics.beginFill(0x00ff00);
        shp2.graphics.drawCircle(0, 0, 20);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map