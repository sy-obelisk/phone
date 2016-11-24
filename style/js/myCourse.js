
$(function(){
    var Request=GetRequests();
    var sta=Request['status'];
    var userId=sessionStorage.getItem("userId");
    if(sta==2){
        $(".courseHd ul li").first().addClass("on");
    }else if(sta==1){
        $(".courseHd ul li:nth-child(2)").addClass("on");
    }else if(sta==0){
        $(".courseHd ul li").last().addClass("on");
    }

    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){

        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/courseRecord',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                status:sta
            }
        }).success(function(data) {
            console.log(data)
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
                $scope.course = data.course;
                for(var i=0;i<$scope.course.length;i++){
                    if($scope.course[i].order_status==1){//已购买
                        $scope.course[i].classN="green";
                        $scope.course[i].conn="交易成功";
                        $scope.course[i].fukuan="hideC";
                    }else{
                        $scope.course[i].classN="red";
                        $scope.course[i].conn="等待买家付款";
                        $scope.course[i].fukuan="showC";
                    }

                }
            }

        });


    }]);




});
var flag=true;
function showEdit(o){
    if(flag){
        $(o).html("完成");
        $(".courseData ul li").each(function(){
            if($(this).find(".redB").hasClass("showC")){
                $(this).find('.col-xs-1 img').show();
            }
        });
        flag=false;
    }else{
        $(o).html("编辑");
        $(".courseData ul li").each(function(){
            if($(this).find(".redB").hasClass("showC")){
                $(this).find('.col-xs-1 img').hide();
            }
        });
        flag=true;
    }
}

function removeLi(o){
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/deleteorder',
        type: 'post',
        cache: false,
        data: {
            order_id:$(o).attr("data-orderid")
        },
        dataType: 'json',
        success: function (data) {
            if(data.code==1){
                $(o).parents("li.inLi").remove();
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}

function payCome(o){
    var userId=sessionStorage.getItem("userId");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/wappay',
        type: 'post',
        cache: false,
        data: {
            userid:userId,
            orderid:$(o).attr("data-orderid")
        },
        dataType: 'json',
        beforeSend:function(){

        },
        success: function (data) {
            console.log(data)
            $("#WIDout_trade_no").val(data.goods.order);
            $("#WIDsubject").val(data.goods.title);
            $("#WIDtotal_fee").val(data.goods.account);
            $("#WIDshow_url").val(data.goods.url);
            $("#WIDbody").val(data.goods.remarks);
            $("#service").val(data.goods.order_status);
            $("#orderS")[0].submit();
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
}