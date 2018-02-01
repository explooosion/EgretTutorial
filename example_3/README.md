# Example_3

+ [变换操作](http://developer.egret.com/cn/github/egret-docs/Engine2D/displayObject/transform/index.html)

## 修改锚点

```ts
shp.anchorOffsetX = 50;
```

![img](http://cdn.dev.egret.com/egret-docs/Engine2D/displayObject/transform/556535128b8ba.png)

## Position And Moving

```ts
container.x = 17;
container.y = 212;
```

## MOVE 滑動

```ts
//设定2个偏移量
var offsetX: number;
var offsetY: number;
//画一个红色的圆
var circle: egret.Shape = new egret.Shape();
circle.graphics.beginFill(0xff0000);
circle.graphics.drawCircle(25, 25, 25);
circle.graphics.endFill();
this.addChild(circle);
//手指按到屏幕，触发 startMove 方法
circle.touchEnabled = true;
circle.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startMove, this);
//手指离开屏幕，触发 stopMove 方法
circle.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);

function startMove(e: egret.TouchEvent): void {
    //计算手指和圆形的距离
    offsetX = e.stageX - circle.x;
    offsetY = e.stageY - circle.y;
    //手指在屏幕上移动，会触发 onMove 方法
    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
}
function stopMove(e: egret.TouchEvent) {
    console.log(22);
    //手指离开屏幕，移除手指移动的监听
    this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
}
function onMove(e: egret.TouchEvent): void {
    //通过计算手指在屏幕上的位置，计算当前对象的坐标，达到跟随手指移动的效果
    circle.x = e.stageX - offsetX;
    circle.y = e.stageY - offsetY;
}
```

## 尺寸與縮放

```ts
//设定对象的大小
mySprite.width = 50;
mySprite.height = 100;

//设定对象的大小
mySprite.scaleX = 2;
mySprite.scaleY = 2;
```

## 選轉與斜切

![skewX](http://cdn.dev.egret.com/egret-docs/Engine2D/displayObject/transform/skewX_compare.png)

```ts
//设定对象的X方向斜切
mySprite.skewX = 10;
```

![skewY](http://cdn.dev.egret.com/egret-docs/Engine2D/displayObject/transform/skewY_compare.png)

```ts
//设定对象的Y方向斜切
mySprite.skewY = 10;
```