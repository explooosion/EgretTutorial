var util;
(function (util) {
    /**
     * 基于矩形的碰撞检测
     */
    function hitTest(obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        if (rect1.intersects(rect2))
            console.log(rect1, rect2);
        return rect1.intersects(rect2);
    }
    util.hitTest = hitTest;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    util.createBitmapByName = createBitmapByName;
})(util || (util = {}));
//# sourceMappingURL=GameUtil.js.map