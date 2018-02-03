# 最基本的顯示

[DEMO](http://developer.egret.com/cn/example/egret2d/index.html#010-disp-basic)

建立一個影像讀取器

```ts
var imgLoader:egret.ImageLoader = new egret.ImageLoader;
imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this );
imgLoader.load( "resource/cartoon-egret_00.png" );
```

+ 使用 `egret.Event.COMPLETE` 判斷是否讀取完畢
+ 讀取完畢後值行 `this.imgLoadHandler`

建立 `Bitmap` , 使用 `new egret.Bitmap` 讀取圖資

```ts
var bmd:egret.BitmapData = evt.currentTarget.data;
var bird:egret.Bitmap = new egret.Bitmap( bmd );
```

建立點擊事件 `egret.TouchEvent.TOUCH_BEGIN`

```ts
this.stage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, ( evt:egret.TouchEvent )=>{
    bird.x = evt.localX ;
    bird.y = evt.localY ;
}, this );
```