declare var mqttClient;
declare var payload;
declare var bird: egret.Bitmap;

class Main extends egret.DisplayObjectContainer {

    private socket: egret.WebSocket;
    private reconnectTimeout = 3000;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private connect() {
        mqttClient = new Paho.MQTT.Client('60.249.179.126', 8083, 'mqttjs_123456');
        const connectionOptions = {
            keepAliveInterval: 60,
            onSuccess: this.onConnect,
            onFailure(message) {
                console.log('connection failed: ' + message.errorMessage);
            }
        };
        mqttClient.connect(connectionOptions);
        mqttClient.onMessageArrived = this.onMessageArrived;
        mqttClient.onConnectionLost = (e) => {
            setTimeout(this.connect, this.reconnectTimeout);
            console.log('this.onConnectionLost', e);
        };
    }

    private onConnect() {
        console.log('onSuccess', 'connecting success.');

        // 訂閱訊息
        // mqttClient.subscribe('online');
        // mqttClient.subscribe('offline');

        // mqttClient.subscribe('game/keyid/clientid');
        mqttClient.subscribe('/World');
    }

    private onMessageArrived(message) {
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
                bird.x = msg.x;
                bird.y = msg.y;
                break;
        }
    }

    private onConnectionLost(response) {
        setTimeout(this.connect, this.reconnectTimeout);
    }

    private showReconnectMessage() {
        console.log('connection to server lost. Attempting to reconnect in ' + this.reconnectTimeout + ' ms');
    }

    private onAddToStage(event: egret.Event) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/cartoon-egret_00.png");

        this.connect();
    }

    private imgLoadHandler(evt: egret.Event): void {

        var bmd: egret.BitmapData = evt.currentTarget.data;
        bird = new egret.Bitmap(bmd);
        bird.x = 100;
        bird.y = 100;
        this.addChild(bird);

        bird.anchorOffsetX = bmd.width / 2;
        bird.anchorOffsetY = bmd.height / 2;
        bird.x = this.stage.stageWidth * .5;
        bird.y = this.stage.stageHeight * .5;
        bird.touchEnabled = true;
        bird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            payload = new Paho.MQTT.Message(JSON.stringify({
                message: 'click image!'
            }));
            payload.destinationName = '/World';
            mqttClient.send(payload);
        }, this);

    }
}

document.addEventListener("keydown", function (event) {
    switch (event.which) {
        case 37:
            console.log('左');
            // bird.x = bird.x - 5;
            moveCharacter('move', bird.x - 5, bird.y, 'clientid');
            break;
        case 38:
            console.log('上');
            // bird.y = bird.y - 5;
            moveCharacter('move', bird.x, bird.y - 5, 'clientid');
            break;
        case 39:
            console.log('右');
            // bird.x = bird.x + 5;
            moveCharacter('move', bird.x + 5, bird.y, 'clientid');
            break;
        case 40:
            console.log('下');
            // bird.y = bird.y + 5;
            moveCharacter('move', bird.x, bird.y + 5, 'clientid');
            break;
    }
});

function roomCreate() {
    payload = new Paho.MQTT.Message(JSON.stringify({
        action: 'create',
        key: 'dadkfh'
    }));
    payload.destinationName = 'room';
    mqttClient.send(payload);

    mqttClient.subscribe('create/keyid');
}

function moveCharacter(_action, _x, _y, _id) {

    payload = new Paho.MQTT.Message(JSON.stringify({
        action: _action,
        x: _x,
        y: _y,
        id: _id,
    }));
    payload.destinationName = 'game/keyid';
    mqttClient.send(payload);

    mqttClient.subscribe('game/keyid/clientid');
    mqttClient.subscribe('game/keyid/clientid');
}