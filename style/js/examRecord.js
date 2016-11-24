$(function(){
    //获取页面参数
    var Request=GetRequests();
    var types=Request['type'];
    var userId=sessionStorage.getItem("userId");
    if(types=='verbal'){
         $(".resultHd ul li:first-child").addClass("on");
    }else if(types=='quant'){
        $(".resultHd ul li:nth-child(2)").addClass("on");
    }else if(types=='all'){
        $(".resultHd ul li:last-child").addClass("on");
    }
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/wapmodelRecord',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                type:types
            }
        }).success(function(data) {
            $scope.mkscoreid=data.mkscoreid;
            $scope.correct = data.correct;
            $scope.mklist_num = data.mklist_num;
            $scope.mklist_all = data.mklist_all;
            $scope.photo = data.userData.photo;
            $scope.nickname = data.userData.nickname;

        });
    }]);


});