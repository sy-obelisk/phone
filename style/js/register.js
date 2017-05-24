$(function(){
//    注册按钮
    $(".reg").Validform({
        btnSubmit:"#reg_btn",
        showAllError:true,
        tiptype:3
    });
//    找回密码确定按钮
    $(".found").Validform({
        btnSubmit:"#found_btn",
        showAllError:true,
        tiptype:3
    });
});

//倒计时函数
function clickDX(e, timeN, str) {
    var _that = $(e);
    var defalutVal=$(e).val();
    var timeNum = timeN;
    //$(e).removeAttr("onclick");
    $(e).attr("disabled", true);
    _that.unbind("click").val(timeNum + "秒后重发");
    var timer = setInterval(function () {
        _that.val(timeNum + "秒后重发");
        timeNum--;
        if (timeNum < 0) {
            clearInterval(timer);
            $(e).removeAttr("disabled");
            _that.val(defalutVal);
            if (str == 1) {     //1表示手机短信验证
//                _that.bind("click",e, phoneCode);
            }

        }
    }, 1000);
}

/**
 * 注册
 */
function register(){
    var phone=$("#phone").val();
    var code=$("#phoneCode").val();
    var password=$("#password").val();
    var username=$("#username").val();
    var phoneCode=sessionStorage.getItem("phoneCode");
    $.ajax({
        url: 'http://login.gmatonline.cn/cn/wap-api/register',
        data: {
            registerStr: phone,
            type:1,
            phoneCode:phoneCode,
            code: code,
            pass: password,
            userName: username,
            source:'1',
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                alert(data.message);
                login();
                //location.href="login.html";
            } else {
                alert(data.message);
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
}

/**
 * 手机验证码
 */

function phoneCode(e){
    var phone=$("#phone").val();
    $.ajax({
        //url: 'http://www.gmatonline.cn/index.php?web/appapi/phonecode',
        url: 'http://login.gmatonline.cn/cn/wap-api/phone-code',
        data: {
            phoneNum: phone,
            type:'2',
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                sessionStorage.setItem('phoneCode',data.phonecode);
                alert(data.message);
                clickDX(e, 60, 1);
            } else {
                alert(data.message);
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
}

/**
 * 找回密码
 */
function foundPwd(){
    var phone=$("#phone").val();
    var code=$("#phonecode").val();
    var password=$("#password").val();
    var phoneCode=sessionStorage.getItem("phoneCode");

    $.ajax({
        url: 'http://login.gmatonline.cn/cn/wap-api/find-pass',
        data: {
            type:'1',
            code: code,
            pass: password,
            registerStr: phone,
            phoneCode:phoneCode,
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            alert(data.message);
            location.href="login.html";
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}

//登录
function login() {
    var username = $("#phone").val();
    //var username = $("#username").val();
    var password = $("#password").val();
    $.post('http://login.gmatonline.cn/cn/wap-api/gmat-check-login', {
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
                url: "http://www.toeflonline.cn/cn/wap-api/unify-login?uid=" + data.uid + "&username=" + data.username + "&password=" + data.password
                + "&email=" + data.email + "&phone=" + data.phone,
                dataType: "jsonp",
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonpCallback: "success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                success: function (data01) {
                    //留学
                    $.ajax({
                        type: "post",
                        url: "http://smartapply.gmatonline.cn/cn/wap-api/unify-login?uid=" + data.uid + "&username=" + data.username + "&password=" + data.password
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