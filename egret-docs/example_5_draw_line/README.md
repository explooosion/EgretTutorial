# 向量繪圖

## 矩形

+ 封裝好的繪圖方法

    ```ts
    var shp:egret.Shape = new egret.Shape();

    shp.graphics.beginFill( 0xff0000, 1);
    shp.graphics.drawRect( 0, 0, 100, 200 );
    shp.graphics.endFill();
    ```

+ 外框繪製

    ```ts
    shp.graphics.lineStyle( 10, 0x00ff00 );
    ```

+ demo![demo](http://cdn.dev.egret.com/egret-docs/Engine2D/vectorDrawing/vectorDrawing/5565675e02ce3.png)

## 圓形

+ 使用 `drawCircle` 繪製:

    ```ts
    var shp:egret.Shape = new egret.Shape();
    shp.x = 100;
    shp.y = 100;
    shp.graphics.lineStyle( 10, 0x00ff00 );
    shp.graphics.beginFill( 0xff0000, 1);
    shp.graphics.drawCircle( 0, 0, 50 );
    shp.graphics.endFill();
    this.addChild( shp );
    ```

+ demo![demo](http://cdn.dev.egret.com/egret-docs/Engine2D/vectorDrawing/vectorDrawing/5661535675def.png)

## 直線

+ 使用 `moveTo()` 和 `lineTo()`:

    ```ts
    var shp:egret.Shape = new egret.Shape();
    shp.graphics.lineStyle( 2, 0x00ff00 );
    shp.graphics.moveTo( 10,10 );
    shp.graphics.lineTo( 100, 20 );
    shp.graphics.endFill();
    this.addChild( shp );
    ```

+ demo![demo](http://cdn.dev.egret.com/egret-docs/Engine2D/vectorDrawing/vectorDrawing/566153894306a.png)

## 扇形 - 進度條

+ 使用 `drawArc` 繪製圓弧, 然後使用 `Math.PI` 計算扇形:

```ts
private getSectorProgress():egret.Shape {
    var shape:egret.Shape = new egret.Shape();
    var angle:number = 0;
    egret.startTick(function (timeStamp:number):boolean {
        angle += 1;
        changeGraphics(angle);
        angle = angle % 360;
        return true;
    }, this);
    return shape;
    function changeGraphics(angle) {
        shape.graphics.clear();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.moveTo(50, 50);
        shape.graphics.lineTo(100, 50);
        shape.graphics.drawArc(50, 50, 50, 0, angle * Math.PI / 180, false);
        shape.graphics.lineTo(50, 50);
        shape.graphics.endFill();
    }
}
```

+ 動畫部分使用 `egret.startTick`, 可参考 [Timer计时器](http://developer.egret.com/cn/apidoc/index/name/egret.Timer)