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
    var str2='';
    $.each(data, function (k, v) {
        console.log(k,v.twoobjectid);
        if (v.userlowertk==0){
            str2='<a href="practice.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '&articletitle=">开始做题</a>';
            console.log("开始做题");
        }
        if (v.userlowertk>0 && v.userlowertk< v.lowertknumb){
            str2='<a href="practice.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '&articletitle=">继续做题</a>';
            console.log("继续做题");
        }
        if (v.userlowertk== v.lowertknumb){
            str2='<a href="result.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '&articletitle=">查看结果</a>';
            console.log("查看结果");
        }
        str +=
            '<li ng-repeat="item4 in items4">' +
            '<div class="fl topic-left">' +
            '<p class="topic-name ellipsis">' + strn + '-'+(k+1)+'-' + v.lowertknumb + '</p>' +
            '<p class="topic-data">题目总数：'+ v.lowertknumb+'&nbsp;&nbsp;正确率 : <em class="doing">'+ v.correct+'%</em></p>' +
            '</div>' +
            '<div class="do-btn fr">'+str2+'';
            //'<a href="practice.html?tikuId=' + v.stid + '&type=1&knowName=' + (one + '-' + two) + '&articletitle=">点击做题</a>' +
        str += '</div>'+
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
    if($(o).hasClass("toResult")){
        $(o).attr("href", "practice.html?tikuId=" + stid + "&type=" + type + "&knowName=" + (one + '-' + two)+"&articletitle=''");
        $(o).attr("href", "result.html?type=" + type + "&tikuId="+stid+"&knowName=" + (one + '-' + two)+"&knowsId=undefined");
    }
}