# Example_7

碰撞检测 `hitTestPoint()` ，判断显示对象是否与一点相交。

+ 矩形碰撞检测

矩形碰撞检测，是判断显示对象的包围盒是否与一点相交。

```ts
var isHit:boolean = shp.hitTestPoint( x: number, y:number );
```

+ 像素碰撞检测

像素碰撞检测，是判断显示对象的图案（非透明区域）是否与一点相交。同样使用 hitTestPoint() 方法，用法为：

```ts
var isHit:boolean = shp.hitTestPoint( x: number, y:number, true:boolean );
```

+ 兩者差異

矩形碰撞检测，是判断显示对象的包围盒是否与一点相交；而像素碰撞检测，是判断显示对象的图案（非透明区域）是否与一点相交。