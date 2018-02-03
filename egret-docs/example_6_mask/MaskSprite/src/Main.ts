class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.ObjectMask();
    }

    private ObjectMask() {
        //画一个红色的正方形
        var square: egret.Shape = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRect(0, 0, 100, 100);
        square.graphics.endFill();
        this.addChild(square);
        //画一个蓝色的圆形
        var circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(25, 25, 25);
        circle.graphics.endFill();
        this.addChild(circle);
        square.mask = circle;

        square.touchEnabled = true;
        square.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            // click to see the mask changing
            square.mask = square.mask ? null : circle;
        }, this);
    }

    private RectangleMask() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2: egret.Shape = new egret.Shape();
        shp2.graphics.beginFill(0x00ff00);
        shp2.graphics.drawCircle(0, 0, 20);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;

        var rect: egret.Rectangle = new egret.Rectangle(20, 20, 30, 50);
        shp.mask = rect;
    }
    private unMask() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        this.addChild(shp);
        var shp2: egret.Shape = new egret.Shape();
        shp2.graphics.beginFill(0x00ff00);
        shp2.graphics.drawCircle(0, 0, 20);
        shp2.graphics.endFill();
        this.addChild(shp2);
        shp2.x = 20;
        shp2.y = 20;
    }
}