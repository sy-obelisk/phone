//获取页面参数
var Request=GetRequests();
var fids=Request['fid'];
var reids=Request['reid'];
$(function(){
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",'$sce',function($scope,$http,$sce){
        $http.post('http://www.gmatonline.cn/index.php?web/appapi/putThread').success(function(data) {
             if(data.userCode==0){
                 location.href="login.html";
             }else{
                 $scope.uid=data.uid;
             }

        });

    }]);
});

function sendMessage(){
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/puttiezi',
        type: 'get',
        //cache: false,
        dataType: 'json',
        data:{
            reid:reids,
            fid:fids,
            uid:$("#uid").val(),
            subject:$("#title").val(),
            message:$("#content").val()
        },
        beforeSend:function(){

        },
        success: function (data) {
            location.href="bbsDetails.html?id="+data.fid;
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
}