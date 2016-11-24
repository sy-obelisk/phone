$(function(){
    $(".loginGroup").Validform({
        btnSubmit:"#btn_sub",
        showAllError:true,
        tiptype:3
    });
});

function login(){
    var username=$("#username").val();
    var password=$("#password").val();
    $.post('http://www.gmatonline.cn/index.php?web/appapi/loginforapp',{username: username, password: password},function(data){
        sessionStorage.setItem("userId",data.session.userid);
        if (data.code == 1) {
            location.href = 'index.html';
        } else {
            alert(data.message);
        }
    },'json');
    //$.ajax({
    //    url: '/index.php?web/wapapi/loginforapp',
    //    data: {
    //        username: username,
    //        password: password
    //    },
    //    type: 'post',
    //    cache: false,
    //    dataType: 'json',
    //    beforeSend:function(){
    //        maskLayer();//显示加载动画
    //        //$("#singleProblem").append("<img src='/wap/styles/images/loading.gif'/>");//显示加载动画
    //    },
    //    success: function (data) {
    //        closeMask();//关闭加载动画
    //        if (data.code == 1) {
    //            location.href="index-back.html";
    //        } else {
    //            alert(data.message);
    //        }
    //    },
    //    error: function () {
    //        alert("网络通讯失败");
    //    }
    //});
}
