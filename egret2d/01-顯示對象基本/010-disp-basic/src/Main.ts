class Main extends egret.DisplayObjectContainer {

    private _txInfo: egret.TextField;
    private _bgInfo: egret.Shape;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoader, this);
        imgLoader.load("resource/cartoon-egret_00.png");
    }

    private imgLoader(evt: egret.Event): void {

        // 讀取資源
        var bmd: egret.BitmapData = evt.currentTarget.data;

        // 繪製圖片
        var bird: egret.Bitmap = new egret.Bitmap(bmd);
        bird.x = 100;
        bird.y = 100;
        this.addChild(bird);

        bird.anchorOffsetX = bmd.width / 2;
        bird.anchorOffsetY = bmd.height / 2;
        bird.x = this.stage.stageWidth * .5;
        bird.y = this.stage.stageHeight * .5;

        this._txInfo = new egret.TextField;
        this.addChild(this._txInfo);

        // 文字繪製
        this._txInfo.size = 28;
        this._txInfo.x = 50;
        this._txInfo.y = 50;
        this._txInfo.textAlign = egret.HorizontalAlign.LEFT;
        this._txInfo.textColor = 0xffffff;
        this._txInfo.type = egret.TextFieldType.DYNAMIC;
        this._txInfo.lineSpacing = 6;
        this._txInfo.multiline = true;

        this._txInfo.text = "輕觸屏幕調整顯示對象位置;";

        // 幫文字上框
        this._bgInfo = new egret.Shape;
        this.addChildAt(this._bgInfo, this.numChildren - 1);

        this._bgInfo.x = this._txInfo.x;
        this._bgInfo.y = this._txInfo.y;
        this._bgInfo.graphics.clear();
        this._bgInfo.graphics.beginFill(0xffffff, .5);
        this._bgInfo.graphics.drawRect(0, 0, this._txInfo.width, this._txInfo.height);
        this._bgInfo.graphics.endFill();

        // 點擊容器的時候更換為當前座標
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
            bird.x = evt.localX;
            bird.y = evt.localY;
        }, this);
    }
}