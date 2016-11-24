//获取页面参数
var Request=GetRequests();
var tids=Request['tid'];
var fids=Request['fid'];
var uids=Request['uid'];

$(function(){

});


function reply(){
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/oneReply',
        type: 'get',
        //cache: false,
        dataType: 'json',
        data:{
            tid:tids,
            fid:fids,
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