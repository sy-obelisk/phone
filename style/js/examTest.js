$(function(){
//    选项圆高度
    $(".options").css({
        "height":$(".options").width()+"px",
        "lineHeight":$(".options").width()+"px"
    });
    //获取页面参数
    var Request=GetRequests();
    var startTime=Request['startTime'];
    var mkid=Request['mkid'];
    var mark=Request['mark'];
    var step=Request['step'];
    var first=Request['first'];
    var breakStartTime=Request['breakStartTime'];
    var mkscoreid=Request['mkscoreid'];
    var subject=Request['subject'];
    var stop=Request['break'];
    var readqid=Request['readqid'];
    var breaktime=Request['breaktime'];
    var userId=sessionStorage.getItem("userId");
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",'$sce',function($scope,$http,$sce){
        //获取题目信息
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/dati_exam',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                startTime:startTime,
                mark:mark,
                mkid:mkid,
                step:step,
                first:first,
                breakStartTime:breakStartTime,
                mkscoreid:mkscoreid,
                userid:userId,
                subject:subject,
                readqid:readqid,
                breaktime:breaktime,
                break:stop
            }
        }).success(function(data) {
            sessionStorage.setItem("startTime",data.startTime);
            sessionStorage.setItem("qnonum",data.qnonum);
            sessionStorage.setItem("qnonids",data.qnonids);
            sessionStorage.setItem("mkscoreid",data.mkscoreid);
            sessionStorage.setItem("breaktime",data.breaktime);
            sessionStorage.setItem("readqid",data.readqid);
            //timer(intDiff);
            if(data.userCode==0){
                location.href="login.html";
            }else{
                if(data.hrefType == 2){
                    //location.href="examTest.html?next=1&mark="+data.mark;
                }else if (data.hrefType== 9){
                    sessionStorage.setItem('startTime',data.startTime);
                    sessionStorage.setItem('breaktime',data.breaktime);
                    sessionStorage.setItem('mkid',data.mkid);
                    sessionStorage.setItem('mkscoreid',data.mkscoreid);
                    $("#testBox").hide();
                    $("#breakBox").show();
                    countDown($scope.subject);
                } else if(data.hrefType == 1){
                    //location.href="examTest.html?next=1&allmark=allmark&mark="+data.mark;
                }else if(data.hrefType == 3){
                    location.href='examResult.html?mkid='+data.mkid+'&mkscoreid='+data.mkscoreid+'';
                }else if(data.hrefType == 4){
                    location.href="examResult.html?mkid="+data.mkid+"&mark=all&mkscoreid="+data.mkscoreid;
                }else if(data.hrefType == 5){
                    //subject="zhongduan"
                    //$scope.break='1';
                    location.href='examTest.html?&subject=zhongduan&break=1&breakStartTime='+data.breakStartTime+'&mkid='+mkid+'&step='+step+'&mkscoreid='+mkscoreid+'&first=&breaktime='+breaktime+'&startTime='+startTime+'&mkid='+mkid+'&mark='+mark+'';
                }else if(data.hrefType == 6){
                    //location.href="examResult.html?mkid="+data.mkid;
                } else {
                    $scope.subject = data.subject;
                    if(typeof(data.data)=='undefined'){/*sectiontype不存在*/
                        if($scope.subject=='subject'){
                            $("#testBox").hide();
                            $("#breakBox").show();
                            countDown();
                        }else{
                            $("#testBox").show();
                            $("#breakBox").hide();
                        }
                    }else{
                        $scope.hour = data.mktime.hour;
                        $scope.minute = data.mktime.minute;
                        $scope.second = data.mktime.second;
                        $scope.lasttime = data.mktime.lasttime;
                        $scope.sectiontype = data.data.sectiontype;
                        //$scope.sectiontype = 'undefined';
                        $scope.subjecttype = data.data.subjecttype;
                        var regExp = new RegExp("files|/files", 'g');
                        $scope.questionarticle = $sce.trustAsHtml(data.data.questionarticle);
                        $scope.question = $sce.trustAsHtml(data.data.question.replace(regExp,'http://www.gmatonline.cn/files'));
                        $scope.qslctarr = data.data.qslctarr;
                        $scope.qallnum = data.qallnum;
                        $scope.qnyesum = data.qnyesum;
                        //$scope.subject = 'subject';
                        for(var i=0;i<$scope.qslctarr.length;i++){
                            $scope.qslctarr[i].select=$sce.trustAsHtml(data.data.qslctarr[i].select);
                        }

                        if($scope.subject){
                            if($scope.sectiontype!=10&& $scope.sectiontype!=7&& $scope.sectiontype!=11&&$scope.subject=='subject'){/*sectiontype存在*/
                                $("#testBox").hide();
                                $("#breakBox").show();
                                countDown($scope.subject);
                            }else{
                                $("#testBox").show();
                                $("#breakBox").hide();
                            }
                        }

                        if ($scope.subjecttype == 5 && $scope.sectiontype == 7) {
                            $(".readArticle").show();
                        }

                        $(".totalTime").html($scope.hour + ":" + $scope.minute + ":" + $scope.second);
                        keepTime($scope.hour, $scope.minute, $scope.second, $scope.lasttime,$scope.subject);

                        //需要传进下面函数的值
                        $scope.questionids = data.data.questionid;
                        $scope.twoobjecttypes = data.data.twoobjecttype;
                        $scope.sectiontypes = data.data.sectiontype;
                        $scope.oneobjecttypes = data.data.oneobjecttype;
                        $scope.subjecttypes = data.data.subjecttype;
                        $scope.steps = data.step;
                        $scope.marks = data.mark;
                    }

                }

            }
            $scope.jumpBreak = function () {
                var mkid=sessionStorage.getItem("mkid");
                var startTime=sessionStorage.getItem("startTime");
                var breaktime=sessionStorage.getItem("breaktime");
                var mkscoreid=sessionStorage.getItem("mkscoreid");
                location.href='examTest.html?&breakStartTime=&subject=yuwen&break=&first=&startTime='+startTime+'&breaktime='+breaktime+'&readqid=&mkid='+mkid+'&step=&mkscoreid='+mkscoreid+'&mark=all';
            };

        });



    }]);

});
//选择答案
function chooseAnswer(o){
    $(o).addClass("blue").siblings().removeClass("blue");
}
var timeout=false;
//倒计时
function keepTime(h,m,s,lasttime,subj){
    var sStr='',mStr='',hStr='';
    var timer=setInterval(function(){
        if (lasttime < 1) {
                timeout=true;
                ckanswer(subj);
            clearInterval(timer);//停止循环
        }
        if(h==0&&m==0&&s==0){
            clearInterval(timer);
        }

        if(s==0){
            m--;
            s=59;
        }
        s--;
        if(m==0){
            h--;
            m=59;
        }
        if(s<10){
            sStr=s;
        }else{
            sStr=s;
        }
        if(m<10){
            mStr=m;
        }else{
            mStr=m;
        }
        if(h<10){
            //hStr="0"+h;
            hStr=h;
        }else{
            hStr=h;
        }
        $(".totalTime").html(hStr+":"+mStr+":"+sStr);
    },1000);
}

