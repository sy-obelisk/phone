$(function(){
//声明模块
    var myApp = angular.module("myApp",[]);

//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        //直播课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zhibo',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                catid:2
            }
        }).success(function(data) {
            $scope.zhibo = data;

        });
        //视频课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/shipin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            $scope.video = data;

        });
        //公开课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/gongkai',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            $scope.publicClass = data;

        });


    }]);
});