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
        //初始请求
        //模考
        var codeOn = "";
        var markOn = $(".imitate-wrap span.on").attr("data-mark");
        if (markOn == "verbal") {
            codeOn = $(".imitate-wrap2 span.on").attr("data-Vcode");
        }
        if (markOn == "quant") {
            codeOn = $(".imitate-wrap2 span.on").attr("data-Qcode");
        }
        if (markOn == "all") {
            codeOn = $(".imitate-wrap2 span.on").attr("data-Acode");
        }
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/TestList',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                code: codeOn,
                mark: markOn,
                userid: userId
            }
        }).success(function (data) {
            $(".loader").fadeOut(100);
            $scope.item = data.data;
            $scope.marks = data.mark;
            for (var i = 0; i < $scope.item.length; i++) {
                if ($scope.item[i].markquestion == 2) {//显示完成图标
                    $scope.item[i].otherA = "examResult.html?type=1&mkid=" + $scope.item[i].id + "&mkscoreid=" + $scope.item[i].mkscoreid;
                    $scope.item[i].status='查看结果';
                    $scope.item[i].a_result='a_result';
                }
                else {
                    $scope.item[i].otherA = "examStart.html?type=1&mark=" + $scope.marks + "&step=&id=" + $scope.item[i].id + "&name=" + $scope.item[i].name;
                    $scope.item[i].status='开始做题';
                    $scope.item[i].a_result='';
                }
            }
        });
        //点击一级菜单 请求
        $(".imitate-wrap span").click(function () {
            $(".loader").fadeIn(100);
            var code = "";
            var mark = $(this).attr("data-mark");
            if (mark == "verbal") {
                code = $(".imitate-wrap2 span.on").attr("data-Vcode");
            }
            if (mark == "quant") {
                code = $(".imitate-wrap2 span.on").attr("data-Qcode");
            }
            if (mark == "all") {
                code = $(".imitate-wrap2 span.on").attr("data-Acode");
            }
            $(this).addClass("on").siblings("span").removeClass("on");
            $http({
                method: 'post',
                url: 'http://www.gmatonline.cn/index.php?web/appapi/TestList',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    code: code,
                    mark: mark,
                    userid: userId
                }
            }).success(function (data) {
                $(".loader").fadeOut(100);
                $scope.item = data.data;
                $scope.marks = data.mark;
                for (var i = 0; i < $scope.item.length; i++) {
                    if ($scope.item[i].markquestion == 2) {//显示完成图标
                        $scope.item[i].otherA = "examResult.html?type=1&mkid=" + $scope.item[i].id + "&mkscoreid=" + $scope.item[i].mkscoreid;
                        $scope.item[i].status='查看结果';
                        $scope.item[i].a_result='a_result';
                    } else {
                        $scope.item[i].otherA = "examStart.html?type=1&mark="+ $scope.marks + "&id=" + $scope.item[i].id + "&name=" + $scope.item[i].name;
                        $scope.item[i].status='开始做题';
                        $scope.item[i].a_result='';
                    }
                }
            });

        });
        //点击二级菜单 请求
        $(".imitate-wrap2 span").click(function () {
            $(".loader").fadeIn(100);
            var code = "";
            var mark = $(".imitate-wrap span.on").attr("data-mark");
            $(this).addClass("on").siblings("span").removeClass("on");
            if (mark == "verbal") {
                code = $(this).attr("data-Vcode");
            }
            if (mark == "quant") {
                code = $(this).attr("data-Qcode");
            }
            if (mark == "all") {
                code = $(this).attr("data-Acode");
            }
            $http({
                method: 'post',
                url: 'http://www.gmatonline.cn/index.php?web/appapi/TestList',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    code: code,
                    mark: mark,
                    userid: userId
                }
            }).success(function (data) {
                $(".loader").fadeOut(100);
                $scope.item = data.data;
                $scope.marks = data.mark;
                for (var i = 0; i < $scope.item.length; i++) {
                    if ($scope.item[i].markquestion == 2) {//显示完成图标
                        $scope.item[i].otherA = "examResult.html?type=1&mkid=" + $scope.item[i].id + "&mkscoreid=" + $scope.item[i].mkscoreid;
                        $scope.item[i].status='查看结果';
                        $scope.item[i].a_result='a_result';
                    } else {
                        $scope.item[i].otherA = "examStart.html?type=1&mark=" + $scope.marks + "&id=" + $scope.item[i].id + "&name=" + $scope.item[i].name;
                        $scope.item[i].status='开始做题';
                        $scope.item[i].a_result='';
                    }
                }
            });


        });

    }]);


});

