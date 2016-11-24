$(function(){
    //   模
    $(".little").css({"height":$(".little").width()+"px","lineHeight":$(".little").width()+"px"});
    //获取页面参数
    var Request=GetRequests();
    var codes=Request['code'];
    var marks=Request['mark'];
    var nameq=Request['name'];
    if(nameq.split('-')[1]=='sift'){
        $(".names").html(nameq.split('-')[0]+'-精选题库');
    }else{
        $(".names").html(Request['name']);
    }
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/TestList',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                code:codes,
                mark:marks
            }
        }).success(function(data) {
            $scope.item=data.data;
            $scope.marks=data.mark;
            for(var i=0;i< $scope.item.length;i++){
                if($scope.item[i].markquestion==2){//显示完成图标
                    $scope.item[i].otherA="examResult.html?mkid="+$scope.item[i].id+"&mkscoreid="+$scope.item[i].mkscoreid;
                }else{
                    $scope.item[i].otherA="examStart.html?mark="+ $scope.marks+"&id="+$scope.item[i].id+"&name="+$scope.item[i].name;
                }
            }

        });

    }]);


});