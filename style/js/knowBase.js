$(function () {
    //   点
    $(".little").css({"height": $(".little").width() + "px", "lineHeight": $(".little").width() + "px"});
    //获取页面参数
    var Request = GetRequests();
    var ids = Request['id'];
    var names = Request['name'];
    var userId = localStorage.getItem("userId");
    //声明模块
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zhishilist',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                id: ids,
                userid: userId
            }
        }).success(function (data) {
            console.log(data)
            $scope.knowList = data.data;
            $scope.name = names;
            if (data.userData == false) {
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            } else {
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
            }

        });


    }]);


});