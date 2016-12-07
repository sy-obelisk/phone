$(function(){
    var Request=GetRequests();
    var ids=Request['knowsId'];
    //声明模块
    var myApp = angular.module("myApp",[]);
    myApp.directive('isOver',function(){
        return {
            restrict: 'A',
            scope: {
                over: '=isOver'
            },
            link:function(scope, elm, attr){
                if(scope.$parent.$last){
                    scope.over = true;
                }
            }
        }
    });
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        var userId=localStorage.getItem("userId");
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/knowtiku',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                id:ids,
                userid:userId
            }
        }).success(function(data) {
            console.log(data);
            $scope.knowName = data.data.knowName;
            $scope.datas = data.data.data;
            if($scope.datas.length==0){
               alert('暂无此类数据')
            }
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
            }

        });

        $scope.toggle = {
            now:false
        };

        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){
                $(".listContent ul li").each(function(){
                    var old=$(this).find(".haoshi").html();
                    var type=$(this).find(".leixin").val();
                    $(this).find(".haoshi").html(time_To_hhmmss(old));
                    if(type==1){//重新做
                        $(this).find("a.gr02").show().siblings("a").hide();
                    }else if(type==0){//继续做
                        $(this).find("a.red").show().siblings("a").hide();
                    }else if(type==2){//开始做
                        $(this).find("a.gr01").show().siblings("a").hide();
                    }
                });
            }
        });
    }]);

});