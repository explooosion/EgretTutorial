module flappy {
    export class GameContainer extends egret.DisplayObjectContainer {

        private bg: flappy.BgMap;
        private mybird: flappy.Bird;
        private tube: flappy.Tube;
        private scorePanel: flappy.ScorePanel;

        // 建立時間序列
        private timer: egret.Timer;

        private myScore: number = 0;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        }

        private createGameScene(): void {

            this.bg = new flappy.BgMap();
            this.bg.start();
            this.addChild(this.bg);

            this.tube = new flappy.Tube();
            this.tube.start();
            this.addChild(this.tube);

            this.mybird = new flappy.Bird(RES.getRes('bird_json'), RES.getRes('bird_png'));
            this.mybird.limitMinHight = this.bg.textureHeight;
            this.addChild(this.mybird);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => { this.mybird.flyStart(); }, this);

            this.addEventListener(egret.Event.ENTER_FRAME, this.gameHitTest, this);

            this.scorePanel = new flappy.ScorePanel();

            // Timer 
            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, () => { this.myScore++; }, this);
            this.timer.start();
        }

        private gameHitTest(): void {
            this.tube.tubeArr.forEach((tube: egret.Bitmap) => {
                if (util.hitTest(this.mybird.bird, tube)) {
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.gameHitTest, this);
                    console.log('hit!!!!');

                    this.bg.pause();
                    this.tube.pause();
                    this.timer.stop();

                    // 顯示分數
                    this.scorePanel.showScore(this.myScore);
                    this.scorePanel.x = (this.stage.stageWidth - this.scorePanel.width) / 2;
                    this.scorePanel.y = 100;
                    this.addChild(this.scorePanel);
                    return;
                }
            });
        }

    }

}
