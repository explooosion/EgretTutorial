module Game {
    export class GameContainer extends egret.DisplayObjectContainer {

        private player: Game.Player;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        }

        private createGameScene(): void {
            this.player = new Game.Player(RES.getRes('metal_json'), RES.getRes('metal_png'));
            this.addChild(this.player);
        }
    }
}