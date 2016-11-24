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
    var phonecode=$("#phoneCode").val();
    var password=$("#password").val();
    var username=$("#username").val();
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/registerforapp',
        data: {
            Phone: phone,
            phonecode: phonecode,
            password: password,
            username: username
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.code == 1) {
                alert(data.message);
                location.href="/newwap/login.html";
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
        url: 'http://www.gmatonline.cn/index.php?web/appapi/phonecode',
        data: {
            Phonenum: phone
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            if (data.code == 1) {
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
    var phonecode=$("#phonecode").val();
    var password=$("#password").val();
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/foundModifyPwd',
        data: {
            ep: phone,
            epnum: phonecode,
            password: password,
            qufen: 1
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function () {
            alert('修改密码成功！去登录试试！');
            location.href="login.html";
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}