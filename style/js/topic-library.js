/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        var userId = localStorage.getItem("userId");
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

    }]);
});

//点击题库一级导航
function changeLowerOne(o) {
    var one = $(".sort-nav2 span.on").attr("data-id");
    var two = $(o).attr("data-id");
    var userId=localStorage.getItem("userId");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku2',
        data: {
            userid:userId,
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
    var userId=localStorage.getItem("userId");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku2',
        data: {
            userid:userId,
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
            '<p class="topic-data">题目总数：41&nbsp;&nbsp;<em class="doing">2020</em>人已做</p>' +
            '</div>' +
            '<div class="do-btn fr">' +
            '<a href="practice.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '&articletitle=">点击做题</a>' +
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