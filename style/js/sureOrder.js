$(function () {
    var Request = GetRequests();
    var contentId = Request['contentid'];
    var catid = Request['catid'];
    var type = Request['type'];
    var commodity_type = Request['commodity_type'];
    var userId = localStorage.getItem("userId");
    console.log(type)
    if (type == 'vip') {
        $('.return').click(function () {
            location.href = 'vip.html';
        })
    }
    if (type == 1) {
        $('.return').click(function () {
            location.href='videoDetails.html?contentId='+contentId+'&type='+type+'';
        })
    }
    if (type == 2) {
        $('.return').click(function () {
            location.href='courseDetails.html?contentId='+contentId+'&type='+type+'';
        })
    }
    if (type == 3) {
        $('.return').click(function () {
            location.href='courseDetails.html?contentId='+contentId+'&type='+type+'';
        })
    }
    //声明模块
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", function ($scope, $http) {
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/pay_online',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                catid: catid,
                userid: userId,
                contentid: contentId,
                commodity_type: commodity_type

            }
        }).success(function (data) {
            console.log(data)
            if (data.userCode == 0) {
                //location.href = "login.html";
            } else {
                $scope.phone = data.userinfo.phone;
                $scope.usertruename = data.userinfo.usertruename;
                $scope.price = data.goods.price;
                $scope.title = data.goods.title;
                $scope.commodity_type = data.goods.commodity_type;
                $scope.id = data.goods.id;
                $scope.img = data.goods.img;
                $scope.title = data.goods.title;
                $scope.url = data.goods.url;
            }

        });

    }]);
});
function subtractNum(o) {
    var old = parseInt($("#totNum").html());
    if (old <= 1) {
        alert("亲，不能再减了哦！");
    } else {
        old--;
    }
    $("#num").html(old);
    $("#totNum").html(old);
    totalP();
}

function addNum(o) {
    var old = parseInt($("#totNum").html());
    old++;
    $("#num").html(old);
    $("#totNum").html(old);
    totalP();
}

function totalP() {
    var num = parseInt($("#totNum").html());
    var unitCost = parseInt($("#unitCost").html());
    $("#totalP").html(num * unitCost);
    $("#totalPrice").html(num * unitCost);
}

function payComeOn() {
    var url = window.location.href;
    var userId = localStorage.getItem("userId");
    var userN = $("#userName").val();
    var phoneS = $("#phone").val();
    if (!userN || !phoneS) {
        alert("亲，姓名和电话必须填写哦！");
        return false;
    } else {
        if (!phoneS.match(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/)) {
            alert("电话格式错误！");
            return false;
        }
        $.ajax({
            url: 'http://www.gmatonline.cn/index.php?web/appapi/wapOrder',
            type: 'post',
            cache: false,
            data: {
                userid: userId,
                num: $("#totNum").html(),
                price: $("#unitCost").html(),
                integral: 0,
                consignee: userN,
                conphone: phoneS,
                commodity_type: $("#commodity_type").val(),
                check: 0,
                id: $("#commodity_id").val(),
                title: $("#commodity_title").val(),
                url: $("#url").val(),
                image: $("#image").val()
            },
            dataType: 'json',
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data)
                if (data.hrefType == 1) {
                    location.href = "myCourse.html?status=2";
                } else {
                    $("#WIDout_trade_no").val(data.goods.order);
                    $("#WIDsubject").val(data.goods.title);
                    $("#WIDtotal_fee").val(data.goods.account);
                    //$("#WIDshow_url").val(data.goods.url);
                    $("#WIDshow_url").val(url);
                    $("#WIDbody").val(data.goods.remarks);
                    $("#service").val('WAP');
                    $("#orderSub")[0].submit();
                }

            },
            error: function () {
                alert("网络通讯失败");
            }
        });
    }
}