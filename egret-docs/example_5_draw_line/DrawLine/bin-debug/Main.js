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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToState, _this);
        return _this;
    }
    Main.prototype.onAddToState = function (event) {
        // this.drawRectLine();
        // this.drawCircle();
        // this.drawLine();
        // this.drawCurveAndMove();
        // this.drawArc();
        // this.drawArcHigher();
        this.getArcProgress();
    };
    Main.prototype.drawRectLine = function () {
        var shp = new egret.Shape();
        shp.x = 20;
        shp.y = 20;
        shp.graphics.lineStyle(10, 0x00ff00);
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawRect(0, 0, 100, 200);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    Main.prototype.drawCircle = function () {
        var shp = new egret.Shape;
        shp.x = 100;
        shp.y = 100;
        shp.graphics.lineStyle(10, 0x00ff00);
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawCircle(0, 0, 50);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    Main.prototype.drawLine = function () {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(2, 0x00ff00);
        shp.graphics.moveTo(68, 84);
        shp.graphics.lineTo(167, 76);
        shp.graphics.lineTo(221, 118);
        shp.graphics.lineTo(290, 162);
        shp.graphics.lineTo(297, 228);
        shp.graphics.lineTo(412, 250);
        shp.graphics.lineTo(443, 174);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    Main.prototype.drawCurveAndMove = function () {
        var shp = new egret.Shape();
        shp.graphics.lineStyle(2, 0x00ff00);
        shp.graphics.moveTo(50, 50);
        shp.graphics.curveTo(100, 100, 200, 50);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    Main.prototype.drawArc = function () {
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x1122cc);
        shp.graphics.drawArc(200, 200, 100, 0, Math.PI, true);
        shp.graphics.endFill();
        this.addChild(shp);
    };
    Main.prototype.drawArcHigher = function () {
        var r = 50;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(r, r); //绘制点移动(r, r)点
        shape.graphics.lineTo(r * 2, r); //画线到弧的起始点
        shape.graphics.drawArc(50, 50, 50, 0, 260 * Math.PI / 180, false); //从起始点顺时针画弧到终点
        shape.graphics.lineTo(r, r); //从终点画线到圆形。到此扇形的封闭区域形成
        shape.graphics.endFill();
        this.addChild(shape);
    };
    Main.prototype.getArcProgress = function () {
        var shape = new egret.Shape();
        var angle = 0;
        egret.startTick(function (timeStamp) {
            angle += 1;
            changeGraphics(angle);
            angle = angle % 360;
            return true;
        }, this);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.moveTo(50, 50);
            shape.graphics.lineTo(100, 50);
            shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
            shape.graphics.lineTo(50, 50);
            shape.graphics.endFill();
            shape.graphics.clear();
        }
        this.addChild(shape);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map