function dian_yes(useranswer) {
    if(useranswer){
        var useranswer_mk = useranswer;
    }else{
        var useranswer_mk = '';
    }
    subanswer(useranswer_mk);
}
var starTime = parseInt(new Date().getTime()/1000);
function subanswer(useranswer_mk) {
    var endTime=parseInt(new Date().getTime()/1000);
    var duration = (endTime - starTime);
    var userId=sessionStorage.getItem("userId");
    var checke=$("#show_answer").attr("checked");
    var mark=$("#marks").val();
    var Request=GetRequests();
    var mkid=Request['mkid'];
    var subject=Request['subject'];
    var stop=Request['break'];
    var breakStartTime=Request['breakStartTime'];
    var mklct=sessionStorage.getItem("mklct");
    var mklct_qids=sessionStorage.getItem("mklct_qids");
    var qnonum=sessionStorage.getItem("qnonum");
    var qnonids=sessionStorage.getItem("qnonids");
    var readqid=sessionStorage.getItem("readqid");
    var startTime=sessionStorage.getItem("startTime");
    var breaktime=sessionStorage.getItem("breaktime");
    var mkscoreid=sessionStorage.getItem("mkscoreid");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/zuoti_yes_ajax', // 跳转到 action
        data: {
            breaktime:breaktime,
            qnonids:qnonids,
            qnonum:qnonum,
            mkscoreid:mkscoreid,
            duration:duration,
            mklct:mklct,
            mkid:mkid,
            mklct_qids:mklct_qids,
            userid:userId,
            questionid: $("#questionids").val(),//问题ID
            twoobjecttype: $("#twoobjecttypes").val(),//来源ID
            sectiontype: $("#sectiontypes").val(),//分类ID
            oneobjecttype: $("#oneobjecttypes").val(),//类别
            subjecttype: $("#subjecttypes").val(),//科目
            stname: '',
            knows: '',//知道点ID
            step:$("#steps").val(),//做题状态ID
            useranswer: useranswer_mk,//用户答案
            mktime: '',//耗时
            /*breaktime: $("#breaktime").val(),*/
            checke: checke //传的值是字符型
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) { //alert(data.message);
            //console.log(data)
            location.href='examTest.html?&breakStartTime='+breakStartTime+'&subject='+subject+'&break='+stop+'&first=&startTime='+startTime+'&breaktime='+breaktime+'&readqid='+readqid+'&mkid='+mkid+'&step=&mkscoreid='+mkscoreid+'&mark='+mark+'';
            //if (data.mylogin == 'login') {
            //    window.location.replace('/exam/&mylogin=login');
            //} else {
            //    var o_url="";
            //    if($("#step").val()=='dofalse'){
            //        //o_url='examTest.html?next=1&step=dofalse';
            //    }else{
            //        if(mark=='all'){
            //            o_url='examTest.html?next=1&submark=subject&allmark=allmark&mark='+mark;
            //        }else{
            //            o_url='examTest.html?next=1&mark='+mark;
            //        }
            //    }
            //    window.location.replace(o_url);
            //}
        }
    });
}

