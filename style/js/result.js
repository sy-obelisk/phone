$(function(){
//    中间的绿色圆形
    $(".centerData").css("height",$(".centerData").width()+"px");
//    弹窗居中
    $(".warn-center").css({
        marginLeft:"-"+$(".warn-center").width()*1.9+"px"
    });

    //声明模块
    var myApp = angular.module("myApp",[]);
    var userId = localStorage.getItem("userId");
    var tikuid = sessionStorage.getItem("tikuid");
    var countNum = sessionStorage.getItem("countNum");
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
            $scope.knowName=sessionStorage.getItem("knowName");
            $scope.correct = data.correct;
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