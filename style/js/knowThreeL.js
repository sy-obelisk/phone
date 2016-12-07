$(function(){
    //获取页面参数
    var Request=GetRequests();
    var ids=Request['id'];
    var knowids=Request['knowsid'];
    var userId=localStorage.getItem("userId");
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
                userid:userId,
                knowid:knowids
            }
        }).success(function(data) {
            console.log(data)
            $scope.content=data.knowledge.contenttext.replace(/src=&quot;/g,'src="http://www.gmatonline.cn');
            console.log($scope.content)
            $scope.contenttitle=data.knowledge.contenttitle;
            $scope.contenttext=$sce.trustAsHtml(escape2Html(data.knowledge.contenttext.replace(/src=&quot;/g,"src=&quot;http://www.gmatonline.cn")));
            $scope.relevance=data.relevance;
            $scope.knowsid=data.knowsid;
            $scope.contentid=data.knowledge.contentid;
            $scope.photo=data.userinfo.photo;
            $scope.nickname=data.userinfo.nickname;
            if($scope.knowsid>0){
                $(".knowBtn").show();
            }else{
                $(".knowBtn").hide();
            }

        });

    }]);


});
