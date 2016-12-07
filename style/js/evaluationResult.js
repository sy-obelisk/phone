window.onload=function(){
    $(".resultCircle").css("height",$(".resultCircle").css("width"));
};

$(function(){

    //获取页面参数
    var Request=GetRequests();
    var kzids=Request['kzid'];
    var userId=localStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);

//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){

        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/test',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                kzid:kzids
            }
        }).success(function(data) {
            $scope.totalscore=Math.round(data.totalscore/10)*10;
            $scope.cihui_score=data.cihui_score;
            $scope.sc_cr_score=data.sc_cr_score;
            $scope.q_score=data.q_score;
            $scope.photo=data.userData.photo;
            $scope.nickname=data.userData.nickname;
            if($scope.totalscore>=0&&$scope.totalscore<=200){
                $(".centerFont").find("span").html('基础很差，运气成分较多');
            }else if($scope.totalscore>200&&$scope.totalscore<=350){
                $(".centerFont").find("span").html('基础一般');
            }else if($scope.totalscore>350&&$scope.totalscore<=500){
                $(".centerFont").find("span").html('基础一般');
            }else if($scope.totalscore>500&&$scope.totalscore<=650){
                $(".centerFont").find("span").html('基础较好');
            }else if($scope.totalscore>650&&$scope.totalscore<=800){
                $(".centerFont").find("span").html('基础良好');
            }

        });


    }]);

});