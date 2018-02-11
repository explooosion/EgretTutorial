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
var fighter;
(function (fighter) {
    /**
    * 主游戏容器
    */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            /**我的子弹*/
            _this.myBullets = [];
            /**敌人的飞机*/
            _this.enemyFighters = [];
            /**触发创建敌机的间隔*/
            _this.enemyFightersTimer = new egret.Timer(1000);
            /**敌人的子弹*/
            _this.enemyBullets = [];
            /**我的成绩*/
            _this.myScore = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        /**初始化*/
        GameContainer.prototype.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        /**创建游戏场景*/
        GameContainer.prototype.createGameScene = function () {
            this.bg = new fighter.BgMap(); //创建可滚动的背景
            this.addChild(this.bg);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            //开始按钮
            this.btnStart = fighter.createBitmapByName("button_join_png"); //开始按钮
            this.btnStart.x = (this.stageW - this.btnStart.width) / 2; //居中定位
            this.btnStart.y = (this.stageH - this.btnStart.height) / 2; //居中定位
            this.btnStart.touchEnabled = true; //开启触碰
            //点击按钮开始游戏.下面再添加 gameStart 方法，记得要把这一行的注释取消掉哦。
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.addChild(this.btnStart);
            //我的飞机
            this.myFighter = new fighter.Airplane(RES.getRes("man_png"), 100, "man_png");
            this.myFighter.y = this.stageH - this.myFighter.height - 50;
            this.addChild(this.myFighter);
        };
        /**游戏开始*/
        GameContainer.prototype.gameStart = function () {
            this.bg.start();
            this.myFighter.fire(); //我的飞机开火
            this.enemyFightersTimer.addEventListener(egret.TimerEvent.TIMER, this.createEnemyFighter, this);
            this.enemyFightersTimer.start();
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        };
        /**创建敌机*/
        GameContainer.prototype.createEnemyFighter = function (evt) {
            var enemyFighter = fighter.Airplane.produce("cat_png", 1000);
            enemyFighter.x = Math.random() * (this.stageW - enemyFighter.width); //随机坐标
            enemyFighter.y = -enemyFighter.height - Math.random() * 300; //随机坐标
            enemyFighter.fire();
            this.addChildAt(enemyFighter, this.numChildren - 1);
            this.enemyFighters.push(enemyFighter);
            this.myFighter.addEventListener("createBullet", this.createBulletHandler, this);
            enemyFighter.addEventListener("createBullet", this.createBulletHandler, this); //在createEnemyFighter方法中修改
        };
        /**游戏画面更新*/
        GameContainer.prototype.gameViewUpdate = function (evt) {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this._lastTime);
            this._lastTime = nowTime;
            var speedOffset = 60 / fps;
            //我的子弹运动
            var i = 0;
            var bullet;
            var myBulletsCount = this.myBullets.length;
            for (; i < myBulletsCount; i++) {
                bullet = this.myBullets[i];
                if (bullet.y < -bullet.height) {
                    this.removeChild(bullet);
                    fighter.Bullet.reclaim(bullet, 'cat_png');
                    this.myBullets.splice(i, 1);
                    i--;
                    myBulletsCount--;
                }
                bullet.y -= 12 * speedOffset;
            }
            //敌人飞机运动
            var theFighter;
            var enemyFighterCount = this.enemyFighters.length;
            for (i = 0; i < enemyFighterCount; i++) {
                theFighter = this.enemyFighters[i];
                if (theFighter.y > this.stage.stageHeight) {
                    this.removeChild(theFighter);
                    fighter.Airplane.reclaim(theFighter);
                    theFighter.removeEventListener("createBullet", this.createBulletHandler, this);
                    theFighter.stopFire();
                    this.enemyFighters.splice(i, 1);
                    i--;
                    enemyFighterCount--;
                }
                theFighter.y += 4 * speedOffset;
            }
            //敌人子弹运动
            var enemyBulletsCount = this.enemyBullets.length;
            for (i = 0; i < enemyBulletsCount; i++) {
                bullet = this.enemyBullets[i];
                if (bullet.y > this.stage.stageHeight) {
                    this.removeChild(bullet);
                    fighter.Bullet.reclaim(bullet, 'cat_png');
                    this.enemyBullets.splice(i, 1);
                    i--;
                    enemyBulletsCount--; //数组长度已经改变
                }
                bullet.y += 8 * speedOffset;
            }
            this.gameHitTest();
        };
        /**响应Touch*/
        GameContainer.prototype.touchHandler = function (evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                var tx = evt.localX;
                tx = Math.max(0, tx);
                tx = Math.min(this.stageW - this.myFighter.width, tx);
                this.myFighter.x = tx;
            }
        };
        /**游戏碰撞检测*/
        GameContainer.prototype.gameHitTest = function () {
        };
        /**创建子弹(包括我的子弹和敌机的子弹)*/
        GameContainer.prototype.createBulletHandler = function (evt) {
            var bullet;
            if (evt.target == this.myFighter) {
                for (var i = 0; i < 2; i++) {
                    bullet = fighter.Bullet.produce("b1");
                    bullet.x = i == 0 ? (this.myFighter.x + 10) : (this.myFighter.x + this.myFighter.width - 22);
                    bullet.y = this.myFighter.y + 30;
                    this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                    this.myBullets.push(bullet);
                }
            }
            else {
                var theFighter = evt.target;
                bullet = fighter.Bullet.produce("b2");
                bullet.x = theFighter.x + 28;
                bullet.y = theFighter.y + 10;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemyFighters.length);
                this.enemyBullets.push(bullet);
            }
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    fighter.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "fighter.GameContainer");
})(fighter || (fighter = {}));
//# sourceMappingURL=GameContainer.js.map