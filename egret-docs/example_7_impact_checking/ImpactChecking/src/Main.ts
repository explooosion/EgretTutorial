class Main extends egret.DisplayObjectContainer {

    private infoText: egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.drawText();
        this.pixelCollision();
    }

    private recCollision() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        shp.width = 100;
        shp.height = 100;
        this.addChild(shp);
        var isHit: boolean = shp.hitTestPoint(10, 10);
        this.infoText.text = "isHit: " + isHit;
    }

    private pixelCollision() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xff0000);
        shp.graphics.drawRect(0, 0, 100, 100);
        shp.graphics.endFill();
        shp.width = 100;
        shp.height = 100;
        this.addChild(shp);
    }

    private drawText() {
        this.infoText = new egret.TextField();
        this.infoText.y = 200;
        this.infoText.text = "isHit";
        this.addChild(this.infoText);
    }
}