//获取页面参数
var Request=GetRequests();
var kzid=Request['kzid'];
var cptime=Request['cptime'];
console.log(kzid,cptime)
$(function(){

    if(kzid==68){//600以下
        $("#source").html('题目来源：OG15/精选题库  <br/> 题目难度：600-650测试学员词汇积累，语法基础，商科思维，数学基础');
    }else if(kzid==70){//700以下
        $("#source").html('题目来源：OG15/PREP/GWD <br/> 题目难度：700-730遇见你想象的700+');
    }else if(kzid==69){//650以下
        $("#source").html('题目来源：OG15/PREP <br/> 题目难度：650-700测试学员词汇积累，语法基础，长难句，商科思维，数学基础');
    }else if(kzid==66){//未考过GMAT，无
        $("#source").html('题目来源：精选题库 <br/> 题目难度：600以下测试学员英语基础，词汇积累，数学词汇');
    }else if(kzid==67){//未考过GMAT，有
        $("#source").html('题目来源：OG15 <br/> 题目难度：600以下测试学员英语基础，词汇积累，数学基础');
    }

});

function locA(){
    location.href="evaluationStart.html?kzid="+kzid+"&cptime="+cptime;
}