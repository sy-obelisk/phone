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
        var userId = sessionStorage.getItem("userId");
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
                //头部个人中心图标未登陆点击跳转到登陆
                $(".userName").html("游客");
                $(".user-btn").html("游客登录").click(function () {
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
                $scope.correct = data.correct;
                $scope.num = data.totalnum.num;
            }

        });

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
        //视频课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/shipin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId
            }
        }).success(function (data) {
            $scope.items1 = data;

        });
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
            $scope.items = data;

        });
        //公开课
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/gongkai',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId
            }
        }).success(function (data) {
            $scope.items2 = data;

        });
        //题库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                twoId: 12,
                secId: 6,
                userid: userId
            }
        }).success(function (data) {
            $scope.items4 = data.data;
        });

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
//点击题库一级导航
function changeLowerOne(o) {
    var one = $(".sort-nav2 span.on").attr("data-id");
    var two = $(o).attr("data-id");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku2',
        data: {
            twoId: one,
            secId: two
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (data) {
            $(o).addClass('on').siblings().removeClass('on');
            //if(data.code ==1){
            SpellCharacters(data, one);
            if (data==null){
                alert("暂无此类数据")
            }
            //}
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}
//点击题库二级导航
function changeLowerTwo(o) {
    var one = $(o).attr("data-id");
    var two = $(".sort-nav span.on").attr("data-id");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku2',
        data: {
            twoId: one,
            secId: two
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (data) {
            $(o).addClass('on').siblings().removeClass('on');
            //if(data.code ==1){
            SpellCharacters(data, one);
            if (data==null){
                alert("暂无此类数据")
            }
            //}
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}

//拼字符串
function SpellCharacters(data, strName) {
    var str = '', strn = '';
    var one = $(".sort-nav2 span.on").html();
    var two = $(".sort-nav span.on").html();
    if (strName == '12') {
        strn = '讲义';
    } else if (strName == '1,15') {
        strn = 'OG';
    } else if (strName == '8,10,11') {
        strn = 'PREP';
    } else {
        strn = 'GWD';
    }
    $('.topic-list-wrap').empty();
    str += '<ul class="topic-list">';
    $.each(data, function (k, v) {
        str +=
            '<li ng-repeat="item4 in items4">' +
            '<div class="fl topic-left">' +
            '<p class="topic-name ellipsis">' + strn + '-' + v.stname + '</p>' +
            '<p class="topic-data">题目总数：20&nbsp;&nbsp;<em class="doing">2020</em>人已做</p>' +
            '</div>' +
            '<div class="do-btn fr">' +
            '<a href="practice.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '&articletitle=">开始做题</a>' +
            '</div>'+
        '</li>';
    });
    str += '</ul>';
    $(".topic-list-wrap").html(str);
}

function locaPrac(o, type) {
    var one = $(".sort-nav2 span.on").html();
    var two = $(".sort-nav span.on").html();
    var stid = $(o).attr("data-stid");
    $(o).attr("href", "practice.html?tikuId=" + stid + "&type=" + type + "&knowName=" + (one + '-' + two)+"&articletitle=''");
}