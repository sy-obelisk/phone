$(function(){
    //声明模块
    var myApp = angular.module("myApp",[]);
    var userId=sessionStorage.getItem("userId");

//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){

        //资讯
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zixun',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId
            }
        }).success(function(data) {
            $scope.items61 = data.data[0].data;
            $scope.items62 = data.data[1].data;
            $scope.items63 = data.data[2].data;
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
            }

        });



    }]);

});