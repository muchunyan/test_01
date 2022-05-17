function animate(obj, target, callback) {
    //为了防止动画叠加 需要保证只有一个动画执行
    clearInterval(obj.timer);//使用obj.timer是防止一直开辟新空间浪费资源
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            if (callback) {
                //如果存在回调函数则调用
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}