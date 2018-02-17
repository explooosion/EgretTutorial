module flappy {
    export class Tube extends egret.DisplayObjectContainer {

        // 水管陣列
        public tubeArr: egret.Bitmap[] = [];

        // 起始位置
        private positionStart: number = 1920;

        // 最低位置
        private positionMinHeight: number = 650;

        // 建立時間序列
        private timer: egret.Timer;

        // 素材寬度
        private textureWidth: number;

        // 場景移動速度
        private speed: number = 10;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }

        /**
         * 工廠建造水管
         */
        private tubeFactoryHandler(event: egret.Event) {

            var tube: egret.Bitmap = util.createBitmapByName("tube_png");

            var y = Math.floor(Math.random() * 251) + 150; // 400~150
            var direction: boolean = Math.floor(Math.random() * 2) + 0 > 0 ? true : false; // 400~150

            // 1 倒向 0 正向
            if (direction) {
                tube.x = this.positionStart + 100;
                tube.y = y;
                tube.width = 100;
                tube.height = y;
                tube.rotation = -180;
            } else {
                tube.x = this.positionStart + 100;
                tube.y = this.positionMinHeight - y;
                tube.width = 100;
                tube.height = y;
            }

            this.textureWidth = 100;
            this.tubeArr.push(tube);

            this.addChild(tube);

        }

        /**
         * 滾動 - ENTER_FRAME
         */
        private enterFrameHandler(event: egret.Event) {

            for (var i: number = 0; i < this.tubeArr.length; i++) {
                if (this.tubeArr[i].x <= -1 * this.textureWidth) {
                    this.tubeArr.shift();
                }
                this.tubeArr[i].x -= this.speed;
            }
        }

        /**
         * 開始工作
         */
        public start(): void {
            this.tubeArr = [];
            this.timer = new egret.Timer(1800, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.tubeFactoryHandler, this);
            this.timer.start();
        }


        /**
         * 暫停滾動
         */
        public pause(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.tubeFactoryHandler, this);
            this.timer.stop();
        }
    }
}