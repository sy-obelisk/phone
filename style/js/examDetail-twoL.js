$(function(){
    //声明模块
    $(".options").css({
        "height":$(".options").width()+"px",
        "lineHeight":$(".options").width()+"px"
    });
    var myApp = angular.module("myApp",[]);
    var Request=GetRequests();
    var queId=Request['id'];
    var mkId=Request['mkid'];
    var mark=Request['mark'];
    var userId=localStorage.getItem("userId");
    var userA=Request['userAnswer'];
    var tureA=Request['tureAnswer'];
    var mkscoreid=Request['mkscoreid'];
    var type=Request['type'];
    if(type==1){
        $('.return').click(function(){
            location.href='examR-details.html?mkid='+mkId+'&section=&subject=&mark='+mark+'&mkscoreid='+mkscoreid+'&type='+type+'';
        })
    }
    if (type==2){
            $('.return').click(function(){
                location.href='examR-details.html?mkid='+mkId+'&mkscoreid='+mkscoreid+'&mark='+mark+'&type='+type+'';
            })
    }
    console.log(type,mkId,mark)
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/onequestion',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                id:queId,
                mkid:mkId
            }
        }).success(function(data) {
            var regExp = new RegExp("files|/files", 'g');
            $scope.name = data.mkinfo.name;
            $scope.nameid = data.mkinfo.nameid;
            $scope.questionarticle = $sce.trustAsHtml(data.question.questionarticle);
            $scope.questiontitle = $sce.trustAsHtml(data.question.questiontitle.replace(regExp,'http://www.gmatonline.cn/files'));
            $scope.qslctarr = data.question.qslctarr;
            for(var i=0;i<$scope.qslctarr.length;i++){
                $scope.qslctarr[i].select=$sce.trustAsHtml(data.question.qslctarr[i].select.replace(regExp,'http://www.gmatonline.cn/files'));
            }
            $scope.p_content =$sce.trustAsHtml(escape2Html(data.parse.p_content.replace(regExp,'http://www.gmatonline.cn/files')));
            $scope.userA=userA;
            $scope.tureA=tureA;

            if (data.question.subjecttype == 5 && data.question.sectiontype == 7) {
                $(".readArticle").show();
            }

        });

    }]);

});


//查看解析
function seeCheck(o){
    if($(o).hasClass("on")){
        $(o).removeClass("on").html("查看解析").siblings(".parsing").animate({
            "top":"-42px"
        },function(){$(this).fadeOut().css("top",0)});
        return false;
    }else{
        $(o).addClass("on").html("收起解析").siblings(".parsing").show().animate({
            "top":"-="+($(".parsing").height()+42)+"px"
        });
    }
}

//展开文章
function slideUpD(o){
    var height=$(".douText")[0].offsetHeight+"px";
    $(o).hide().siblings(".closeIcon").show();
    $(o).parents(".readArticle").animate({
        height:height
    });
}
//收起文章
function closeArt(o){
    $(o).hide().siblings(".zhankai").show();
    $(o).parents(".readArticle").animate({
        height:"100px"
    });
}