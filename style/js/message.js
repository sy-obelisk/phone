/**
 * Created by Administrator on 2016/12/2.
 */
var userId = localStorage.getItem("userId");
var wapUid = localStorage.getItem("wapUid");
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://gossip.gmatonline.cn/cn/wap-api/reply-list',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                uid: wapUid,

            }
        }).success(function (data) {
            $scope.item=data;
            for (var i=0;i<$scope.item.length;i++){
                $scope.item[i].content = $sce.trustAsHtml(escape2Html(emojione.toImage($scope.item[i].content)));
            }

        });

    }]);
});