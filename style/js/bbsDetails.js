//获取页面参数
var Request=GetRequests();
var ids=Request['id'];
var nameT=Request['nameT'];
var userId=sessionStorage.getItem("userId");
$(function(){
$(".invitaImg").css("height",$(".invitaImg").width()+"px");

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
    myApp.controller("PriceCtrl",["$scope","$http",'$sce',function($scope,$http,$sce){
        
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/ziliaolist',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
               fid:ids
            }
        }).success(function(data) {
            console.log(data)
          //if(data.userCode==0){
            //    location.href="login.html";
            //}else{
            $scope.nametitle=nameT;
                $scope.nav=data.data;
                $scope.top=data.top;
            for(var i=0;i<$scope.top.length;i++){
                $scope.top[i].subject=$sce.trustAsHtml(escape2Html($scope.top[i].subject))
            }
            if(data.userinfo==false){
                //头部个人中心图标未登陆点击跳转到登陆
                //$("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userinfo.nickname;
                $scope.photo = data.userinfo.photo;
            }
                //$scope.all=data[0].list;
                //$scope.ziliao=data[1].list;
                //$scope.guihua=data[2].list;
            //}

        });

        
        $scope.toggle = {
            now:false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){
                jQuery(".bbsSlide").slide({titCell:".bbsHd li",mainCell:".bbsBd"});
            }
        });


    }]);

});

function postMess(){
    var fid=$(".bbsHd ul li.on").attr("data-fid");
    location.href="published.html?fid="+fid+"&reid="+ids;
}