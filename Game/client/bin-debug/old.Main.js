//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var OldMain = (function (_super) {
    __extends(OldMain, _super);
    function OldMain() {
        var _this = _super.call(this) || this;
        _this.gd = new GameData();
        return _this;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    OldMain.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
                // console.log('hello,world')
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    OldMain.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    OldMain.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
            this.connect();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    OldMain.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    OldMain.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    OldMain.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    OldMain.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    OldMain.prototype.createGameScene = function () {
        var _this = this;
        // Image
        this.img = this.createBitmapByName("cartoon-egret_00_png");
        this.addChild(this.img);
        this.img.x = 26;
        this.img.y = 33;
        this.img.x = this.stage.stageWidth * .5;
        this.img.y = this.stage.stageHeight * .5;
        // Button
        var btnImg = new egret.Bitmap();
        btnImg = this.createBitmapByName("button-join_png");
        this.addChild(btnImg);
        btnImg.x = 0;
        btnImg.y = 0;
        btnImg.touchEnabled = true;
        btnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            if (_this.mqttClient.isConnected) {
                // 加入房間 
                _this.roomJoin();
            }
        }, this);
        // keyDownEventer
        var _Main = this;
        document.addEventListener("keydown", function (event) {
            switch (event.which) {
                case 37:
                    console.log('左');
                    _Main.moveCharacter('move', _Main.img.x - 5, _Main.img.y, _Main.gd.playerId);
                    break;
                case 38:
                    console.log('上');
                    _Main.moveCharacter('move', _Main.img.x, _this.img.y - 5, _Main.gd.playerId);
                    break;
                case 39:
                    console.log('右');
                    _Main.moveCharacter('move', _Main.img.x + 5, _Main.img.y, _Main.gd.playerId);
                    break;
                case 40:
                    console.log('下');
                    _Main.moveCharacter('move', _Main.img.x, _Main.img.y + 5, _Main.gd.playerId);
                    break;
            }
        });
    };
    /**
     * MQTT 連線
     * Connect to MQTT Server
     */
    OldMain.prototype.connect = function () {
        var _this = this;
        this.mqttClient = new Paho.MQTT.Client(this.gd.serverAddress, this.gd.serverPort, this.gd.clientId);
        var connectionOptions = {
            keepAliveInterval: 30,
            // requestQoS: 0,
            onSuccess: function () {
                console.log('onSuccess', 'connecting success.');
                // // 先開測試房間
                // this.payload = new Paho.MQTT.Message(JSON.stringify({
                //     action: 'create',
                //     key: this.gd.masterId
                // }));
                // this.payload.destinationName = 'room';
                // this.mqttClient.send(this.payload);
                // // 訂閱-開新房間有沒有開成功
                // this.mqttClient.subscribe(`create/${this.gd.masterId}`);
            },
            onFailure: function (message) {
                console.log('connection failed: ' + message.errorMessage);
            }
        };
        this.mqttClient.connect(connectionOptions);
        this.mqttClient.onMessageArrived = function (message) { return __awaiter(_this, void 0, void 0, function () {
            var msg, topic, res;
            return __generator(this, function (_a) {
                try {
                    msg = JSON.parse(message.payloadString);
                }
                catch (e) {
                    msg = message.payloadString;
                }
                topic = message.destinationName;
                // use switch ... case to do sth.
                switch (topic) {
                    case "join/" + this.gd.masterId:
                        this.gd.playerId = msg.id;
                        this.gd.mapId = msg.map;
                        // 加入房間後立即取得角色資訊
                        this.mqttClient.subscribe("game/" + this.gd.masterId + "/" + this.gd.playerId);
                        break;
                    case "game/" + this.gd.masterId + "/" + this.gd.playerId:
                        res = msg;
                        this.gd.player = res;
                        console.log(this.gd.player);
                        egret.Tween.get(this.img)
                            .to({ x: this.gd.player.x, y: this.gd.player.y }, 300, egret.Ease.sineInOut);
                        break;
                }
                return [2 /*return*/];
            });
        }); };
        this.mqttClient.onConnectionLost = function () {
            console.log('connection to server lost. Attempting to reconnect in ' + _this.gd.reconnectTimeout + ' ms');
            setTimeout(_this.connect, _this.gd.reconnectTimeout);
        };
    };
    /**
     * 加入房間
     */
    OldMain.prototype.roomJoin = function () {
        this.payload = new Paho.MQTT.Message(JSON.stringify({
            action: 'join',
            key: this.gd.masterId
        }));
        this.payload.destinationName = 'room';
        this.mqttClient.send(this.payload);
        this.mqttClient.subscribe("join/" + this.gd.masterId);
    };
    /**
     * 角色移動
     */
    OldMain.prototype.moveCharacter = function (_action, _x, _y, _id) {
        this.payload = new Paho.MQTT.Message(JSON.stringify({
            action: _action,
            x: _x,
            y: _y,
            id: _id,
        }));
        this.payload.destinationName = "game/" + this.gd.masterId;
        this.mqttClient.send(this.payload);
    };
    return OldMain;
}(egret.DisplayObjectContainer));
__reflect(OldMain.prototype, "OldMain");
//# sourceMappingURL=old.Main.js.map