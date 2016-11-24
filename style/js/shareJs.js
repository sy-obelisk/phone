$(function(){
    //遮罩层高度
    $(".shareMask").css("height",$(document).height()+"px");
    $("body").click(function(e){
        var _target = $(e.target);
        if (_target.closest(".shareMask").length == 1) {
            $(".shareMask").hide();
        }
    });
});


//展示分享弹窗
function showShare(evt){
    evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
    $(".shareMask").show();
}