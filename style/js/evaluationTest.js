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
    var kzid=Request['kzid'];
    var cptime=Request['cptime'];
    var kzmark=Request['kzmark'];
    var userId=sessionStorage.getItem("userId");

    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http","$sce",function($scope,$http,$sce){
        //获取题目信息
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/zuoti',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                kzmark:kzmark,
                cptime:cptime,
                kzid:kzid
            }
        }).success(function(data) {
            console.log(data)
            if(data.userCode==0){
                //location.href="login.html";
            }else{
                if(data.hrefType==1){
                    location.href="evaluationTest.html?next=1";
                }else if(data.hrefType==2){
                    location.href="evaluationResult.html?kzid="+data.kzid;
                }
                $scope.questiontitle=$sce.trustAsHtml(data.data.questiontitle);
                $scope.qnum=data.qnum+1;
                $scope.qallnum=data.qallnum;
                $scope.qslctarr=data.data.qslctarr;
                $scope.cptime_m=data.cptime_m;
                $scope.cptime_s=data.cptime_s;
                $scope.kzid=data.kzid;
                $scope.kzmark=data.kzmark;
                $scope.step=data.step;
                $scope.kzid=data.kzid;
                $scope.questionid=data.data.questionid;
                $scope.twoobjecttype=data.data.twoobjecttype;
                $scope.oneobjecttype=data.data.oneobjecttype;
                $scope.sectiontype=data.data.sectiontype;
                if($scope.cptime_s==0){
                    $(".zhuan").html($scope.cptime_m + ": 0" + $scope.cptime_s);
                }else{
                    $(".zhuan").html($scope.cptime_m + ":" + $scope.cptime_s);
                }

                keepTime02(parseInt($scope.cptime_m),parseInt($scope.cptime_s));
                $scope.nextTest=function(){
                    subanswer();
                }
            }

        });


    }]);

});
//倒计时
function keepTime02(m,s){
    var sStr='',mStr='',totalS=0;
    var timer=setInterval(function(){
        totalS=m*60+s;
        $("#cptime").val(totalS);

        if(m==0&&s==0){
            clearInterval(timer);
        }
        if(s==0){
            m--;
            s=60;
        }
        s--;
        if(s<10){
            sStr="0"+s;
        }else{
            sStr=s;
        }
        if(m<10){
            mStr="0"+m;
        }else{
            mStr=m;
        }

        $(".zhuan").html(mStr+":"+sStr);
    },1000);
}
function subanswer() {
    var useranswer = $(".topic-con ul li.blue").attr("data-answer");
    $.ajax({
        url: 'http://www.gmatonline.cn/practise/zuoti_yes_ajax', // 跳转到 action
        data: {
            questionid: $("#questionid").val(),
            twoobjecttype: $("#twoobjecttype").val(),
            sectiontype: $("#sectiontype").val(),
            oneobjecttype: $("#oneobjecttype").val(),
            subjecttype: $("#subjecttype").val(),
            stname: $("#stname").val(),
            knows: $("#knowsid").val(),
            step:$("#step").val(),
            useranswer: useranswer,
            cptime:$("#cptime").val(),<!--Hugh  2015-6-24 修改 测评-->
            checke: false //传的值是字符型
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.mylogin == 'login') {
                window.location.replace('/practise/index&mylogin=login');
            } else {
                if($("#step").val()=='dofalse'){
                    o_url='evaluationTest.html?next=1&step=dofalse';
                }else{
                    o_url='evaluationTest.html?next=1';
                }
                window.location.replace(o_url);
            }
        }
    });
}
//选择答案
function chooseAnswer(o){
    $(o).addClass("blue").siblings().removeClass("blue");
}
