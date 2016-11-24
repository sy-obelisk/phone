$(function(){
    var Request=GetRequests();
    var contentId=Request['contentId'];
    var userId=sessionStorage.getItem("userId");
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/videocourse',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                contentid:contentId
            }
        }).success(function(data) {
            $scope.contenttitle = data.data.contenttitle;
            $scope.contentthumb = data.data.contentthumb;
            $scope.price = data.data.price;
            $scope.oldprice = data.data.oldprice;
            $scope.teacher = data.data.teacher;
            $scope.keshi = data.data.keshi;
            $scope.xingjiabi = data.data.xingjiabi;
            $scope.contenttext = $sce.trustAsHtml(escape2Html(data.data.contenttext.replace(/src=&quot;/g,'src="http://www.gmatonline.cn')));
            if(data.userData==false){
                $(".buy a").attr("href","login.html");
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
                $scope.contentid = data.goods.contentid;
                $scope.catid = data.goods.catid;
                $scope.commodity_type = data.goods.commodity_type;
                if(data.order==false){
                    $(".buy a").attr("href","sureOrder.html?contentid="+$scope.contentid +"&catid="+$scope.catid+"&commodity_type="+$scope.commodity_type);
                }else{
                    $scope.commodity_type = data.order.commodity_type;
                    $scope.id = data.contentid;
                    $scope.img = data.data.contentthumb;
                    $scope.title = data.data.contenttitle;
                    $("#commodity_t").val($scope.commodity_type);
                    if(data.order.order_status==0){
                        $(".buy a").html("去付款").click(function(){
                            payQu();
                        });
                    }else{
                        $(".buy a").html("已购买").parent().css("background","#a5a5a5");
                    }
                }

            }

        });

    }]);


});

function payQu(){
    $.ajax({
        url: 'http：//www.gmatonline.cn/index.php?web/appapi/wapOrder',
        type: 'post',
        cache: false,
        data: {
            num:1,
            price:$("#py_price").val(),
            integral:0,
            consignee:$("#consignee").val(),
            conphone:$("#conphone").val(),
            commodity_type:$("#commodity_t").val(),
            check:0,
            id:$("#commodity_id").val(),
            title:$("#commodity_title").val(),
            //url:$("#url").val(),
            image:$("#image").val()
        },
        dataType: 'json',
        beforeSend:function(){

        },
        success: function (data) {
            if(data.hrefType==1){
                location.href="myCourse.html?status=2";
            }else{
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