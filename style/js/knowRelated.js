$(function(){
    //   点
    $(".little").css({"height":$(".little").width()+"px","lineHeight":$(".little").width()+"px"});

    //获取页面参数
    var Request=GetRequests();
    var ids=Request['id'];
    var knowids=Request['knowsid'];
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zhishidetail',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                id:ids,
                knowid:knowids
            }
        }).success(function(data) {
            $scope.relevance=data.relevance;
            $scope.photo=data.userinfo.photo;
            $scope.nickname=data.userinfo.nickname;

        });

        //$http.post('http://www.gmatonline.cn/index.php?web/appapi/zhishidetail',{id:ids,knowid:knowids}).success(function(data) {
        //    $scope.relevance=data.relevance;
        //    $scope.photo=data.userinfo.photo;
        //    $scope.nickname=data.userinfo.nickname;
        //});
    }]);


});