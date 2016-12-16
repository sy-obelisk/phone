$(function () {
    var Request = GetRequests();
    var type=Request['type'];
    //声明模块
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        var userId = localStorage.getItem("userId");
        var mark=Request.mark;
        var id=Request.id;
        var name=Request.name;
        var step=Request.step;
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/mk_tishi',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                step:step,
                userid:userId,
                mark:mark,
                id:id,
                name:name
            }
        }).success(function (data) {
            sessionStorage.setItem("mklct",data.mklct);
            sessionStorage.setItem("mklct_qids",data.mklct_qids);
            if (data.userCode == 0) {
                location.href="login.html";
            } else {
                $scope.type=type;
                $scope.mkid=data.mkid;
                $scope.step=data.step;
                $scope.mklct=data.mklct;
                $scope.mklct_qids=data.mklct_qids;
                $scope.mkscoreid=data.mkscoreid;
                $scope.name = data.mkinfo.name;
                $scope.num = data.mkinfo.num;
                $scope.mark = data.mark;
                $scope.mkid = data.mkid;
                if ($scope.mark == 'all') {
                    $(".all").show();
                } else {
                    $(".verbal").show();
                }
            }

        });





    }]);


});