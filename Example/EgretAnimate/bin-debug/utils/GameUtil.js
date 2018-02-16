var util;
(function (util) {
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    util.createBitmapByName = createBitmapByName;
})(util || (util = {}));
//# sourceMappingURL=GameUtil.js.map