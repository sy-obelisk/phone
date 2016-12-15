$(function(){
//    中间的绿色圆形
    $(".centerData").css("height",$(".centerData").width()+"px");
//    弹窗居中
    $(".warn-center").css({
        marginLeft:"-"+$(".warn-center").width()*1.9+"px"
    });

    //声明模块
    var Request=GetRequests();
    var myApp = angular.module("myApp",[]);
    var type=Request['type'];
    var userId = localStorage.getItem("userId");
    var tikuid = Request['tikuId'];
    var knowName = Request['knowName'];
    var knowsId = Request['knowsId'];
    //var tikuid = sessionStorage.getItem("tikuid");
    var countNum = sessionStorage.getItem("countNum");
    if (type==1){
        $(".testDetail").attr('href','testResult.html?type='+type+'&tikuId='+tikuid+'&knowName='+knowName+'&knowsId='+knowsId+'');
        $(".return").click(function(){
            location.href='topic-library.html';
        })
    }
    if (type==2){
        $(".testDetail").attr('href','testResult.html?type='+type+'&tikuId='+tikuid+'&knowName='+knowName+'&knowsId='+knowsId+'');
        $(".return").click(function(){
            location.href='sprintDetails.html?knowsId='+knowsId+'';
        })
    }
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/DoProblemResult',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                tikuid:tikuid
            }

        }).success(function(data) {
            $scope.knowName=knowName;
            if(data.correct==null){
                $scope.correct = 0;
            }else {
                $scope.correct = data.correct;
            }
            $scope.countNum = countNum;
            $scope.tikuid = data.tikuid;
            $scope.correctLv = data.userData.correct;
            var pingj=data.totalTime/countNum;
            var acc=Math.round((data.correct/countNum)*100);
            var time=time_To_hhmmss(pingj);
            $("#times").html(time);
            $("#accuracy").html(acc+'%');

        });

    }]);


});

//展示分享弹窗
function showShare(evt){
    evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
    $(".shareMask").show();
}