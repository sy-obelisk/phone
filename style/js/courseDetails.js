$(function () {
    var Request = GetRequests();
    var contentId = Request['contentId'];
    //声明模块
    var userId=sessionStorage.getItem("userId");
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/gmatcourses',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid:userId,
                contentid: contentId
            }
        }).success(function (data) {
            $scope.contenttitle = data.livelessondata.contenttitle;
            $scope.contentthumb = data.livelessondata.contentthumb;
            $scope.photo = data.userinfo.photo;
            $scope.nickname = data.userinfo.nickname;
            $scope.contenttext = $sce.trustAsHtml(escape2Html(data.livelessondata.contenttext.replace(/src=&quot;/g,'src="http://www.gmatonline.cn')));

            if (data.userinfo) {
                $scope.username = data.userinfo.username;
                $scope.phone = data.userinfo.phone;
            }
            if (data.livelessondata.contentcatid == 1) {
                $scope.data01 = data.livelessondata.data[" 32 "];//现价
                $scope.data02 = data.livelessondata.data[" 36 "];//原价
                $scope.classTime = data.livelessondata.data[" 34 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 33 "];//开课日期
                $scope.cost = data.livelessondata.data[" 35 "];//性价比
            } else if (data.livelessondata.contentcatid == 2) {
                $scope.data01 = data.livelessondata.data[" 357 "];//现价
                $scope.data02 = data.livelessondata.data[" 357 "];//原价
                $scope.classTime = data.livelessondata.data[" 41 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 206 "];//开课日期
                $scope.cost = data.livelessondata.data[" 31 "];//性价比
            } else if (data.livelessondata.contentcatid == 91) {
                $scope.data01 = data.livelessondata.data[" 266 "];//现价
                $scope.data02 = data.livelessondata.data[" 270 "];//原价
                $scope.classTime = data.livelessondata.data[" 278 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 274 "];//开课日期
                $scope.cost = data.livelessondata.data[" 282 "];//性价比
            } else if (data.livelessondata.contentcatid == 92) {
                $scope.data01 = data.livelessondata.data[" 267 "];//现价
                $scope.data02 = data.livelessondata.data[" 271 "];//原价
                $scope.classTime = data.livelessondata.data[" 279 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 275 "];//开课日期
                $scope.cost = data.livelessondata.data[" 283 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 93) {
                $scope.data01 = data.livelessondata.data[" 268 "];//现价
                $scope.data02 = data.livelessondata.data[" 272 "];//原价
                $scope.classTime = data.livelessondata.data[" 280 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 276 "];//开课日期
                $scope.cost = data.livelessondata.data[" 284 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 94) {
                $scope.data01 = data.livelessondata.data[" 269 "];//现价
                $scope.data02 = data.livelessondata.data[" 273 "];//原价
                $scope.classTime = data.livelessondata.data[" 281 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 277 "];//开课日期
                $scope.cost = data.livelessondata.data[" 285 "];//性价比
            } else if (data.livelessondata.contentcatid == 95) {
                $scope.data01 = data.livelessondata.data[" 295 "];//现价
                $scope.data02 = data.livelessondata.data[" 299 "];//原价
                $scope.classTime = data.livelessondata.data["307"];//课程时长
                $scope.startClass = data.livelessondata.data[" 303 "];//开课日期
                $scope.cost = data.livelessondata.data[" 311 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 96) {
                $scope.data01 = data.livelessondata.data[" 296 "];//现价
                $scope.data02 = data.livelessondata.data[" 300 "];//原价
                $scope.classTime = data.livelessondata.data[" 308 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 304 "];//开课日期
                $scope.cost = data.livelessondata.data[" 312 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 97) {
                $scope.data01 = data.livelessondata.data[" 297 "];//现价
                $scope.data02 = data.livelessondata.data[" 301 "];//原价
                $scope.classTime = data.livelessondata.data[" 309 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 305 "];//开课日期
                $scope.cost = data.livelessondata.data[" 313 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 98) {
                $scope.data01 = data.livelessondata.data[" 298 "];//现价
                $scope.data02 = data.livelessondata.data[" 302 "];//原价
                $scope.classTime = data.livelessondata.data[" 310 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 306 "];//开课日期
                $scope.cost = data.livelessondata.data[" 314 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 99) {
                $scope.data01 = data.livelessondata.data[" 331 "];//现价
                $scope.data02 = data.livelessondata.data[" 343 "];//原价
                $scope.classTime = data.livelessondata.data[" 337 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 334 "];//开课日期
                $scope.cost = data.livelessondata.data[" 340 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 100) {
                $scope.data01 = data.livelessondata.data[" 332 "];//现价
                $scope.data02 = data.livelessondata.data[" 344 "];//原价
                $scope.classTime = data.livelessondata.data[" 338 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 335 "];//开课日期
                $scope.cost = data.livelessondata.data[" 341 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 101) {
                $scope.data01 = data.livelessondata.data[" 333 "];//现价
                $scope.data02 = data.livelessondata.data[" 345 "];//原价
                $scope.classTime = data.livelessondata.data[" 339 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 336 "];//开课日期
                $scope.cost = data.livelessondata.data[" 342 "];//性价比
            }
            else if (data.livelessondata.contentcatid == 102) {
                $scope.data01 = data.livelessondata.data[" 355 "];//现价
                $scope.data02 = data.livelessondata.data[" 355 "];//原价
                $scope.classTime = '';//课程时长
                $scope.startClass = '';//开课日期
                $scope.cost = '';//性价比
            } else {
                $scope.data01 = data.livelessondata.data[" 278 "];//现价
                $scope.data02 = data.livelessondata.data[" 266 "];//原价
                $scope.classTime = data.livelessondata.data[" 270 "];//课程时长
                $scope.startClass = data.livelessondata.data[" 274 "];//开课日期
                $scope.cost = data.livelessondata.data[" 282 "];//性价比
            }
            if (data.userinfo == false) {
                $(".buy a").attr("href", "login.html");
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function () {
                    location.href = "login.html"
                });
            } else {
                $scope.nickname = data.userinfo.nickname;
                $scope.photo = data.userinfo.photo;
                $scope.contentid = data.goods.contentid;
                $scope.catid = data.goods.catid;
                $scope.commodity_type = data.goods.commodity_type;
                if (data.order == false) {
                    $(".buy a").html("立即购买").attr("href", "sureOrder.html?contentid=" + $scope.contentid + "&catid=" + $scope.catid + "&commodity_type=" + $scope.commodity_type);
                } else {
                    $scope.commodity_type = data.order.commodity_type;
                    $scope.id = data.contentid;
                    $scope.img = data.livelessondata.contentthumb;
                    $scope.title = data.livelessondata.contenttitle;
                    $("#commodity_t").val($scope.commodity_type);
                    if (data.order.order_status == 0) {
                        $(".buy a").html("去付款").click(function () {
                            payQu();
                        });
                    } else {
                        $(".buy a").html("已购买").parent().css("background", "#a5a5a5");
                    }
                }
            }


        });

    }]);


});
function payQu() {

    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/wapOrder',
        type: 'post',
        cache: false,
        data: {
            num: 1,
            price: $("#py_price").val(),
            integral: 0,
            consignee: $("#consignee").val(),
            conphone: $("#conphone").val(),
            commodity_type: $("#commodity_t").val(),
            check: 0,
            id: $("#commodity_id").val(),
            title: $("#commodity_title").val(),
            //url:$("#url").val(),
            image: $("#image").val()
        },
        dataType: 'json',
        beforeSend: function () {

        },
        success: function (data) {
            if (data.hrefType == 1) {
                location.href = "myCourse.html?status=2";
            } else {
                $("#WIDout_trade_no").val(data.goods.order);
                $("#WIDsubject").val(data.goods.title);
                $("#WIDtotal_fee").val(data.goods.account);
                $("#WIDshow_url").val(data.goods.url);
                $("#WIDbody").val(data.goods.remarks);
                $("#service").val(data.goods.order_status);
                $("#orderQ")[0].submit();
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
}
