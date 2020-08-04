/**
 * Created by Administrator on 2018\1\23 0023.
 */
$(function () {
    //分别设置四个li的颜色
    $(".banner ul li").eq(0).css("background","yellow");
    $(".banner ul li").eq(1).css("background","red");
    $(".banner ul li").eq(2).css("background","green");
    $(".banner ul li").eq(3).css("background","pink");
    //获取li的宽度
    var $liWidth = $(".banner ul li").outerWidth();
    //初始化一个变量，用来保存走了几个盒子
    var num = 0;
    //开启一个定时器
    setInterval(function () {
        num++;
        if(num > 3){
            num = 0;
        }
        console.log(num)
        //改变ul的位置
        $(".banner ul").animate({
            left : -$liWidth * num
        },1000)
    },3000)

})
