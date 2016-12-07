/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        var userId = localStorage.getItem("userId");
        //公开课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/gongkai',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId
            }
        }).success(function (data) {
            $scope.items2 = data;

        });
    }]);
});