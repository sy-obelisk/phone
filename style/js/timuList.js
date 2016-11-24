$(function(){
    var Request=GetRequests();
    var keyW=Request['keyword'];
    var userId=sessionStorage.getItem("userId");
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
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        //题库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/timulist',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                keywords:keyW
            }
        }).success(function(data) {
            $scope.data = data.question.data;
            for(var i=0;i<$scope.data.length;i++){
                $scope.data[i].question=$sce.trustAsHtml(data.question.data[i].question);
            }
            if(data.userinfo==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
                $scope.nickname = '未登录';
                $scope.photo = 'newwap/style/images/userDefault.png';
            }else{
                $scope.nickname = data.userinfo.nickname;
                $scope.photo = data.userinfo.photo;
            }
        });

        $scope.toggle = {
            now:false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){
                //实现关键字高亮
                Highlight02(keyW);
            }
        });
    }]);
});
function Highlight02(searchTerm) {
    var obj = $('.timu_l ul li');
    obj.removeHighlight();
    if (searchTerm) {
        obj.highlight(searchTerm);
    }
}
