$(function(){

    //声明模块
    var userId=localStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/testRecord',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId
            }
        }).success(function(data) {
            console.log(data)
            $scope.test = data.test;
            $scope.photo = data.userData.photo;
            $scope.nickname = data.userData.nickname;
            for(var i=0;i<$scope.test.length;i++){
                $scope.test[i].totalscore=Math.round(data.test[i].totalscore/10)*10;
            }

        });

    }]);


});