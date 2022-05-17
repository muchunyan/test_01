window.addEventListener('load', function () {
    var pic = this.document.querySelector('.pic');
    var mask = this.document.querySelector('.mask');
    var big = this.document.querySelector('.big');
    //鼠标经过显示 离开隐藏
    pic.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    pic.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    //框框跟着鼠标移动
    pic.addEventListener('mousemove', function (e) {
        var bigimg = document.querySelector('.bigimg');
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //mask的移动距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //mask的最大移动距离
        var maskMax = pic.offsetWidth - mask.offsetWidth;
        //大图片最大移动距离
        var bigimgMax = bigimg.offsetWidth - big.offsetWidth;
        //让黄色盒子固定在图片内
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';//一定要记得加单位!!!
        mask.style.top = maskY + 'px';
        //大图片移动距离=mask移动距离*大图片最大移动距离/mask的最大移动距离
        var bigX = maskX * bigimgMax / maskMax;
        var bigY = maskY * bigimgMax / maskMax;//是正方形宽高一样
        bigimg.style.left = -bigX + 'px';//图片必须加绝对定位设置top和left才可以用style，才可以移动
        bigimg.style.top = -bigY + 'px';
    })
})