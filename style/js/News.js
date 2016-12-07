/**
 * Created by Administrator on 2016/11/10.
 */
/**
 * Created by Administrator on 2016/11/10.
 */
$(function () {
    //声明模块
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        //获取sessionStorage存储的userId
        var userId = localStorage.getItem("userId");
        //资讯
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zixun',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            console.log(data);
            $scope.items61 = data.data[0].data;
            $scope.items62 = data.data[1].data;
            $scope.items63 = data.data[2].data;
        });


    }]);


});





