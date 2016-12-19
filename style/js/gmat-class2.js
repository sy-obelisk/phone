/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        var userId = localStorage.getItem("userId");
        //直播课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zhibo',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId
            }
        }).success(function (data) {
            $(".loader").fadeOut(100);
            $scope.items = data;

        });

    }]);
});