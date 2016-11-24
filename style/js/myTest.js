$(function(){
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        var userId=sessionStorage.getItem("userId");
        //题库
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                userid:userId,
                twoId:12,
                secId:6
            }
        }).success(function(data) {
            console.log(data)
            $scope.items4 = data.data;
            if(data.userData==false){
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});
            }else{
                $scope.nickname = data.userinfo.nickname;
                $scope.photo = data.userinfo.photo;
            }

        });

    }]);


});

//点击题库一级导航
function changeLowerOne(o){
    var one=$(".threeLevel .borderDiv.on").attr("data-id");
    var two=$(o).attr("data-id");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku2',
        data: {
            twoId:one,
            secId:two
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        beforeSend:function(){

        },
        success: function (data) {
            $(o).addClass('on').siblings().removeClass('on');
            //if(data.code ==1){
            SpellCharacters(data,one);
            //}
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}
//拼字符串
function SpellCharacters(data,strName){
    var str='',strn='';
    var nameDiff=$(".greyNav ul li.on").find(".col-xs-2").html();
    if(strName=='12'){
        strn='讲义';
    }else if(strName=='1,15'){
        strn='OG';
    }else if(strName=='8,10,11'){
        strn='PREP';
    }else{
        strn='GWD';
    }
    $('.questionList').empty();
    str+='<ul>';
    $.each(data,function(k,v) {
        str+='<li>'+
        '<a href="practice.html?&articletitle=&knowName='+strn+'-'+nameDiff+'&tikuId='+v.stid+'&type=1">'+
        '<div class="col-xs-10 col-sm-10">'+
        '<h4>'+strn+'-'+nameDiff+'：'+ v.stname+'</h4>'+
        '<p>题目总数：20 平均正确率：24%</p>'+
        '</div>'+
        '<div class="col-xs-2 col-sm-2 rightA">'+
        '<img src="style/images/practice_jiantou.png" alt="箭头图标" class="jian">'+
        '</div>'+
        '<div class="clearBox"></div>'+
        '</a>'+
        '</li>';
    });
    str+='</ul>';

    $(".dataShow").html(str);

}

//点击题库二级导航
function changeLowerTwo(o){
    var one=$(o).attr("data-id");
    var two=$(".greyNav ul li.on").attr("data-id");
    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/tiku2',
        data: {
            twoId:one,
            secId:two
        },
        type: 'post',
        cache: false,
        dataType: 'json',
        beforeSend:function(){

        },
        success: function (data) {
            $(o).addClass('on').parent().siblings().find(".borderDiv").removeClass('on');
            //if(data.code ==1){
            SpellCharacters(data,one);
            //}
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}