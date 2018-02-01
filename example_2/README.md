# Example_2

## Shape

+ 繪製圖形使用 Shape.

```ts
class MyGrid extends egret.Shape {
    public constructor() {
        super();
        this.drawGrid();
    }
    private drawGrid() {
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(50, 50, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(50, 0, 50, 50);
        this.graphics.endFill();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(0, 50, 50, 50);
        this.graphics.endFill();
    }
}
```

## Sprite

+ sprite 是個容器, 他繼承了 DisplayObjectContainer.
+ 也包含了 Graphics 等功能