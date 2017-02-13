$(function(){
//    选项圆高度
    $(".options").css({
        "height":$(".options").width()+"px",
        "lineHeight":$(".options").width()+"px"
    });
    //选项栏目高度
    $(".selection ul li").each(function(){
        $(this).find("a").css({
            "height":$(this).find("a").width()+"px",
            "lineHeight":$(this).find("a").width()+"px"
        })
    });
    //获取页面参数
    var Request=GetRequests();
    var anId=Request['anId'];
    var type=Request['type'];
    var tikuid=Request["tikuId"];
    var knowName=Request["knowName"];
    var knowsId=Request["knowsId"];
    //var tikuid=sessionStorage.getItem("tikuid");
    var userId=localStorage.getItem("userId");
    $("#reNeed").val(anId);
    if (type==1){
        $(".return").click(function(){
            //location.href='topic-library.html';
            location.href='result.html?type='+type+'&tikuId='+tikuid+'&knowName='+knowName+'&knowsId='+knowsId+'';
        })
    }
    if (type==2){
        $(".return").click(function(){
            //location.href='test-sprint.html';
            location.href='result.html?type='+type+'&tikuId='+tikuid+'&knowName='+knowName+'&knowsId='+knowsId+'';
        })
    }
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
        //获取题目信息
        $http({
            method: 'post',
            //url: 'http://gmatonline.cc/index.php?web/appapi/detalisResult',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/detalisResult',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                tikuid:tikuid,
                id:anId
            }
        }).success(function(data) {
            var regExp = new RegExp("files|/files", 'g');
            $scope.type=type;
            $scope.tikuId=tikuid;
            $scope.knowName=knowName;
            $scope.knowsId=knowsId;
            $scope.synthesis=data.synthesis;
            $scope.qtitle=$sce.trustAsHtml(data.answerContent.question.replace(regExp,'http://www.gmatonline.cn/files'));
            $scope.qslctarr=data.answerContent.qslctarr;
            $scope.questionanswer=data.answerContent.questionanswer;
            $scope.useranswer=data.answerContent.useranswer;
            $scope.questionid=data.answerContent.questionid;
            $scope.qanswertype=data.answerContent.qanswertype;
            $scope.p_content=$sce.trustAsHtml(escape2Html(data.parse.p_content));
            $scope.questionarticle= $sce.trustAsHtml(data.answerContent.questionarticle);
            for(var i=0;i<$scope.qslctarr.length;i++){
                console.log( $scope.qslctarr[i].select)
                $scope.qslctarr[i].select=$sce.trustAsHtml(data.answerContent.qslctarr[i].select.replace(regExp,'http://www.gmatonline.cn/files'));

            }

            if (data.answerContent.subjecttype == 5 && data.answerContent.sectiontype == 7) {
                $(".readArticle").show();
            }

        });


        $scope.toggle = {
            now:false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now)
                //console.log('game over!');
            jQuery(".selection").slide({mainCell:".selectionBd ul",vis:7,scroll:6,autoPage:true,effect:"leftLoop"});
            $(".selectionBd ul li").each(function(){
                var queId=$(this).attr("data-queId");
                //判断改题是否正确添加不同的样式
                if($scope.questionid==queId){//当前题目
                    var num=$(this).find("a").html();
                    $("#currNum").html(num);
                    $("#totalNum").html($scope.synthesis.length);

                    if(num==7 || num==8 || num==9 || num==10 || num==11 || num==12){
                        $(".next").trigger("click");
                    }else if(num==13 || num==14 || num==15 || num==16 || num==17 || num==18){
                        for(var i=0;i<2;i++){
                            $(".next").trigger("click");
                        }
                    }else if(num==19 || num==20 || num==21 || num==22 || num==23 || num==24){
                        for(var j=0;j<3;j++){
                            $(".next").trigger("click");
                        }
                    }else if(num==25 || num==26 || num==27 || num==28 || num==29 || num==30){
                        for(var z=0;z<4;z++){
                            $(".next").trigger("click");
                        }
                    }else if(num==31 || num==32 || num==33 || num==34 || num==35 || num==36){
                        for(var a=0;a<5;a++){
                            $(".next").trigger("click");
                        }
                    }else if(num==37 || num==38 || num==39 || num==40 || num==41){
                        for(var b=0;b<6;b++){
                            $(".next").trigger("click");
                        }
                    }

                    return false;
                }

            });

        });

    }]);



});

//查看解析
function seeCheck(o){
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
 * 提交答案
 */
function submitAnswer(){
    var answer=$(".topic-con ul li.blue").attr("data-answer");
        $.ajax({
            //url: 'http://gmatonline.cc/index.php?web/appapi/DoProblemAnswer',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/DoProblemAnswer',
            data: {
                questionid: $("#questionid").val(),
                sectiontype: $("#sectiontype").val(),
                oneobjecttype: 4,
                useranswer: answer,
                checke: 'false'

            },
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                if(data.code == 1){
                    //答题成功
                    if(data.next == 1){
                        location.reload();
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
//重新做题
function reloadSee(){
    var answId=$("#reNeed").val();
    location.href="practiceDetail.html?anId="+answId;
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