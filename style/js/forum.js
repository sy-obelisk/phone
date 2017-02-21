/**
 * Created by Administrator on 2016/11/29.
 */
var userId = localStorage.getItem("userId");
var wapUid = localStorage.getItem("wapUid");
var username = localStorage.getItem("username");

$(function () {
    var myApp = angular.module("myApp", []);

//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        //用户信息
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/getUser',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userId: userId
            }
        }).success(function (data) {
            var icon=sessionStorage.setItem("icon",data.userData.photo);
            var nickname=sessionStorage.setItem("nickname",data.userData.nickname);
            console.log(data)
        })

    }]);


    $('.forum-submit').click(function(){
        var publisher = sessionStorage.getItem("nickname");
        if(publisher==''){
            publisher=username;
        }
        var icon=sessionStorage.getItem('icon');
        var title=$('.forum-tit-int').val();
        var content=$('.text-write').val();
        var img=[];
        $('.sendAfter').each(function(){
            var val=$(this).val();
            img.push(val);
        });
        $.ajax({
            url: "http://gossip.gmatonline.cn/cn/wap-api/add-gossip",
            type: "POST",
            data:{
                uid:wapUid,
                image:img,
                video:'',
                audio:'',
                belong:'1',
                title:title,
                content:content,
                icon:icon,
                publisher:publisher
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if (data.code==0){
                    alert('请先登录');
                    location.href='login.html';
                }
                if(data.code==1){
                    alert('发布成功');
                    location.href='plan-test.html';
                }

            }
        })

    });
    //html5 ajax form表单提交
    function toUpdate() {
        var form=document.getElementById("upform");
        var fd =new FormData(form);
        $.ajax({
            url: "http://gossip.gmatonline.cn/cn/wap-api/app-image",
            type: "POST",
            data: fd,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function(data){
                var data=$.parseJSON(data);
                if(data.code==1){
                    preview(data.image);
                    $('.fileUrl').append('<input type="hidden" class="sendAfter" value="'+data.image+'">')
                }else {
                    alert(data.message);
                }

            }
        });
        return false;
    }
    //上传图片
    $("#add-img").on("change", function () {
        toUpdate();
    });

    //        图片预览
    function preview(file) {
        $('#preview').append('<div class="up-img">'+
            '<a href="http://gossip.gmatonline.cn'+file+'" class="swipebox" title="My Caption"><img src="http://gossip.gmatonline.cn'+file+'" alt="image"></a>'+
            '</div>');
    }
});




