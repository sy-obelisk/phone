/**
 * Created by Administrator on 2016/11/16.
 */
$(function(){
    var Request=GetRequests();
    var queId=Request['queId'];
    var sectionid=Request["section"];
    var userId=localStorage.getItem("userId");
    var articletitle=Request['articletitle'];
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        //题库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/doFalse',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                questionid:queId,
                articletitle:articletitle,
                section:sectionid
            }
        }).success(function(data) {
            $(".loader").fadeOut(100);
            if (data.question.code==1){
                sessionStorage.setItem("quid",data.question.question.questionid);
                sessionStorage.setItem('articletitle',data.question.articletitle);
                $scope.question=$sce.trustAsHtml(escape2Html(data.question.question.question));
                $scope.qslctarr=data.question.question.qslctarr;
                $scope.questionanswer=data.question.question.questionanswer;
                $scope.questionid=data.questionid;
                $scope.totalnum=data.totalnum.num;
                $scope.questionarticle = $sce.trustAsHtml(data.question.question.questionarticle);
                $scope.tikuname=data.question.question.sections+'-'+data.question.question.twoname;
                if(data.question.parse){
                    $scope.p_content=$sce.trustAsHtml(escape2Html(data.question.parse.p_content));
                }
                if (data.question.question.subjecttype == 5 && data.question.question.sectiontype == 7) {
                    $(".readArticle").show();
                }
            }else {
                alert(data.question.message);
                location.href="mistakeRecord.html";
            }


        });

    }]);
});
//选择答案
function chooseAnswer(o){
    $(o).addClass("blue").siblings().removeClass("blue");
}
/**
 * 提交答案ima
 */
var userId=localStorage.getItem("userId");
var startTime = parseInt(new Date().getTime()/1000);
function submitAnswer(){
    var Request=GetRequests();
    var section=Request['section']
    var articletitle=sessionStorage.getItem("articletitle");
    var type=Request['type'];
    var sectionid=Request["section"];
    var queId=sessionStorage.getItem("quid");
    var endTime=parseInt(new Date().getTime()/1000);
    var totalTime = (endTime - startTime);
    var answer=$(".topic-con ul li.blue").attr("data-answer");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/doFalseAnswer',
        data: {
            questionid:queId,
            userid:userId,
            useranswer: answer,
            cptime:totalTime,
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if(data.code == 1){
                //答题成功
                location.reload();
                location.href='mistakeDetails.html?&section='+section+'&articletitle='+articletitle+'';
            }else{
                alert(data.question.message);
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });
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

//查看解析
function seeCheck(o){
    var answer=$(".topic-con ul li.blue").attr("data-answer");
    if(answer){
        if($(o).hasClass("on")){
            $(o).removeClass("on").html("查看解析").siblings(".parsing").animate({
                "bottom":"-300px"
            },function(){$(this).fadeOut().css("top",0)});
            return false;
        }else{
            $(o).addClass("on").html("收起解析").siblings(".parsing").show().animate({
                "bottom":"42px"
            });
        }
    }else{
        alert("请先选择你的答案！");
    }
}
//下一题
//function nextTimu(){
//    location.href="mistakeDetails.html?queId="+$("#nextid").val();
//}