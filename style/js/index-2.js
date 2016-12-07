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
            url: 'http://www.gmatonline.cn/index.php?web/appapi/getUser',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userId: userId
            }
        }).success(function (data) {
            //$scope.items9 = data;
            $scope.userCode = data.userCode;
            $scope.nickname = data.userData.nickname;
            $scope.rank = data.userData.rank;
            $scope.photo = data.userData.photo;
            //判断是否登陆,首页显示登录或者未登录不同的div
            if ($scope.photo==""){
                $scope.photo="/app/web_core/styles/images-3/details_defaultImg.png"
            }
            if ($scope.userCode == 1) {
                $(".loginR").hide();
                $(".loginAfter").show();
                $(".user-btn").click(function () {
                    location.href = "library-wrap.html"
                });
            } else {
                $(".userApply li").eq(5).find("span").html("登录/注册");
                $(".userApply li").eq(5).find("a").attr("href",'login.html');
                //头部个人中心图标未登陆点击跳转到登陆
                $(".userName").html("游客");
                $(".user-btn").html("登录").click(function () {
                    location.href = "login.html"
                });
                $(".loginR").show();
                $(".loginAfter").hide();
            }
            //判断用户头像有没有
            var userImg = $("#userImg").attr("src");
            if (!userImg) {
                $("#userImg").attr("src", "style/images/userDefault.png");
            }
        });

        //做题数量
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/ProblemRecord',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                section:6,
                userid: userId
            }
        }).success(function (data) {
            if (data.userCode == 0) {
                $(".test-percent").html("0%");
                $(".test-num").html("0");
            } else {
                $scope.questionrecord = data.questionrecord[0];
                console.log($scope.questionrecord)
                $scope.correct = data.correct;
                $scope.num = data.totalnum.num;
            }

        });



    }]);
});