//function getanswer() {
//    if ("{x2;$data['questiontype']}" == "1" || "{x2;$data['questiontype']}" == "4") {
//        var useranswer = $('input[name="question[{x2;$data['questionid']}]"]:checked').val();
//    } else {
//        var useranswer = [];
//        $('input[name="question[{x2;$data['questionid']}][{x2;v:key}]"]:checked').each(function () {
//            useranswer.push($(this).val());
//        });
//    }
//    if(useranswer=='undefined'||typeof(useranswer)=='undefined'){useranswer='';}
//    return useranswer;
//}

function ckanswer(subj) {
    var useranswer = $(".topic-con ul li.blue").attr("data-answer");
    var marksubject=subj;
    var mark=$("#marks").val();
    var breaktime=$("#breaktime").val();
    if(marksubject=='subject'){
        window.location.href="examTest.html?next=1&mark="+mark+"&submark=subject&breaktime=";
    }else{
        //alert(useranswer);
        if (useranswer == '' || typeof(useranswer) == 'undefined') {
            //alert("请选择答案");
            if(timeout){ //超时自动提交答案
                var useranswer = $(".topic-con ul li.blue").attr("data-answer");
                if(useranswer==''){ //答题超时，用户未选择答案则标识答案
                    useranswer='XX';
                }
               subanswer(useranswer);
            }else{
                alert('选择答案');
                return false;
            }

        } else {
//            clickTwoBtn("#myThink", "#think");
            dian_yes(useranswer);
        }
    }
}
function o(e){
    $(".btn_next").unbind('click',o);
    $(".btn_next").bind('click',ckanswer);
    window.location.replace(e.data.url);
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

