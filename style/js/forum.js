/**
 * Created by Administrator on 2016/11/29.
 */
/**
 * Created by Administrator on 2016/11/25.
 */
var userId = localStorage.getItem("userId");
var wapUid = localStorage.getItem("wapUid");
var username = localStorage.getItem("username");

$(function () {
    // 初始化插件
    //$("#demo").zyUpload({
    //    width: "",                 // 宽度
    //    height: "",                 // 宽度
    //    itemWidth: "120px",                 // 文件项的宽度
    //    itemHeight: "100px",                 // 文件项的高度
    //    url: "http://gossip.gmatonline.cn/cn/wap-api/app-image",  // 上传文件的路径
    //    multiple: true,                    // 是否可以多个文件上传
    //    dragDrop: false,                    // 是否可以拖动上传文件
    //    del: true,                    // 是否可以删除文件
    //    finishDel: false,  				  // 是否在上传文件完成后删除预览
    //    /* 外部获得的回调接口 */
    //    onSelect: function (files, allFiles) {                    // 选择文件的回调方法
    //        console.info("当前选择了以下文件：");
    //        console.info(files);
    //        //console.info("之前没上传的文件：");
    //        //console.info(allFiles);
    //    },
    //    onDelete: function (file, surplusFiles) {                     // 删除一个文件的回调方法
    //        console.info("当前删除了此文件：");
    //        console.info(file);
    //        console.info("当前剩余的文件：");
    //        console.info(surplusFiles);
    //    },
    //    onSuccess: function (file) {                    // 文件上传成功的回调方法
    //        console.info("此文件上传成功：");
    //        console.log(file, 'yes');
    //    },
    //    onFailure: function (file) {                    // 文件上传失败的回调方法
    //        console.info("此文件上传失败：");
    //        console.log(file, '失败');
    //    },
    //    onComplete: function (responseInfo) {           // 上传完成的回调方法
    //        console.info("文件上传完成");
    //        console.info(responseInfo);
    //    }
    //
    //});

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
        //var prevDiv = document.getElementById('preview');
        console.log('dada',file);
        $('#preview').append('<div class="up-img">'+
            '<a href="http://gossip.gmatonline.cn'+file+'" class="swipebox" title="My Caption"><img src="http://gossip.gmatonline.cn'+file+'" alt="image"></a>'+
            '</div>');
        //if (file.files && file.files[0]) {
        //    var reader = new FileReader();
        //    reader.onload = function (evt) {
        //        prevDiv.innerHTML = ' <div class="up-img">' +
        //            '<a href="' + evt.target.result + '" class="swipebox" title="My Caption"><img src="' + evt.target.result + '" alt="image"></a>' +
        //            '</div>';
        //    };
        //    reader.readAsDataURL(file.files[0]);
        //}
        //else {
        //
        //    prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
        //}
    }
});




