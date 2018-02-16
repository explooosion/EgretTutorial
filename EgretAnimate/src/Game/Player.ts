module Game {
    export class Player extends egret.DisplayObjectContainer {

        private playerFactorty: egret.MovieClipDataFactory;
        private player: egret.MovieClip;

        public constructor(texture_json: egret.Texture, texture_png: egret.Texture) {
            super();
            this.playerFactorty = new egret.MovieClipDataFactory(texture_json, texture_png);
            this.player = new egret.MovieClip(this.playerFactorty.generateMovieClipData('metal'));

            this.player.touchEnabled = true;
            this.player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            this.player.addEventListener(egret.MovieClipEvent.COMPLETE, this.loopComplete, this);

            this.addChild(this.player);
            this.player.gotoAndPlay('stand', -1);
        }

        private touchHandler(event: egret.TouchEvent) {
            this.player.gotoAndPlay('eat', 1);
            this.player.touchEnabled = false;
        }

        private loopComplete(event: egret.MovieClipEvent) {
            this.player.gotoAndPlay('stand', -1);
            this.player.touchEnabled = true;
        }
    }
}