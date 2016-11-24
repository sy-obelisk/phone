//获取页面参数
var Request=GetRequests();
var kzid=Request['kzid'];
var cptime=Request['cptime'];
var userId=sessionStorage.getItem("userId");
console.log(kzid,cptime);
$(function(){
    $(".reminder").css('width',$(".reminder").css("height"));
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        //题库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                twoId:12,
                secId:6
            }
        }).success(function(data) {
            console.log(data)
            $scope.items4 = data;
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userinfo.nickname;
                $scope.photo = data.userinfo.photo;
            }

        });

    }]);
    if(kzid==68){//600以下


    }else if(kzid==70){//700以下


    }else if(kzid==69){//650以下


    }else if(kzid==66){//未考过GMAT，无


    }else if(kzid==67){//未考过GMAT，有


    }

});

function locAherf(){
    location.href="evaluationTest.html?kzid="+kzid+"&cptime="+cptime+"&kzmark=kzmark";
}