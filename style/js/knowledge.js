/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        var userId = localStorage.getItem("userId");
        //知识库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zhishiku',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId
            }
        }).success(function (data) {
            $scope.items51 = data.cr;
            $scope.items52 = data.sc;
            $scope.items53 = data.q;
            $scope.items54 = data.rc;
            $scope.uc = $sce.trustAsHtml(data.uc);

        });

    }]);
});