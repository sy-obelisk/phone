$(function(){
    var Request=GetRequests();
    var queId=Request['queId'];
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        //题库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/timudetails',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                questionid:queId
            }
        }).success(function(data) {
            var regExp = new RegExp("files|/files", 'g');
            $scope.question=$sce.trustAsHtml(escape2Html(data.question.replace(regExp,'http://www.gmatonline.cn/files')));
            $scope.qslctarr=data.qslctarr;
            $scope.questionanswer=data.questionanswer;
            $scope.questionid=data.questionid;
            $scope.nextid=data.nextid;
            $scope.tikuname=data.tikuname[1]+'-'+data.tikuname[0];
            if(data.parse){
                $scope.p_content=$sce.trustAsHtml(escape2Html(data.parse[0].p_content));
            }
            for(var i=0;i<$scope.qslctarr.length;i++){
                $scope.qslctarr[i].select=$sce.trustAsHtml(escape2Html(data.qslctarr[i].select));
            }


        });

    }]);
});
//选择答案
function chooseAnswer(o){
    $(o).addClass("blue").siblings().removeClass("blue");
}
//查看解析
function seeCheck(o){
        if($(o).hasClass("on")){
            $(o).removeClass("on").html("查看解析").siblings(".parsing").animate({
                "bottom":"-300px"
            },function(){$(this).fadeOut().css("top",0)});
            return false;
        }else{
            $(o).addClass("on").html("收起解析").siblings(".parsing").show().animate({
                "bottom":"42px"
            });
        }
}
//下一题
function nextTimu(){
    location.href="timuDetails.html?queId="+$("#nextid").val();
}