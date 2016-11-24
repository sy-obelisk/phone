$(function(){
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        var userId=sessionStorage.getItem("userId");
        //考点冲刺
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/kaodianchongci',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId
            }
        }).success(function(data) {
            console.log(data)
            $scope.items31 = data.sc;
            $scope.items32 = data.cr;
            $scope.items33 = data.rc;
            $scope.items34 = data.ps;
            $scope.items35 = data.ds;
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                //$("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
            }

        });

    }]);


});