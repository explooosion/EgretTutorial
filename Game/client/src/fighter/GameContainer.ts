module fighter {
    /**
    * 主游戏容器
    */
    export class GameContainer extends egret.DisplayObjectContainer {

        private stageW: number;
        private stageH: number;

        private btnStart: egret.Bitmap;
        private bg: fighter.BgMap;
        private myFighter: fighter.Airplane;

        private _lastTime: number;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        }

        private createGameScene(): void {

            this.bg = new fighter.BgMap();
            this.addChild(this.bg);

            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;

            //开始按钮
            this.btnStart = fighter.createBitmapByName("button_join_png");//开始按钮
            this.btnStart.x = (this.stageW - this.btnStart.width) / 2;//居中定位
            this.btnStart.y = (this.stageH - this.btnStart.height) / 2;//居中定位
            this.btnStart.touchEnabled = true;//开启触碰
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.addChild(this.btnStart);

            //我的飞机
            this.myFighter = new fighter.Airplane(RES.getRes("man_png"), 100, "man_png");
            this.myFighter.y = this.stageH - this.myFighter.height - 50;
            this.addChild(this.myFighter);
        }

        /**游戏开始*/
        private gameStart(): void {
            this.bg.start();
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        }

        /**游戏画面更新*/
        private gameViewUpdate(evt: egret.Event): void {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime: number = egret.getTimer();
            var fps: number = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset: number = 60 / fps;

            // var bullet: fighter.Bullet;
            // bullet.y -= 12 * speedOffset;

        }

    }
}