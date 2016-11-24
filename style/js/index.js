$(function () {
//   点
    $(".little").css({"height": $(".little").width() + "px", "lineHeight": $(".little").width() + "px"});
//声明模块
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

//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        //直播课
        $http.post('http://gmat.cc/index.php?web/wapapi/zhibo', {catid: 2}).success(function (data) {
            $scope.items = data;
        });
        //视频课
        $http.post('http://gmat.cc/index.php?web/wapapi/shipin').success(function (data) {
            $scope.items1 = data;
        });
        //公开课
        $http.post('http://gmat.cc/index.php?web/wapapi/gongkai').success(function (data) {
            $scope.items2 = data;
            for (var i = 0; i < $scope.items2.length; i++) {
                $scope.items2[i].contenttitle = $sce.trustAsHtml(escape2Html(data[i].contenttitle));
            }
        });
        //考点冲刺
        $http.post('http://gmat.cc/index.php?web/wapapi/kaodianchongci').success(function (data) {
            $scope.items31 = data.sc;
            $scope.items32 = data.cr;
            $scope.items33 = data.rc;
            $scope.items34 = data.ps;
            $scope.items35 = data.ds;
            console.log($scope.items31)
        });
        //题库
        $http.post('http://gmat.cc/index.php?web/wapapi/tiku', {twoId: 12, secId: 6}).success(function (data) {
            $scope.items4 = data.data;
        });
        //知识库
        $http.post('http://gmat.cc/index.php?web/wapapi/zhishiku').success(function (data) {
            $scope.items51 = data.cr;
            $scope.items52 = data.sc;
            $scope.items53 = data.q;
            $scope.items54 = data.rc;
            $scope.uc = $sce.trustAsHtml(data.uc);
        });
        //资讯
        $http.post('http://gmat.cc/index.php?web/wapapi/zixun').success(function (data) {
            $scope.items61 = data.data[0].data;
            $scope.items62 = data.data[1].data;
            $scope.items63 = data.data[2].data;
        });
        //轮播图
        $http.post('http://gmat.cc/index.php?web/wapapi/lunbotu').success(function (data) {
            $scope.items7 = data;
        });
        //论坛资料
        $http.post('http://gmat.cc/index.php?web/wapapi/ziliao').success(function (data) {
            $scope.items8 = data;
        });

        //用户信息
        $http.post('http://gmat.cc/index.php?web/wapapi/getUser').success(function (data) {
            //$scope.items9 = data;
            $scope.userCode = data.userCode;
            $scope.nickname = data.userData.nickname;
            $scope.rank = data.userData.rank;
            $scope.photo = data.userData.photo;
            //判断是否登陆,首页显示登录或者未登录不同的div
            if ($scope.userCode == 1) {
                $(".loginR").hide();
                $(".loginAfter").show();
            } else {
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function () {
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
        $scope.toggle = {
            now: false
        };
        $scope.$watch('toggle.now', function () {
            if ($scope.toggle.now) {
                //    轮播
                TouchSlide({slideCell: "#slidePop", effect: "leftLoop"});
                navImg();
                //近期公开课预告
                $(".item").first().addClass("active");
//    轮播hd居中
                var circle = parseInt($(".slideHd").css("width")) / 2;
                $(".slideHd").css("marginLeft", -circle);

//老师头像圆形
                var width = $(".teaHimg").width();
                $(".teaHimg").css("height", width);

//    用户头像高度
                var width02 = $(".userHead").width();
                $(".userHead").css("height", width02 + "px");

//    课程图标外面的圆高度
                var width03 = $(".leftImg").width();
                $(".leftImg").css("height", width03);
//    调整课程右边字体的行高
                $(".rightName").css("lineHeight", width03 + "px");

//    模考英文字母
                $(".commonCircle").css({
                    "height": $(".commonCircle").width() + "px",
                    "lineHeight": $(".commonCircle").width() + "px"
                });
//    知识库hd
                $(".topCircle").css({
                    "height": $(".topCircle").width() + "px",
                    "lineHeight": $(".topCircle").width() + "px"
                });

//首页登录div高度
                $(".loginR").css("height", $(".allLink").height() + "px");
                $(".loginAfter").css("height", $(".allLink").height() + "px");
            }
        });


    }]);
//课程切换more
    $(".courseHd ul li").click(function () {
        $(".class").show().find("a").html("More");
    });
    //考点冲刺切换more
    $(".sprintHd ul li").click(function () {
        $(".kaodian").show().find("a").html("More");
    });

});

//关闭app下载通道
function closeApp() {
    $(".download").hide();
}
//点击题库一级导航
function changeLowerOne(o) {
    var one = $(".greyTitle .col-xs-2.on").attr("data-id");
    var two = $(o).attr("data-id");
    $.ajax({
        url: 'http://gmat.cc/index.php?web/wapapi/tiku2',
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
    var one = $(".greyTitle .col-xs-2.on").html();
    var two = $(".blueTitle .col-xs-2.on").html();
    if (strName == '12') {
        strn = '[讲义]';
    } else if (strName == '1,15') {
        strn = '[OG]';
    } else if (strName == '8,10,11') {
        strn = '[PREP]';
    } else {
        strn = '[GWD]';
    }
    $('.questionList').empty();
    str += '<ul>';
    $.each(data, function (k, v) {
        str +=
            '<li>' +
            '<a href="practice.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '">' +
            '<div class="col-xs-1">' +
            '<div class="little">题</div>' +
            '</div>' +
            '<div class="col-xs-8 ques-center">' +
            '<p>' + strn + '-' + v.stname + '</p>' +
            '</div>' +
            '<div class="col-xs-3 ques-right">' +
            '352人已做' +
            '</div>' +
            '<div class="clearBox"></div>' +
            '</a>' +
            '</li>';
    });
    str += '</ul>';

    $(".questionList").html(str);
    //题
    $(".little").css({"height": $(".little").width() + "px", "lineHeight": $(".little").width() + "px"});
}

//点击题库二级导航
function changeLowerTwo(o) {
    var one = $(o).attr("data-id");
    var two = $(".blueTitle .col-xs-2.on").attr("data-id");
    $.ajax({
        url: 'http://gmat.cc/index.php?web/wapapi/tiku2',
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
            //}
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}

//直播课等课程的MORE
function classMore() {
    if ($(".class a").html() == "More") {
        $(".courseBd ul").each(function () {
            if (this.offsetHeight != 0) {
                $(this).find("li").removeClass("courseHide");
            }
        });
        $(".class a").html("收起");
    } else {
        $(".courseBd ul").each(function () {
            if (this.offsetHeight != 0) {
                $(this).find("li").each(function () {
                    if ($(this).index() > 3) {
                        $(this).addClass("courseHide")
                    }
                });
            }
        });
        $(".class a").html("More");
    }
}
//考点冲刺的more
function kaodianMore() {
    if ($(".kaodian a").html() == "More") {
        $(".sprintBd ul").each(function () {
            if (this.offsetHeight != 0) {
                $(this).find("li").removeClass("courseHide");
            }
        });
        $(".kaodian a").html("收起");
    } else {
        $(".sprintBd ul").each(function () {
            if (this.offsetHeight != 0) {
                $(this).find("li").each(function () {
                    if ($(this).index() > 4) {
                        $(this).addClass("courseHide")
                    }
                });
            }
        });
        $(".kaodian a").html("More");
    }
}

function locaPrac(o, type) {
    var one = $(".greyTitle .col-xs-2.on").html();
    var two = $(".blueTitle .col-xs-2.on").html();
    var stid = $(o).attr("data-stid");
    $(o).attr("href", "practice.html?tikuId=" + stid + "&type=" + type + "&knowName=" + (one + '-' + two));
}