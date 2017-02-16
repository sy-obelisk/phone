/**
 * Created by Administrator on 2016/11/3.
 */
$(function () {
    var myApp = angular.module("myApp", []);
    myApp.directive('isOver', function () {
        return {
            restrict: 'A',
            scope: {
                over: '=isOver'
            },
            link: function (scope, elm, attr) {
                if (scope.$parent.$last) {
                    scope.over = true;
                }
            }
        }
    });

    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        var userId = localStorage.getItem("userId");
        //用户信息
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/appIndex',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userId: userId
            }
        }).success(function (data) {
            //$scope.items9 = data;
            //判断用户头像有没有
            var userImg = $("#userImg").attr("src");
            if (!userImg) {
                $("#userImg").attr("src", "style/images/userDefault.png");
            }
            $scope.userCode = data.userCode;
            $scope.nickname = data.userData.nickname;
            $scope.photo = data.userData.photo;
            //判断是否登陆,首页显示登录或者未登录不同的div
            if ($scope.photo == "") {
                $scope.photo = "/app/web_core/styles/images-3/details_defaultImg.png"
            }
            if ($scope.userCode == 1) {
                $scope.correct = data.correct;
                $scope.num = data.totalnum.num;
                $(".loginR").hide();
                $(".loginAfter").show();
                $(".user-btn").click(function () {
                    location.href = "library-wrap.html"
                });
            } else {
                $scope.num = 0;
                $scope.correct = "0%";
                $(".userApply li").eq(5).find("span").html("登录/注册");
                $(".userApply li").eq(5).find("a").attr("href", 'login.html');
                //头部个人中心图标未登陆点击跳转到登陆
                $(".userName").html("游客");
                $(".user-btn").html("登录").click(function () {
                    location.href = "login.html"
                });
                $(".loginR").show();
                $(".loginAfter").hide();
            }

        });

        //开屏图片
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/wapapi/adPicture',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            if (data.switch == "false") {
                $('.start_wrap').hide();

            } else {
                $scope.imgUrl = data.url;
                sessionStorage.setItem("flag", "true");
            }

        });

    }]);
});
