$(function(){
//    选项圆高度
    $(".options").css({
        "height":$(".options").width()+"px",
        "lineHeight":$(".options").width()+"px"
    });

    //获取页面参数
    var Request=GetRequests();
    var tikuId=Request['tikuId'];
    var type=Request['type'];
    var article=Request['articletitle'];
    var knowName=Request['knowName'];
    sessionStorage.setItem("tikuid",tikuId);
    sessionStorage.setItem("knowName",knowName);
    var tikuid=sessionStorage.getItem("tikuid");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/lianxi',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                articletitle:article,
                userid:userId,
                id:tikuid,
                type:type
            }
        }).success(function(data) {
            console.log(data);
            sessionStorage.setItem("countNum",data.count);
            if(data.articletitle==null){
                sessionStorage.setItem("article","")
            }else {
                sessionStorage.setItem("article",data.articletitle);
            }

            //console.log(sessionStorage.getItem("article"));
            sessionStorage.setItem("knowId",data.user_konw_id);
            $scope.knowName=knowName;
            if(data.userCode==0){
                location.href="login.html";
            }else{
                $scope.counts=data.count;
                $scope.article=data.articletitle;
                $scope.questionNum=data.questionNum;
                $scope.question=$sce.trustAsHtml(escape2Html(data.question.question));
                $scope.qslctarr=data.question.qslctarr;
                $scope.questionanswer=data.question.questionanswer;
                $scope.questionid=data.question.questionid;
                $scope.sectiontype=data.question.sectiontype;
                $scope.p_content=$sce.trustAsHtml(escape2Html(data.parse.p_content));
                $scope.questionarticle = $sce.trustAsHtml(data.question.questionarticle);
                if (data.question.subjecttype == 5 && data.question.sectiontype == 7) {
                    $(".readArticle").show();
                }
            }

        });

        //获取题目信息


    }]);


});
//选择答案
function chooseAnswer(o){
    $(o).addClass("blue").siblings().removeClass("blue");
}
//查看解析
function seeCheck(o){
    var answer=$(".topic-con ul li.blue").attr("data-answer");
    if(answer){
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
    }else{
        alert("请先选择你的答案！");
    }
}

/**
 * 做题数据
 * @param data
 * @constructor
 */
function QuestionContent(data,type,ndzn,donum){
    var sec= section(data.data.data.sectiontype);//类型
    var two = twoobjecttype(data.data.data.twoobjecttype);//来源
    if(two ==''){
        two = 'PREP';
    }
    var qid = data.data.data.questionid; //问题ID
    var title = ''+two+'-'+sec+'-'+qid+''; //标题
    var allnum = data.data.qallnum;//题目总数
    var nonum = data.data.qnonum;//用户未做题数
    var num =(allnum - nonum)+1;  //计算剩余题，总题数
    if(num <=0){
        num = 1;//开始第一道
    }
    if(nonum == 0){
        //未做题 =0 跳转结果页
        location.href="/wap/personCenter.html";//问题，待修改
    }
    var name_num = num;
    var name_sum = allnum;
    $('#name_sum').html('共'+name_sum+'题');//标题
    if(type==3){
        if(ndzn==1){
            var name_num = 1;
        }else{
            var name_num = parseInt(donum)+1;
        }
        $('#name_sum').html('');//标题
    }

    $('#title').html(title);//标题
    $('#donum').val(name_num);//第几题
    $('#name_num').html('第'+name_num+'题');//第几题
    $('#question').html(data.data.data.question);//题内容
    $('#questionid').val(qid);//题ID
    $('#sectiontype').val(data.data.data.sectiontype);//题分类
    $('#questionanswer').val(data.data.data.questionanswer);//正确答案
    //题选项abcde
    var selectstr = "";
    $.each(data.data.data.qslctarr,function(k,v) {
        selectstr +='<li>'+
        '<div class="leftOption">'+
        '<input type="radio" name="radGroup" id="rad'+v.name+'" chooseType="'+v.name+'"/>'+
        '<label>'+ v.name+'</label>'+
        '</div>'+
        '<div class="rightOption">'+
        '<label for="rad'+v.name+'">'+ v.select+'</label>'+
        '</div>'+
        '<div style="clear: both"></div>'+
        '</li>';
    });
    $('#select').html(selectstr);
    //题解析
    var parsestr="";
    parsestr +='<p>感谢由'+ data.data.parse.nickname+'提供解析</p>'+
    '<p>正确答案：'+ data.data.data.questionanswer+'</p>'+
    '<p>'+ data.data.parse.p_time+'</p>'+
    ''+ data.data.parse.p_content+'';
    $('#parse').html(parsestr);
}
/**
 * 提交答案ima
 */
var userId=localStorage.getItem("userId");
var startTime = parseInt(new Date().getTime()/1000);
function submitAnswer(){
    var Request=GetRequests();
    var type=Request['type'];
    var knowName=Request['knowName'];
    var tikuid=Request['tikuId'];
    var endTime=parseInt(new Date().getTime()/1000);
    var totalTime = (endTime - startTime);
    var knowId=sessionStorage.getItem("knowId");
    var article=sessionStorage.getItem("article");
    var answer=$(".topic-con ul li.blue").attr("data-answer");
        $.ajax({
            url: 'http://www.gmatonline.cn/index.php?web/appapi/DoProblemAnswer',
            data: {
                tikuid:tikuid,
                userid:userId,
                cptime:totalTime,
                countNum:$("#countNum").val(),
                questionid: $("#questionid").val(),
                sectiontype: $("#sectiontype").val(),
                oneobjecttype: 4,
                user_konw_id:knowId,
                useranswer: answer,
                checke: 'false'
            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log(data)
                if(data.code == 1){
                    //答题成功
                    if(data.next == 1){
                        location.href='practice.html?tikuId='+tikuid+'&type='+type+'&knowName='+knowName+'&articletitle='+article+'';
                        //location.reload();
                    }else{
                        location.href="result.html";


                    }
                }else{
                    alert(data.message);
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