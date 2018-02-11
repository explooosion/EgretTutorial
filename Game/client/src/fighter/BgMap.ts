module fighter {
    /**
     * 可滾動的底圖
     */
    export class BgMap extends egret.DisplayObjectContainer {

        // 存放由圖片合併而成的大圖(底片
        private bmpArr: egret.Bitmap[];

        // 圖片數量
        private rowCount: number;

        // 容器寬
        private stageW: number;

        // 容器高
        private stageH: number;

        // 圖片來源寬
        private textureWidth: number;

        // 場景移動速度
        private speed: number = 5;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {

            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var texture: egret.Texture = RES.getRes("game_bg_jpg");

            this.textureWidth = texture.textureWidth;

            // 計算當前容器(或螢幕), 需要多少張圖片才能填滿
            this.rowCount = Math.ceil(this.stageW / this.textureWidth) + 1;
            this.bmpArr = [];

            // 將圖片並列在一起
            for (var i: number = 0; i < this.rowCount; i++) {
                var bgBmp: egret.Bitmap = fighter.createBitmapByName("game_bg_jpg");
                bgBmp.x = this.textureWidth * i - (this.textureWidth * this.rowCount - this.stageW);;
                this.bmpArr.push(bgBmp);
                this.addChild(bgBmp);
            }
        }

        /**
         * 開始滾動
         */
        public start(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }

        /**
         * 滾動 - ENTER_FRAME
         */
        private enterFrameHandler(event: egret.Event): void {
            for (var i: number = 0; i < this.rowCount; i++) {
                var bgBmp: egret.Bitmap = this.bmpArr[i];
                bgBmp.x -= this.speed;

                // 當最左邊圖片超過尺寸時移除,並重新推入陣列內
                if (i == 0 && Math.abs(bgBmp.x) >= this.textureWidth) {
                    bgBmp.x = this.bmpArr[this.rowCount - 1].x + this.textureWidth;
                    this.bmpArr.shift();
                    this.bmpArr.push(bgBmp);
                }
            }
        }

        /**
         * 暫停滾動
         */
        public pause(): void {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
    }

}