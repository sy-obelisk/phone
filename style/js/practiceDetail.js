$(function(){
    //获取页面参数
    var Request=GetRequests();
    var anId=Request['anId'];
    var tikuid=sessionStorage.getItem("tikuid");
    var userId=localStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        //获取题目信息
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/detalisResult',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                tikuid:tikuid,
                id:anId
            }
        }).success(function(data) {
            console.log(data);
            $scope.synthesis=data.synthesis;
            $scope.qtitle=data.answerContent.qtitle;
            $scope.qslctarr=data.answerContent.qslctarr;
            $scope.questionanswer=data.answerContent.questionanswer;
            $scope.useranswer=data.answerContent.useranswer;
            $scope.p_content=data.parse.p_content;

        });
        //$http.post('http://www.gmatonline.cn/index.php?web/appapi/detalisResult',{id:anId}).success(function(data) {
        //    console.log(data)
        //    $scope.synthesis=data.synthesis;
        //    $scope.qtitle=data.answerContent.qtitle;
        //    $scope.qslctarr=data.answerContent.qslctarr;
        //    $scope.questionanswer=data.answerContent.questionanswer;
        //    $scope.useranswer=data.answerContent.useranswer;
        //    $scope.p_content=data.parse.p_content;
        //});

    }]);

    //    选项圆高度
    $(".options").css({
        "height":$(".options").width()+"px",
        "lineHeight":$(".options").width()+"px"
    });
});
//选择答案
function chooseAnswer(o){
    $(o).addClass("blue").siblings().removeClass("blue");
}

//查看解析
function seeCheck(o){
    if($(o).hasClass("on")){
        $(o).removeClass("on").html("查看解析").siblings(".parsing").animate({
            "top":"-105px"
        },function(){$(this).fadeOut().css("top",0)});
        return false;
    }else{
        $(o).addClass("on").html("收起解析").siblings(".parsing").show().animate({
            "top":"-="+($(".parsing").height()+135)+"px"
        });
    }
}