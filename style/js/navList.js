$(function(){
    $(".firstShow ul li").bind("click",showTwoL);
    $(".navL-left ul li").bind("click",toggleLi);
});

//控制右边部分下拉+图片改变
function showTwoL(){
    var _that=$(this);
    _that.find(".twoLevel-nav").slideToggle("slow",function(){
        if ($(this).is(':hidden')) {
            _that.find("span img").attr("src","style/images/nav_bottomJ.png");
        }else{
            _that.find("span img").attr("src","style/images/nav_topJ.png");
        }
    });
}
//左边右边属性相等时展示div
function toggleLi(){
    var _that=$(this);
    var distinguish=_that.attr("data-distinguish");
    _that.addClass("on").siblings().removeClass("on");
    $(".compare").each(function(){
        var comDistinguish=$(this).attr("data-distinguish");
        if(distinguish==comDistinguish){
            $(this).show().siblings().hide();
        }
    });
}