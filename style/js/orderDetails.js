$(function(){
    var Request=GetRequests();
    var orderId=Request['orderId'];

    //声明模块
    var userId=localStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/orderDetails',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                orderid:orderId
            }
        }).success(function(data) {
            $scope.userid=userId;
            $scope.course=data.data.course;
            $scope.contenttitle=data.data.course.contenttitle;
            $scope.contentthumb=data.data.course.contentthumb;
            $scope.contenttext=$sce.trustAsHtml(escape2Html(data.data.course.contenttext.replace(/src=&quot;/g,'src="http://www.gmatonline.cn')));
            $scope.price=data.data.price;
            $scope.order_id=data.data.order_id;
            $scope.buy_time=data.data.buy_time;
            $scope.teacher=data.data.teacher;
            $scope.order_status=data.data.order_status;
            if($scope.order_status=='1'){
                $scope.font='购买成功';
                $scope.fontClass='fir';
            }else{
                $scope.font='未付款';
                $scope.fontClass='';
            }
            if(data.data.order_status==1) {//已购买
                var timestamp=timest();//获取当前时间戳
                if(data.data.validity_time>=timestamp){//是否过期
                    if(data.data.video){
                        $scope.video=data.data.video;
                        $(".courseIntroduce").hide();
                    }else{
                        $(".courseIntroduce").show();
                    }
                    //$(".courseIntroduce").hide();
                }else{
                    //已过期
                    $(".courseIntroduce").show();
                }
                //$(".courseIntroduce").hide();
            }else{
                $(".courseIntroduce").show();
            }

            if(data.data.commodity_type==1){
                if(data.data.order_status==1) {
                    if(data.data.livesdk.LIVESDKID){
                        $("#comeRoom").show().find("a").attr("href",data.data.goods.url);
                    }
                }
            }

        });

    }]);
});
//获取当前时间戳并截取为10位数
function timest() {
    var tmp = Date.parse( new Date() ).toString();
    tmp = tmp.substr(0,10);
    return tmp;
}