var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.reconnectTimeout = 3000;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.connect = function () {
        var _this = this;
        mqttClient = new Paho.MQTT.Client('60.249.179.126', 8083, 'mqttjs_123456');
        var connectionOptions = {
            keepAliveInterval: 60,
            onSuccess: this.onConnect,
            onFailure: function (message) {
                console.log('connection failed: ' + message.errorMessage);
            }
        };
        mqttClient.connect(connectionOptions);
        mqttClient.onMessageArrived = this.onMessageArrived;
        mqttClient.onConnectionLost = function (e) {
            setTimeout(_this.connect, _this.reconnectTimeout);
            console.log('this.onConnectionLost', e);
        };
    };
    Main.prototype.onConnect = function () {
        console.log('onSuccess', 'connecting success.');
        // 訂閱訊息
        // mqttClient.subscribe('online');
        // mqttClient.subscribe('offline');
        // mqttClient.subscribe('game/keyid/clientid');
        mqttClient.subscribe('/World');
    };
    Main.prototype.onMessageArrived = function (message) {
        var msg;
        try {
            msg = JSON.parse(message.payloadString);
        }
        catch (e) {
            msg = message.payloadString;
        }
        var topic = message.destinationName;
        console.log({
            topic: topic,
            msg: msg,
        });
        // use switch ... case to do sth.
        switch (topic) {
            case 'game/keyid/clientid':
                bird.x = msg.x;
                bird.y = msg.y;
                break;
        }
    };
    Main.prototype.onConnectionLost = function (response) {
        setTimeout(this.connect, this.reconnectTimeout);
    };
    Main.prototype.showReconnectMessage = function () {
        console.log('connection to server lost. Attempting to reconnect in ' + this.reconnectTimeout + ' ms');
    };
    Main.prototype.onAddToStage = function (event) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/cartoon-egret_00.png");
        this.connect();
    };
    Main.prototype.imgLoadHandler = function (evt) {
        var bmd = evt.currentTarget.data;
        bird = new egret.Bitmap(bmd);
        bird.x = 100;
        bird.y = 100;
        this.addChild(bird);
        bird.anchorOffsetX = bmd.width / 2;
        bird.anchorOffsetY = bmd.height / 2;
        bird.x = this.stage.stageWidth * .5;
        bird.y = this.stage.stageHeight * .5;
        bird.touchEnabled = true;
        bird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            payload = new Paho.MQTT.Message(JSON.stringify({
                message: 'click image!'
            }));
            payload.destinationName = '/World';
            mqttClient.send(payload);
        }, this);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
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
//# sourceMappingURL=Main.js.map