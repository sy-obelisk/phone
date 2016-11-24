$(function(){
    $(".numWhite").css({
        height:$(".numWhite").width()+"px",
        lineHeight:$(".numWhite").width()+"px",
        left:"50%",
        marginLeft:"-"+$(".numWhite").width()/2+"px",
        marginTop:"-"+$(".numWhite").width()+"px"
    });
    $(".greyDiv").css("paddingTop",$(".numWhite").height()/2+"px");
    var userId=sessionStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",'$sce',function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/vip',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId
            }
        }).success(function(data) {
            console.log(data)
            if(data.userCode==1){
                $("#firstA").attr("href","sureOrder.html?contentid=297&commodity_type=7");
                $("#lastA").attr("href","sureOrder.html?contentid=298&commodity_type=7");
                $scope.photo = data.userinfo.photo;
                $scope.nickname = data.userinfo.nickname;

            }else{
                $location.href="login.html";
            }
        });

    }]);
});