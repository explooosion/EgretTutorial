# Example_6

+ 顯示對象遮罩

```ts
//将maskSprite设置为mySprite的遮罩
mySprite.mask = maskSprite;
```

+ example:

```ts
//画一个红色的正方形
 var square:egret.Shape = new egret.Shape();
 square.graphics.beginFill(0xff0000);
 square.graphics.drawRect(0,0,100,100);
 square.graphics.endFill();
 this.addChild(square);
//画一个蓝色的圆形
var circle:egret.Shape = new egret.Shape();
circle.graphics.beginFill(0x0000ff);
circle.graphics.drawCircle(25,25,25);
circle.graphics.endFill();
this.addChild(circle);
square.mask = circle;
```

+ demo:

![img](http://cdn.dev.egret.com/egret-docs/Engine2D/mask/mask/55a32cdb75779.png)

+ 移除遮罩

```ts
mySprite.mask = null;
```