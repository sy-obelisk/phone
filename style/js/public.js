
$(function(){
   //用户头像高度
    var hei=$(".userImg").parents(".personNav").width()*0.98*0.5*0.6;
    $(".userImg").css("height",hei);
    //点击页面其他地方收回个人中心导航
    $("body").bind("click", function(e) {
        var _target = $(e.target);
        if (_target.closest(".personNav").length == 0) {
            $(".personNav").animate({right:"-50%"},function(){$(this).hide()});
        }
    });

});

/**
 * 获取a标签传递到新页面的参数
 * @returns {Object}
 * @constructor
 */
function GetRequests(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            //theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 *将秒转换为 hh:mm:ss
 *
 */
function time_To_hhmmss(seconds){
    var hh;
    var mm;
    var ss;
    //传入的时间为空或小于0
    if(seconds==null||seconds<0){
        return;
    }
    //得到小时
    hh=seconds/3600|0;
    seconds=parseInt(seconds)-hh*3600;
    if(parseInt(hh)<10){
        hh="0"+hh;
    }
    //得到分
    mm=seconds/60|0;
    //得到秒
    ss=parseInt(seconds)-mm*60;
    if(parseInt(mm)<10){
        mm="0"+mm;
    }
    if(ss<10){
        ss="0"+ss;
    }
    if(hh!=0){
        return hh+"h"+mm+"m"+ss+"s";
    }else if(mm!=0){
        return parseInt(mm)+"m"+ss+"s";
    }else if(ss!=0){
        return parseInt(ss)+"s";
    }

}
//展开个人中心导航
function personNav(evt){
    evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
    $(".personNav").show().animate({right:"0"});
}
//判断个人中心导航部分用户头像有没有
function navImg(){
    var userImg02=$("#userImg02").attr("src");
    if(!userImg02){
        $("#userImg02").attr("src","style/images/userDefault.png");
    }
}
//转意符换成普通字符
function escape2Html(str) {
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

//退出登录
function loginOut(){

        if(confirm("确认退出登录么?"))
        {
            $.ajax({
                url: 'http://www.gmatonline.cn/index.php?web/wapapi/logout',
                type: 'post',
                cache: false,
                dataType: 'json',
                beforeSend:function(){

                },
                success: function (data) {
                    if (data.code == 1) {
                        sessionStorage.removeItem("userId");
                        sessionStorage.removeItem("articletitle");
                        sessionStorage.removeItem("article");
                        sessionStorage.removeItem("countNum");
                        sessionStorage.removeItem("knowId");
                        sessionStorage.removeItem("knowName");
                        sessionStorage.removeItem("tikuid");
                        sessionStorage.removeItem("breaktime");
                        sessionStorage.removeItem("mkscoreid");
                        sessionStorage.removeItem("qnonids");
                        sessionStorage.removeItem("qnonum");
                        sessionStorage.removeItem("startime");
                        sessionStorage.removeItem("mkid");
                        sessionStorage.removeItem("mklct");
                        sessionStorage.removeItem("mklct_qids");
                        sessionStorage.removeItem("readqid");
                        sessionStorage.removeItem("startTime");
                        sessionStorage.removeItem("quid");
                        //alert('已退出登录！');
                        location.href="index.html";
                    } else {
                        alert('系统错误');
                    }
                },
                error: function () {
                    alert("网络通讯失败");
                }
            });
        }

}

//写cookies

function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//头部搜索
function searchEn(event) {
    if (event.keyCode == 13) {
        searchClick($("#iconS"));
    }
}

function searchClick(o) {
    var val=$(o).next("input").val();
    if(val){
        location.href="timuList.html?keyword="+val;
    }
}