//获取页面参数
var Request=GetRequests();
var pids=Request['pid'];
var uids=Request['uid'];
var tids=Request['tid'];

$(function(){

});


function reply(){
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/twoReply',
        type: 'get',
        //cache: false,
        dataType: 'json',
        data:{
            pid:pids,
            uid:uids,
            message:$(".replyBox textarea").val()
        },
        beforeSend:function(){

        },
        success: function (data) {
            if(data.code==1){
                location.href="bbsThreeL.html?tid="+tids;
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
}