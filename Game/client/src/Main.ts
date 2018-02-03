class Main extends egret.DisplayObjectContainer {

    private socket: egret.WebSocket;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/cartoon-egret_00.png");
    }

    private imgLoadHandler(evt: egret.Event): void {

        var bmd: egret.BitmapData = evt.currentTarget.data;
        var bird: egret.Bitmap = new egret.Bitmap(bmd);
        bird.x = 100;
        bird.y = 100;
        this.addChild(bird);

        bird.anchorOffsetX = bmd.width / 2;
        bird.anchorOffsetY = bmd.height / 2;
        bird.x = this.stage.stageWidth * .5;
        bird.y = this.stage.stageHeight * .5;

        this.socketAction();

        document.addEventListener("keydown", function (event) {
            switch (event.which) {
                case 37:
                    console.log('左');
                    bird.x = bird.x - 5;
                    break;
                case 38:
                    console.log('上');
                    bird.y = bird.y - 5;
                    break;
                case 39:
                    console.log('右');
                    bird.x = bird.x + 5;
                    break;
                case 40:
                    console.log('下');
                    bird.y = bird.y + 5;
                    break;
            }
        });

    }

    private socketAction() {
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_STRING;
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.socket.connect("echo.websocket.org", 80);
    }

    private onReceiveMessage(e) {
        console.log(e);
    }

    private onSocketOpen(e) {
        console.log('connect successful');
    }
}