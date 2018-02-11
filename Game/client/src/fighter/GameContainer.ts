module fighter {
    /**
    * 主游戏容器
    */
    export class GameContainer extends egret.DisplayObjectContainer {

        /**@private*/
        private stageW: number;
        /**@private*/
        private stageH: number;
        /**开始按钮*/
        private btnStart: egret.Bitmap;
        /**可滚动背景*/
        private bg: fighter.BgMap;
        /**我的飞机*/
        private myFighter: fighter.Airplane;
        /**我的子弹*/
        private myBullets: fighter.Bullet[] = [];
        /**敌人的飞机*/
        private enemyFighters: fighter.Airplane[] = [];
        /**触发创建敌机的间隔*/
        private enemyFightersTimer: egret.Timer = new egret.Timer(1000);
        /**敌人的子弹*/
        private enemyBullets: fighter.Bullet[] = [];
        /**成绩显示*/
        private scorePanel: fighter.ScorePanel;
        /**我的成绩*/
        private myScore: number = 0;
        /**@private*/
        private _lastTime: number;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        /**初始化*/
        private onAddToStage(event: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        }
        /**创建游戏场景*/
        private createGameScene(): void {

            this.bg = new fighter.BgMap();//创建可滚动的背景
            this.addChild(this.bg);

            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            //开始按钮
            this.btnStart = fighter.createBitmapByName("button_join_png");//开始按钮
            this.btnStart.x = (this.stageW - this.btnStart.width) / 2;//居中定位
            this.btnStart.y = (this.stageH - this.btnStart.height) / 2;//居中定位
            this.btnStart.touchEnabled = true;//开启触碰
            //点击按钮开始游戏.下面再添加 gameStart 方法，记得要把这一行的注释取消掉哦。
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

            this.myFighter.fire();//我的飞机开火
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
            this.enemyFightersTimer.start();

            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);


        }

        /**创建敌机*/
        private createEnemyFighter(evt: egret.TimerEvent): void {
            var enemyFighter: fighter.Airplane = fighter.Airplane.produce("cat_png", 1000);
            enemyFighter.x = Math.random() * (this.stageW - enemyFighter.width);//随机坐标
            enemyFighter.y = -enemyFighter.height - Math.random() * 300;//随机坐标
            enemyFighter.fire();
            this.addChildAt(enemyFighter, this.numChildren - 1);
            this.enemyFighters.push(enemyFighter);

            this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
            enemyFighter.addEventListener("createBullet", this.createBulletHandler, this);//在createEnemyFighter方法中修改
        }

        /**游戏画面更新*/
        private gameViewUpdate(evt: egret.Event): void {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime: number = egret.getTimer();
            var fps: number = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset: number = 60 / fps;
            //我的子弹运动
            var i: number = 0;
            var bullet: fighter.Bullet;
            var myBulletsCount: number = this.myBullets.length;
            for (; i < myBulletsCount; i++) {
                bullet = this.myBullets[i];
                if (bullet.y < -bullet.height) {
                    this.removeChild(bullet);
                    Bullet.reclaim(bullet, 'cat_png');
                    this.myBullets.splice(i, 1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= 12 * speedOffset;

            }
            //敌人飞机运动
            var theFighter: fighter.Airplane;
            var enemyFighterCount: number = this.enemyFighters.length;
            for (i = 0; i < enemyFighterCount; i++) {
                theFighter = this.enemyFighters[i];
                if (theFighter.y > this.stage.stageHeight) {
                    this.removeChild(theFighter);
                    Airplane.reclaim(theFighter);
                    theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i, 1);
                    i--;
                    enemyFighterCount--;
                }
                theFighter.y += 4 * speedOffset;

            }
            //敌人子弹运动
            var enemyBulletsCount: number = this.enemyBullets.length;
            for (i = 0; i < enemyBulletsCount; i++) {
                bullet = this.enemyBullets[i];
                if (bullet.y > this.stage.stageHeight) {
                    this.removeChild(bullet);
                    Bullet.reclaim(bullet, 'cat_png');
                    this.enemyBullets.splice(i, 1);
                    i--;
                    enemyBulletsCount--;//数组长度已经改变
                }

                bullet.y += 8 * speedOffset;

            }
            this.gameHitTest();
        }

        /**响应Touch*/
        private touchHandler(evt: egret.TouchEvent): void {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                var tx: number = evt.localX;
                tx = Math.max(0, tx);
                tx = Math.min(this.stageW - this.myFighter.width, tx);
                this.myFighter.x = tx;
            }
        }

        /**游戏碰撞检测*/
        private gameHitTest(): void {

        }

        /**创建子弹(包括我的子弹和敌机的子弹)*/
        private createBulletHandler(evt: egret.Event): void {
            var bullet: fighter.Bullet;
            if (evt.target == this.myFighter) {
                for (var i: number = 0; i < 2; i++) {
                    bullet = fighter.Bullet.produce("b1");
                    bullet.x = i == 0 ? (this.myFighter.x + 10) : (this.myFighter.x + this.myFighter.width - 22);
                    bullet.y = this.myFighter.y + 30;
                    this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                    this.myBullets.push(bullet);
                }
            } else {
                var theFighter: fighter.Airplane = evt.target;
                bullet = fighter.Bullet.produce("b2");
                bullet.x = theFighter.x + 28;
                bullet.y = theFighter.y + 10;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                this.enemyBullets.push(bullet);
            }
        }
    }
}