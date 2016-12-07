$(function(){
    //声明模块
    $(".options").css({
        "height":$(".options").width()+"px",
        "lineHeight":$(".options").width()+"px"
    });
    var myApp = angular.module("myApp",[]);
    var Request=GetRequests();
    var queId=Request['id'];
    var mkId=Request['mkid'];
    var userId=localStorage.getItem("userId");
    var userA=Request['userAnswer'];
    var tureA=Request['tureAnswer'];
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/onequestion',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                id:queId,
                mkid:mkId
            }
        }).success(function(data) {
            $scope.name = data.mkinfo.name;
            $scope.nameid = data.mkinfo.nameid;
            $scope.questiontitle = $sce.trustAsHtml(data.question.questiontitle);
            $scope.qslctarr = data.question.qslctarr;
            $scope.p_content =$sce.trustAsHtml(escape2Html(data.parse.p_content));
            $scope.userA=userA;
            $scope.tureA=tureA;

        });

    }]);

});


//查看解析
function seeCheck(o){
    if($(o).hasClass("on")){
        $(o).removeClass("on").html("查看解析").siblings(".parsing").animate({
            "top":"-42px"
        },function(){$(this).fadeOut().css("top",0)});
        return false;
    }else{
        $(o).addClass("on").html("收起解析").siblings(".parsing").show().animate({
            "top":"-="+($(".parsing").height()+42)+"px"
        });
    }
}