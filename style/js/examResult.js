$(function(){
//    中间的绿色圆形
    $(".centerData").css("height",$(".centerData").width()+"px");
//    弹窗居中

    $(".warn-center").css({
        marginLeft:"-"+parseInt($(".warn-center").css("width"))/2+"%"
    });
    var Request=GetRequests();
    var mkid=Request["mkid"];
    var type=Request["type"];
    var mkscoreid=Request["mkscoreid"];
    var userId=localStorage.getItem("userId");
    if(type==1){
        $('.return').click(function(){
            location.href='imitate-test.html'
        })
    }
    if(type==2){
        $('.return').click(function(){
          location.href='examRecord.html?type=verbal'
        })
    }
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/result',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                mkscoreid:mkscoreid,
                userid:userId,
                mkid:mkid
            }
        }).success(function(data) {
            console.log(data)
            $scope.type=type;
            $scope.name = data.mkinfo.name;
            $scope.mkid = data.mkid;
            //$scope.mark = data.mark;
            $scope.mkscoreid = data.mkscoreid;
            $scope.nameid = data.mkinfo.nameid;
            $scope.correct=Math.round(data.correct*10)/10;
            $scope.V_score=data.credit.V_score;
            $scope.Q_score=data.credit.Q_score;
            $scope.Totalscore=data.credit.Totalscore;
            $scope.nickname=data.userData.nickname;
            $scope.photo=data.userData.photo;


            if(data.QuantNum==0 && data.VerbalNum!=0){//语文
                $scope.totalNum=data.VerbalNum;
                if($scope.V_score<='25'){
                    $scope.V_scoreT="<"+$scope.V_score;
                    $scope.fonts=$sce.trustAsHtml("满分51分，正确率低于35%得分均为<25分");
                    $scope.markT='verbal';
                }
            }else if(data.QuantNum!=0 && data.VerbalNum==0){//数学
                $scope.totalNum=data.QuantNum;
                if($scope.Q_score<='30'){
                    $scope.V_scoreT="<"+$scope.Q_score;
                    $scope.fonts=$sce.trustAsHtml("满分51分，正确率低于30%得分均为<30分");
                    $scope.markT='quant';
                }
            }else if(data.QuantNum!=0 && data.VerbalNum!=0){//全套
                $scope.totalNum=parseInt(data.QuantNum)+parseInt(data.VerbalNum);
                $scope.V_scoreT=$scope.Totalscore;
                $scope.fonts=$sce.trustAsHtml(escape2Html("<p>语文得分"+data.credit.V_score+"分（满分51分）</p>"+"<p>数学得分"+data.credit.Q_score+"分（满分51分）</p>"));
                $scope.markT='all';
            }

        });

    }]);


});

//展示分享弹窗
function showShare(evt){
    evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
    $(".shareMask").show();
}