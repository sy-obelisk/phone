$(function(){
    //获取页面参数
    var Request=GetRequests();
    var contentids=Request['contentid'];
    var userId=localStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/beikao',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                contentid:contentids
            }
        }).success(function(data) {
            $(".loader").fadeOut(100);
            var regExp = new RegExp("files|/files", 'g');
            $scope.contenttext=$sce.trustAsHtml(escape2Html(data.data.content.contenttext.replace(regExp,'http://www.gmatonline.cn/files')));
            $scope.contenttitle=data.data.content.contenttitle;
            $scope.contentinputtime=data.data.content.contentinputtime;
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
            }
        });

    }]);
});