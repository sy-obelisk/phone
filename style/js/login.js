$(function () {
    $(".loginGroup").Validform({
        btnSubmit: "#btn_sub",
        showAllError: true,
        tiptype: 3
    });
});

function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    $.post('http://login.viplgw.cn/cn/wap-api/gmat-check-login', {
        userName: username,
        userPass: password
    }, function (data) {
        console.log(data);
        localStorage.setItem("wapUid", data.uid);
        localStorage.setItem("username", data.username);
        var username = data.username;
        var wapUid = data.uid;
        var phone = data.phone;
        var email = data.email;
        if(data.code==0){
            alert(data.message);
        }else {
            $.ajax({
                type: "post",
                url: "http://toefl.viplgw.cn/cn/wap-api/unify-login?uid=" + data.uid + "&username=" + data.username + "&password=" + data.password
                + "&email=" + data.email + "&phone=" + data.phone,
                dataType: "jsonp",
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success: function (data01) {
                    //留学
                    $.ajax({
                        type: "post",
                        url: "http://smartapply.gmatonline.cn /cn/wap-api/unify-login?uid=" + data.uid + "&username=" + data.username + "&password=" + data.password
                        + "&email=" + data.email + "&phone=" + data.phone,
                        dataType: "jsonp",
                        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                        jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                        success: function (data02) {
                            //gmat
                            $.ajax({
                                type: "post",
                                url: "http://www.gmatonline.cn/index.php?web/appapi/unifyLogin&uid=" + data.uid + "&username=" + data.username + "&password=" + data.password
                                + "&email=" + data.email + "&phone=" + data.phone,
                                dataType: "json",
                                success: function (data03) {
                                    console.log(data03);
                                    localStorage.setItem("userId", data03.userid);
                                    localStorage.setItem("nickname",data03.nickname);
                                    if (data.code == 1) {
                                        location.href = 'index.html';
                                    } else {
                                        alert(data03.message);
                                    }
                                    //bbs
                                    $.ajax({
                                        type: "post",
                                        url: "http://bbs.gmatonline.cn/api/gmat.php?action=unifyLogin&uid=" + data.uid,
                                        dataType: "jsonp",
                                        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                                        jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                                        success: function () {
                                            //setCookie('smartSid',data.sid);
                                        }, error: function () {
                                            //alert("bbsfail");
                                        }
                                    });
                                }, error: function () {
                                    //alert("gmatfail");
                                }
                            });
                        },
                        error: function () {
                            alert("smartfail");
                        }
                    });
                },
                error: function () {
                    alert("toeflfail");
                }
            });
        }


    }, 'json');

}

