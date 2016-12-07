$(function () {
    $(".postImg").css("height", $(".postImg").width() + "px");
    //获取页面参数
    var Request = GetRequests();
    var tids = Request['tid'];
    var userId = localStorage.getItem("userId");
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", '$sce', function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/bbsDetail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId,
                tid: tids
            }
        }).success(function (data) {
            console.log(data)
            $scope.comment = data.comment;
            $scope.subject = data.data.subject;
            $scope.views = data.data.views;
            $scope.replies = data.data.replies;
            $scope.dateline = $sce.trustAsHtml(escape2Html(data.data.dateline));
            $scope.message = $sce.trustAsHtml(escape2Html(data.data.message));
            $scope.tid = data.data.tid;
            $scope.fid = data.data.fid;
            $scope.uid = data.uid;
            $scope.photo = data.userinfo.photo;
            $scope.nickname = data.userinfo.nickname;
            for (var i = 0; i < $scope.comment.length; i++) {
                if (data.userinfo == false) {
                    $scope.comment[i].hrefa = "login.html";
                } else {
                    $scope.comment[i].hrefa = "sendTwo.html?pid=" + $scope.comment[i].pid + "&uid=" + $scope.uid + "&tid=" + $scope.tid;
                }
            }
            if (data.userinfo == false) {
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function () {
                    location.href = "login.html"
                });
                $(".shareEdit").parent("a").attr("href", "login.html");
            } else {
                $scope.nickname = data.userinfo.nickname;
                $scope.photo = data.userinfo.photo;
                $(".shareEdit").parent("a").attr("href", "send.html?tid=" + $scope.tid + "&fid=" + $scope.fid + "&uid=" + $scope.uid);
            }

        });


    }]);

});