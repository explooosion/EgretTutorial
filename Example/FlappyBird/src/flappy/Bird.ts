module flappy {
    export class Bird extends egret.DisplayObjectContainer {

        private birdFactorty: egret.MovieClipDataFactory;
        public bird: egret.MovieClip;

        private v1: number = 1;
        private v2: number = 20;

        public limitMinHight: number = 0;

        public constructor(texture_json: egret.Texture, texture_png: egret.Texture) {
            super();
            this.birdFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
            this.bird = new egret.MovieClip(this.birdFactorty.generateMovieClipData('bird'));
            this.bird.x = 100;

            this.addChild(this.bird);
            this.bird.gotoAndPlay('bird_fly', -1);

            this.bird.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }

        private enterFrameHandler(event: egret.Event) {
            this.bird.y = this.bird.y + this.v1;
            this.v1 = this.v1 + 1;

            if (this.bird.y >= this.limitMinHight - this.bird.height * 1.7) {
                this.v1 = 0;
            }
        }

        public flyStart(): void {

            this.v2 = 20;
            this.v1 = 1;

            this.bird.removeEventListener(egret.Event.ENTER_FRAME, this.flyHandler, this);
            this.bird.addEventListener(egret.Event.ENTER_FRAME, this.flyHandler, this);
        }

        private flyHandler(): void {
            this.bird.y = this.bird.y - this.v2;
            this.v2 = this.v2 - 0.8;

            if (this.v2 < 0) {
                this.v2 = 20;
                this.bird.removeEventListener(egret.Event.ENTER_FRAME, this.flyHandler, this);
            }
        }
    }
}