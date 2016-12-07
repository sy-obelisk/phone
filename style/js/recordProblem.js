$(function(){
    //获取页面参数
    var Request=GetRequests();
    var sections=Request['section'];
   if(sections==6){
       $(".resultHd ul li:first-child").addClass("on");
   }else if(sections==8){
       $(".resultHd ul li:nth-child(2)").addClass("on");
   }else if(sections==7){
       $(".resultHd ul li:nth-child(3)").addClass("on");
   }else if(sections==4){
       $(".resultHd ul li:nth-child(4)").addClass("on");
   }else if(sections==5){
       $(".resultHd ul li:nth-child(5)").addClass("on");
   }
    $("#section").val(sections);
    //声明模块
    var userId=localStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/ProblemRecord',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                section:sections
            }
        }).success(function(data) {
            if(data.userCode==0){
                location.href="login.html";
            }else{
                $scope.correct = data.correct;
                $scope.num = data.totalnum.num;
                $scope.questionrecord = data.questionrecord;
                $scope.pageSize = data.pageSize;
                $scope.photo = data.userinfo.photo;
                $scope.nickname = data.userinfo.nickname;
            }

        });
    }]);




});