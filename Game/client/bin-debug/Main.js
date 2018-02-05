var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.reconnectTimeout = 3000;
        _this.serverAddress = '60.249.179.126';
        _this.serverPort = 8083;
        _this.clientId = 'mqttjs_123456';
        _this.isConnect = false;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this.connect();
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load("resource/cartoon-egret_00.png");
    };
    Main.prototype.connect = function () {
        var _this = this;
        this.mqttClient = new Paho.MQTT.Client(this.serverAddress, this.serverPort, this.clientId);
        var connectionOptions = {
            keepAliveInterval: 30,
            onSuccess: function () {
                _this.isConnect = true;
                console.log('onSuccess', 'connecting success.');
                _this.mqttClient.subscribe('game/keyid/clientid');
            },
            onFailure: function (message) {
                console.log('connection failed: ' + message.errorMessage);
            }
        };
        this.mqttClient.connect(connectionOptions);
        this.mqttClient.onMessageArrived = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var msg, topic;
            return __generator(this, function (_a) {
                console.log(message);
                try {
                    msg = JSON.parse(message.payloadString);
                }
                catch (e) {
                    msg = message.payloadString;
                }
                topic = message.destinationName;
                console.log({
                    topic: topic,
                    msg: msg,
                });
                // use switch ... case to do sth.
                switch (topic) {
                    case 'game/keyid/clientid':
                        egret.Tween.get(this.bird)
                            .to({ x: this.bird.x + 30, y: this.bird.y }, 300, egret.Ease.sineInOut);
                        break;
                }
                return [2 /*return*/];
            });
        }); };
        this.mqttClient.onConnectionLost = function () {
            _this.isConnect = false;
            console.log('connection to server lost. Attempting to reconnect in ' + _this.reconnectTimeout + ' ms');
            setTimeout(_this.connect, _this.reconnectTimeout);
        };
    };
    Main.prototype.onMessageArrived = function (message) {
        console.log(message);
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
                egret.Tween.get(this.bird)
                    .to({ x: this.bird.x + 5, y: this.bird.y + 5 }, 300, egret.Ease.sineInOut);
                break;
        }
    };
    /**
     * 角色移動
     */
    Main.prototype.moveCharacter = function (_action, _x, _y, _id) {
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
    };
    /**
     * 建立房間
     */
    Main.prototype.roomCreate = function () {
        this.payload = new Paho.MQTT.Message(JSON.stringify({
            action: 'create',
            key: 'dadkfh'
        }));
        this.payload.destinationName = 'room';
        this.mqttClient.send(this.payload);
        this.mqttClient.subscribe('create/keyid');
    };
    Main.prototype.imgLoadHandler = function (evt) {
        var _this = this;
        var bmd = evt.currentTarget.data;
        this.bird = new egret.Bitmap(bmd);
        this.bird.x = 100;
        this.bird.y = 100;
        this.addChild(this.bird);
        this.bird.anchorOffsetX = bmd.width / 2;
        this.bird.anchorOffsetY = bmd.height / 2;
        this.bird.x = this.stage.stageWidth * .5;
        this.bird.y = this.stage.stageHeight * .5;
        this.bird.touchEnabled = true;
        this.bird.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
        }, this);
        // touchAPEventer
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            console.log(event.stageX + ":" + event.stageY);
            egret.Tween.get(_this.bird)
                .to({ x: event.stageX, y: event.stageY }, 300, egret.Ease.quadIn);
        }, this);
        // keyDownEventer
        var _Main = this;
        document.addEventListener("keydown", function (event) {
            switch (event.which) {
                case 37:
                    console.log('左');
                    _this.moveCharacter('move', _this.bird.x - 5, _this.bird.y, 'clientid');
                    break;
                case 38:
                    console.log('上');
                    _this.moveCharacter('move', _this.bird.x, _this.bird.y - 5, 'clientid');
                    break;
                case 39:
                    console.log('右');
                    _this.moveCharacter('move', _this.bird.x + 5, _this.bird.y, 'clientid');
                    break;
                case 40:
                    console.log('下');
                    _this.moveCharacter('move', _this.bird.x, _this.bird.y + 5, 'clientid');
                    break;
            }
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map