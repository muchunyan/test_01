window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var arrow_r = this.document.querySelector('.arrow_r');
    var arrow_l = this.document.querySelector('.arrow_l');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focuswidth = focus.offsetWidth;
    //按钮点击换图片
    var num = 0;
    //控制小圆圈和图片一起动
    var circle = 0;
    focus.addEventListener('mouseover', function () {
        arrow_r.style.display = 'block';
        arrow_l.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseout', function () {
        arrow_r.style.display = 'none';
        arrow_l.style.display = 'none';
        timer = setInterval(function () {
            arrow_l.click();
        }, 2000)
    })
    //动态生成小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        //创建li
        var li = this.document.createElement('li');
        ol.appendChild(li);
        //设置自定义属性,方便计算图片滑动距离（index*图片width）
        li.setAttribute('index', i);
        //绑定事件（排他思想）
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                // 干掉所有人
                ol.children[i].className = '';
                // 留下自己
                this.className = 'current';
            }
            //轮播图滚动
            var index = this.getAttribute('index');
            num = circle = index;//为了解决一个小bug
            var focuswidth = focus.offsetWidth;
            //ul一定要加定位！！！
            animate(ul, -focuswidth * index);
        })
    }
    ol.children[0].className = 'current';
    //添加第一张图片的副本,实现自动添加并且不会增加小圆圈
    var first = ul.firstChild.cloneNode(true);
    ul.appendChild(first);
    var flag = true;
    //左边按钮
    arrow_l.addEventListener('click', function () {
        if (flag == true) {//节流阀
            flag = false;//点击时关闭
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0
            }
            num++;
            animate(ul, -focuswidth * num, function () {
                flag = true;//动画结束时打开
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            //排他思想 让其他小圆圈不选中
            circlechange();
        }
    })

    //右边按钮
    arrow_r.addEventListener('click', function () {
        if (flag == true) {
            flag = false;
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focuswidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -focuswidth * num, function () {
                flag = true;
            });

            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }

            circlechange();
        }

    })
    function circlechange() {
        //排他思想 让其他小圆圈不选中
        for (var i = 0; i < ol.children.length; i++) {
            // 干掉所有人
            ol.children[i].className = '';
            // 留下自己  
        }
        ol.children[circle].className = 'current';
    }
    var timer = this.setInterval(function () {
        arrow_l.click();
    }, 2000)
})