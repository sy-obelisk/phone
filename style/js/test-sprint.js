/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        var userId = localStorage.getItem("userId");
        //考点冲刺
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/kaodianchongci',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            $scope.items31 = data.sc;
            $scope.items32 = data.cr;
            $scope.items33 = data.rc;
            $scope.items34 = data.ps;
            $scope.items35 = data.ds;
        });

    }]);
});