class Main extends egret.DisplayObjectContainer {

    // Paho
    private mqttClient: Paho.MQTT.Client;
    private payload: Paho.MQTT.Message;

    private reconnectTimeout = 3000;
    private serverAddress: string = '60.249.179.126';
    private serverPort: number = 8083;
    private clientId: string = 'mqttjs_123456';

    private message: any;
    private topic: string;

    private isConnect: boolean = false;

    // Game
    private bird: egret.Bitmap;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        this.connect();

        let imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/cartoon-egret_00.png");
    }

    private connect(): void {

        this.mqttClient = new Paho.MQTT.Client(this.serverAddress, this.serverPort, this.clientId);
        const connectionOptions = {
            keepAliveInterval: 30,
            onSuccess: (): void => {
                this.isConnect = true;
                console.log('onSuccess', 'connecting success.');

                // 開新房間
                this.mqttClient.subscribe('create/keyid');

                // 加入房間
                this.mqttClient.subscribe('join/keyid');


                // 了解目前狀態
                this.mqttClient.subscribe('game/keyid');

            },
            onFailure(message) {
                console.log('connection failed: ' + message.errorMessage);
            }
        };

        this.mqttClient.connect(connectionOptions);

        this.mqttClient.onMessageArrived = async (message) => {
            console.log(message);
            let msg;
            try {
                msg = JSON.parse(message.payloadString)
            } catch (e) {
                msg = message.payloadString;
            }
            const topic = message.destinationName;
            console.log({
                topic,
                msg,
            });

            // use switch ... case to do sth.
            switch (topic) {
                case 'game/keyid/clientid':
                    egret.Tween.get(this.bird)
                        .to({ x: this.bird.x + 30, y: this.bird.y }, 300, egret.Ease.sineInOut);
                    break;
            }
        };

        this.mqttClient.onConnectionLost = (): void => {
            this.isConnect = false;
            console.log('connection to server lost. Attempting to reconnect in ' + this.reconnectTimeout + ' ms');
            setTimeout(this.connect, this.reconnectTimeout);
        };
    }

    private onMessageArrived(message): void {
        console.log(message);
        let msg;
        try {
            msg = JSON.parse(message.payloadString)
        } catch (e) {
            msg = message.payloadString;
        }
        const topic = message.destinationName;
        console.log({
            topic,
            msg,
        });

        // use switch ... case to do sth.
        switch (topic) {
            case 'game/keyid/clientid':
                egret.Tween.get(this.bird)
                    .to({ x: this.bird.x + 5, y: this.bird.y + 5 }, 300, egret.Ease.sineInOut);
                break;
        }
    }

    /**
     * 角色移動
     */
    private moveCharacter(_action, _x, _y, _id): void {

        // this.payload = new Paho.MQTT.Message(JSON.stringify({
        //     action: _action,
        //     x: _x,
        //     y: _y,
        //     id: _id,
        // }));
        // this.payload.destinationName = 'game/keyid';
        // this.mqttClient.send(this.payload);

        // this.mqttClient.subscribe('game/keyid/clientid');
        // this.mqttClient.subscribe('game/keyid/clientid');

    }

    /**
     * 建立房間
     */
    private roomCreate() {
        this.payload = new Paho.MQTT.Message(JSON.stringify({
            action: 'create',
            key: 'dadkfh'
        }));
        this.payload.destinationName = 'room';
        this.mqttClient.send(this.payload);

        this.mqttClient.subscribe('create/keyid');
    }


    private imgLoadHandler(evt: egret.Event): void {

        let bmd: egret.BitmapData = evt.currentTarget.data;
        this.bird = new egret.Bitmap(bmd);
        this.bird.x = 100;
        this.bird.y = 100;
        this.addChild(this.bird);

        this.bird.anchorOffsetX = bmd.width / 2;
        this.bird.anchorOffsetY = bmd.height / 2;
        this.bird.x = this.stage.stageWidth * .5;
        this.bird.y = this.stage.stageHeight * .5;

        this.bird.touchEnabled = true;
        this.bird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
        }, this);

        // touchAPEventer
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
            console.log(`${event.stageX}:${event.stageY}`);
            egret.Tween.get(this.bird)
                .to({ x: event.stageX, y: event.stageY }, 300, egret.Ease.quadIn);
        }, this);

        // keyDownEventer
        var _Main = this;
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            switch (event.which) {
                case 37:
                    console.log('左');
                    this.moveCharacter('move', this.bird.x - 5, this.bird.y, 'clientid');
                    break;
                case 38:
                    console.log('上');
                    this.moveCharacter('move', this.bird.x, this.bird.y - 5, 'clientid');
                    break;
                case 39:
                    console.log('右');
                    this.moveCharacter('move', this.bird.x + 5, this.bird.y, 'clientid');
                    break;
                case 40:
                    console.log('下');
                    this.moveCharacter('move', this.bird.x, this.bird.y + 5, 'clientid');
                    break;
            }
        });
    }

}