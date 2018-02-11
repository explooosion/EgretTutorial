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

class OldMain extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    /**
     * 遊戲背景圖
     */
    private bg: fighter.BgMap;

    /**
     * Paho MQTT 訊息交換
     */
    private mqttClient: Paho.MQTT.Client;
    private payload: Paho.MQTT.Message;

    private gd: GameData;

    private img: egret.Bitmap;

    public constructor() {
        super();
        this.gd = new GameData();
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                // console.log('hello,world')
            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
            this.connect();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
 
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
        btnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent): void => {
            if (this.mqttClient.isConnected) {
                // 加入房間 
                this.roomJoin();
            }
        }, this);

        // keyDownEventer
        var _Main = this;
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            switch (event.which) {
                case 37:
                    console.log('左');
                    _Main.moveCharacter('move', _Main.img.x - 5, _Main.img.y, _Main.gd.playerId);
                    break;
                case 38:
                    console.log('上');
                    _Main.moveCharacter('move', _Main.img.x, this.img.y - 5, _Main.gd.playerId);
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
    }

    /**
     * MQTT 連線
     * Connect to MQTT Server
     */
    private connect(): void {

        this.mqttClient = new Paho.MQTT.Client(this.gd.serverAddress, this.gd.serverPort, this.gd.clientId);
        const connectionOptions = {
            keepAliveInterval: 30,
            // requestQoS: 0,
            onSuccess: (): void => {
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
            onFailure(message) {
                console.log('connection failed: ' + message.errorMessage);
            }
        };

        this.mqttClient.connect(connectionOptions);

        this.mqttClient.onMessageArrived = async (message) => {
            let msg;
            try {
                msg = JSON.parse(message.payloadString)
            } catch (e) {
                msg = message.payloadString;
            }
            const topic = message.destinationName;

            // use switch ... case to do sth.
            switch (topic) {
                case `join/${this.gd.masterId}`:

                    this.gd.playerId = msg.id;
                    this.gd.mapId = msg.map;

                    // 加入房間後立即取得角色資訊
                    this.mqttClient.subscribe(`game/${this.gd.masterId}/${this.gd.playerId}`);
                    break;

                case `game/${this.gd.masterId}/${this.gd.playerId}`:

                    let res: StatusSub = msg;
                    this.gd.player = res;

                    console.log(this.gd.player);

                    egret.Tween.get(this.img)
                        .to({ x: this.gd.player.x, y: this.gd.player.y }, 300, egret.Ease.sineInOut);

                    break;
            }
        };

        this.mqttClient.onConnectionLost = (): void => {
            console.log('connection to server lost. Attempting to reconnect in ' + this.gd.reconnectTimeout + ' ms');
            setTimeout(this.connect, this.gd.reconnectTimeout);
        };
    }

    /**
     * 加入房間
     */
    private roomJoin() {
        this.payload = new Paho.MQTT.Message(JSON.stringify({
            action: 'join',
            key: this.gd.masterId
        }));
        this.payload.destinationName = 'room';
        this.mqttClient.send(this.payload);
        this.mqttClient.subscribe(`join/${this.gd.masterId}`);
    }


    /**
     * 角色移動
     */
    private moveCharacter(_action, _x, _y, _id): void {

        this.payload = new Paho.MQTT.Message(JSON.stringify({
            action: _action,
            x: _x,
            y: _y,
            id: _id,
        }));
        this.payload.destinationName = `game/${this.gd.masterId}`;
        this.mqttClient.send(this.payload);

    }
}


