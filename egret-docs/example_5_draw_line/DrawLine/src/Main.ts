class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToState, this);
    }

    private onAddToState(event: egret.Event) {
        // this.drawRectLine();
        // this.drawCircle();
        // this.drawLine();
        // this.drawCurveAndMove();
        // this.drawArc();
        // this.drawArcHigher();
        this.getArcProgress();
    }

    private drawRectLine() {
        var shp: egret.Shape = new egret.Shape();
        shp.x = 20;
        shp.y = 20;
        shp.graphics.lineStyle(10, 0x00ff00);
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawRect(0, 0, 100, 200);
        shp.graphics.endFill();

        this.addChild(shp);
    }

    private drawCircle() {
        var shp: egret.Shape = new egret.Shape;
        shp.x = 100;
        shp.y = 100;
        shp.graphics.lineStyle(10, 0x00ff00);
        shp.graphics.beginFill(0xff0000, 1);
        shp.graphics.drawCircle(0, 0, 50);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    private drawLine() {
        var shp: egret.Shape = new egret.Shape();
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
    }

    private drawCurveAndMove() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.lineStyle(2, 0x00ff00);
        shp.graphics.moveTo(50, 50);
        shp.graphics.curveTo(100, 100, 200, 50);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    private drawArc() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x1122cc);
        shp.graphics.drawArc(200, 200, 100, 0, Math.PI, true);
        shp.graphics.endFill();
        this.addChild(shp);
    }

    private drawArcHigher() {
        var r: number = 50;
        var shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(r, r);//绘制点移动(r, r)点
        shape.graphics.lineTo(r * 2, r);//画线到弧的起始点
        shape.graphics.drawArc(50, 50, 50, 0, 260 * Math.PI / 180, false);//从起始点顺时针画弧到终点
        shape.graphics.lineTo(r, r);//从终点画线到圆形。到此扇形的封闭区域形成
        shape.graphics.endFill();
        this.addChild(shape);
    }

    private getArcProgress() {
        var shape: egret.Shape = new egret.Shape();
        var angle: number = 0;
        egret.startTick(function (timeStamp: number): boolean {
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
        }

        this.addChild(shape);
    }



}