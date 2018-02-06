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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.reconnectTimeout = 3000;
        _this.serverAddress = '60.249.179.126';
        _this.serverPort = 8083;
        _this.clientId = 'mqttjs_123456';
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
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
    Main.prototype.onConfigComplete = function (event) {
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
    Main.prototype.onResourceLoadComplete = function (event) {
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
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
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
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        // Image
        this.img = this.createBitmapByName("cartoon-egret_00_png");
        this.addChild(this.img);
        this.img.x = 26;
        this.img.y = 33;
        // Button
        var btnJoin = new eui.Button();
        btnJoin.x = 100;
        btnJoin.y = 100;
        btnJoin.width = 400;
        btnJoin.height = 40;
        btnJoin.label = '加入房間';
        btnJoin.skinName = "resource/eui_skins/ButtonSkin.exml";
        this.addChild(btnJoin);
        btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
        this.img.x = this.stage.stageWidth * .5;
        this.img.y = this.stage.stageHeight * .5;
        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
        }, this);
        // touchAPEventer
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            console.log(event.stageX + ":" + event.stageY);
            egret.Tween.get(_this.img)
                .to({ x: event.stageX, y: event.stageY }, 300, egret.Ease.quadIn);
        }, this);
        // keyDownEventer
        var _Main = this;
        document.addEventListener("keydown", function (event) {
            switch (event.which) {
                case 37:
                    console.log('左');
                    _this.moveCharacter('move', _this.img.x - 5, _this.img.y, 'clientid');
                    break;
                case 38:
                    console.log('上');
                    _this.moveCharacter('move', _this.img.x, _this.img.y - 5, 'clientid');
                    break;
                case 39:
                    console.log('右');
                    _this.moveCharacter('move', _this.img.x + 5, _this.img.y, 'clientid');
                    break;
                case 40:
                    console.log('下');
                    _this.moveCharacter('move', _this.img.x, _this.img.y + 5, 'clientid');
                    break;
            }
        });
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.connect = function () {
        var _this = this;
        this.mqttClient = new Paho.MQTT.Client(this.serverAddress, this.serverPort, this.clientId);
        var connectionOptions = {
            keepAliveInterval: 30,
            onSuccess: function () {
                console.log('onSuccess', 'connecting success.');
                // 開新房間
                _this.mqttClient.subscribe('create/keyid');
                // 了解目前狀態
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
                        egret.Tween.get(this.img)
                            .to({ x: this.img.x + 30, y: this.img.y }, 300, egret.Ease.sineInOut);
                        break;
                }
                return [2 /*return*/];
            });
        }); };
        this.mqttClient.onConnectionLost = function () {
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
                egret.Tween.get(this.img)
                    .to({ x: this.img.x + 5, y: this.img.y + 5 }, 300, egret.Ease.sineInOut);
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
    Main.prototype.btnTouchHandler = function (event) {
        if (this.mqttClient.isConnected) {
            // 加入房間 
            this.mqttClient.subscribe('join/keyid');
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map