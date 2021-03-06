$(function(){
    //获取页面参数
    var Request=GetRequests();
    var totalSs=Request['totalS'];
    if(totalSs>=0&&totalSs<=200){
        //预备
        $(".haveBG").find("h1").html("20周");
        $(".contList ul li:first-child").find("h4 span").html('5周');
        $(".contList ul li:first-child").find("p").html('1.扩大词汇量：每天背诵200~300个单词； ' +
        '<br/>2.提升语法基础：语法基础薄弱建议看《张道真实用英语语法》，复习语法知识点，每天2~3个小时；' +
        ' <br/>3.逻辑思维训练：可以报一些和逻辑相关的课程或者到社区下载雷哥GMAT逻辑音频课程，提升自己的商科思维能力，' +
        '快速入门； <br/>4.提升数学基础：高中数学知识点回顾，建议每天复习2~3个小时（知识点在讲义数学章以及官方指南数学章都有提及）；' +
        ' <br/>5.零碎时间看the economist。');
        //基础
        $(".contList ul li:nth-child(2)").find("h4 span").html('6周');
        $(".contList ul li:nth-child(2)").find("p").html('1.上课，或者看OG上对GMAT的介绍，了解考试内容及方式； ' +
        '<br/>2.做OG各个部分。每天每部分至少20道题目，并对错题进行总结分析； <br/>3.熟悉做题过程中遇到的生词。');
        //提升
        $(".contList ul li:nth-child(3)").find("h4 span").html('5周');
        $(".contList ul li:nth-child(3)").find("p").html('1.查遗补缺，复习OG做题，保证每道题不会再错；'+
        '<br/>2.定时定量训练。计时做题，题目可以从雷哥GMAT题库上查找。每天每部分做2个小组为佳，注意分析'+
        '错题原因并总结方法；'+
    '<br/>3.这期间以语法为主，一定要按照逻辑语义为王的思路做题。其次重点在逻辑上。阅读主要是'+
        '以理解文章的方法为主。讲义后面的数学＋og的数学也要看一下，尽快对所考的数学知识点查漏补'+
        '缺。额外时间，根据自己的情况刷单词，解析长难句。（长难句的解析并不是只是看书，而是要自'+
        '己解析句子，将自己的解析和正确解析进行对比，找到自己错误的原因，这对句子改错的复习帮助'+
        '非常大）。');
        //冲刺
        $(".contList ul li:nth-child(4)").find("h4 span").html('4周');
        $(".contList ul li:nth-child(4)").find("p").html(' 1.这期间要求的是官方指南的每一个题目都要弄明白错误选项的错误原因；'+
        '<br/>2.换库后，开始做机经；'+
    '<br/>3.模考，整套整套的去做，调整pace。每天在雷哥GMAT做一套模考，含数学部分。针对自己模拟考中的'+
        '各部分正确率来决定单项复习哪一块。如果句子改错的正确率不到85%，需要在模考后额外做出20个'+
        '句子改错的题目（即分析100个错误选项），可以在prep，语法大全987中找语法题目来'+
        '做。逻辑的正确率达不到75%，需要在模考后额外做出10个逻辑，材料可以在曼哈顿，prep'+
                           ' ，verbal分册中找。阅读的正确率相信会达到60%的。');
    }else if(totalSs>200&&totalSs<=350){
        $(".haveBG").find("h1").html("16周");
        $(".contList ul li:first-child").find("h4 span").html('4周');
        $(".contList ul li:first-child").find("p").html('1.扩大词汇量：每天背诵200~300个单词； ' +
        '<br/>2.提升语法基础：语法基础薄弱建议看《张道真实用英语语法》，复习语法知识点，每天2~3个小时；' +
        ' <br/>3.逻辑思维训练：可以报一些和逻辑相关的课程或者到社区下载雷哥GMAT逻辑音频课程，提升自己的商科思维能力，' +
        '快速入门； <br/>4.提升数学基础：高中数学知识点回顾，建议每天复习2~3个小时（知识点在讲义数学章以及官方指南数学章都有提及）；' +
        ' <br/>5.零碎时间看the economist。');

        $(".contList ul li:nth-child(2)").find("h4 span").html('6周');
        $(".contList ul li:nth-child(2)").find("p").html('1.上课，或者看OG上对GMAT的介绍，了解考试内容及方式； ' +
        '<br/>2.做OG各个部分。每天每部分至少20道题目，并对错题进行总结分析； <br/>3.熟悉做题过程中遇到的生词。');

        //提升
        $(".contList ul li:nth-child(3)").find("h4 span").html('3周');
        $(".contList ul li:nth-child(3)").find("p").html('1.查遗补缺，复习OG做题，保证每道题不会再错；'+
        '<br/>2.定时定量训练。计时做题，题目可以从雷哥GMAT题库上查找。每天每部分做2个小组为佳，注意分析'+
        '错题原因并总结方法；'+
        '<br/>3.这期间以语法为主，一定要按照逻辑语义为王的思路做题。其次重点在逻辑上。阅读主要是'+
        '以理解文章的方法为主。讲义后面的数学＋og的数学也要看一下，尽快对所考的数学知识点查漏补'+
        '缺。额外时间，根据自己的情况刷单词，解析长难句。（长难句的解析并不是只是看书，而是要自'+
        '己解析句子，将自己的解析和正确解析进行对比，找到自己错误的原因，这对句子改错的复习帮助'+
        '非常大）。');
        //冲刺
        $(".contList ul li:nth-child(4)").find("h4 span").html('3周');
        $(".contList ul li:nth-child(4)").find("p").html(' 1.这期间要求的是官方指南的每一个题目都要弄明白错误选项的错误原因；'+
        '<br/>2.换库后，开始做机经；'+
        '<br/>3.模考，整套整套的去做，调整pace。每天在雷哥GMAT做一套模考，含数学部分。针对自己模拟考中的'+
        '各部分正确率来决定单项复习哪一块。如果句子改错的正确率不到85%，需要在模考后额外做出20个'+
        '句子改错的题目（即分析100个错误选项），可以在prep，语法大全987中找语法题目来'+
        '做。逻辑的正确率达不到75%，需要在模考后额外做出10个逻辑，材料可以在曼哈顿，prep'+
        ' ，verbal分册中找。阅读的正确率相信会达到60%的。');


    }else if(totalSs>350&&totalSs<=500){
        $(".haveBG").find("h1").html("14周");
        $(".contList ul li:first-child").find("h4 span").html('3周');
        $(".contList ul li:first-child").find("p").html(' 1.扩大词汇量：每天背诵200~300个单词；<br/>2.提升语法基础：语法基础薄弱建议看《张道真实用英语语法》' +
        '，复习语法知识点，每天2~3个小时； <br/>3.逻辑思维训练：可以报一些和逻辑相关的课程或者到社区下载雷哥GMAT逻辑音频课程，' +
        '提升自己的商科思维能力，快速入门； <br/>4.提升数学基础：高中数学知识点回顾，建议每天复习2~3个小时' +
        '（知识点在讲义数学章以及官方指南数学章都有提及）。');

        $(".contList ul li:nth-child(2)").find("h4 span").html('5周');
        $(".contList ul li:nth-child(2)").find("p").html(' 1.上课，或者看OG上对GMAT的介绍，了解考试内容及方式； <br/>' +
        '2.做OG各个部分。每天每部分至少20道题目，并对错题进行总结分析； <br/>3.熟悉做题过程中遇到的生词。');

//提升
        $(".contList ul li:nth-child(3)").find("h4 span").html('3周');
        $(".contList ul li:nth-child(3)").find("p").html('  1. 查遗补缺，复习OG做题，保证每道题不会再错，每道题至少做2遍；'+
        '<br/>2. 定时定量训练。计时做题，题目可以从prep上查找。每天每部分做2个小组为佳，注意分析'+
       ' 错题原因并总结方法；'+
    '<br/>3.这期间以语法为主，一定要按照逻辑语义为王的思路做题。其次重点在逻辑上。阅读主要是'+
        '以理解文章的方法为主。讲义后面的数学＋og的数学也要看一下，尽快对所考的数学知识点查漏补'+
        '缺。额外时间，根据自己的情况刷单词，解析长难句。（长难句的解析并不是只是看书，而是要自'+
        '己解析句子，将自己的解析和正确解析进行对比，找到自己错误的原因，这对句子改错的复习帮助'+
        '非常大）。');
        //冲刺
        $(".contList ul li:nth-child(4)").find("h4 span").html('3周');
        $(".contList ul li:nth-child(4)").find("p").html('  1.这期间要求的是官方指南的每一个题目都要弄明白错误选项的错误原因；'+
        '<br/>2.换库后，开始做机经；'+
    '<br/>3.模考，整套整套的去做，调整pace。每天在雷哥GMAT做一套模考，含数学部分。针对自己模拟考中的'+
        '各部分正确率来决定单项复习哪一块。如果句子改错的正确率不到85%，需要在模考后额外做出20个'+
        '句子改错的题目（即分析100个错误选项），可以在prep，语法大全987中找语法题目来'+
        '做。逻辑的正确率达不到75%，需要在模考后额外做出10个逻辑，材料可以在曼哈顿，prep，'+
                            'verbal分册中找。阅读的正确率相信会达到60%的。');


    }else if(totalSs>500&&totalSs<=650){
        $(".haveBG").find("h1").html("90天");
        $(".contList ul li:first-child").find("h4 span").html('20天');
        $(".contList ul li:first-child").find("p").html('    1.扩大词汇量：每天背诵100个单词，包括数学词汇；' +
        ' <br/>2.提升语法基础：看Manhattan SC部分，系统复习语法考点，一定要按照逻辑语义为王的思路做题，每天2~3个小时' +
        '； <br/>3.提升数学基础：雷哥GMAT讲义后面的数学＋og的数学也要看一下，尽快对所考的数学知识点查漏补缺。，建议每天复习2~3个小时。');

        $(".contList ul li:nth-child(2)").find("h4 span").html('28天');
        $(".contList ul li:nth-child(2)").find("p").html('  1.上课，或者看OG上对GMAT的介绍，了解考试内容及方式； <br/>2.做OG各个部分。' +
        '每天每部分至少20道题目，并对错题进行总结分析； <br/>3.熟悉做题过程中遇到的生词；');

//提升
        $(".contList ul li:nth-child(3)").find("h4 span").html('22天');
        $(".contList ul li:nth-child(3)").find("p").html('   1. 查遗补缺，复习OG做题，保证每道题不会再错；'+
        '<br/>2. 定时定量训练。计时做题，题目可以从prep上查找。每天每部分做2个小组为佳，注意分析'+
        '错题原因并总结方法；'+
    '<br/>3.这期间以语法为主，一定要按照逻辑语义为王的思路做题。其次重点在逻辑上。阅读主要是'+
        '以理解文章的方法为主。讲义后面的数学＋og的数学也要看一下，尽快对所考的数学知识点查漏补'+
        '缺。额外时间，根据自己的情况刷单词，解析长难句。（长难句的解析并不是只是看书，而是要自'+
        '己解析句子，将自己的解析和正确解析进行对比，找到自己错误的原因，这对句子改错的复习帮助'+
        '非常大）。');
        //冲刺
        $(".contList ul li:nth-child(4)").find("h4 span").html('20天');
        $(".contList ul li:nth-child(4)").find("p").html('1.这期间要求的是官方指南的每一个题目都要弄明白错误选项的错误原因；'+
        '<br/>2.换库后，开始做机经；'+
    '<br/>3.模考，整套整套的去做，调整pace。每天在雷哥GMAT做一套模考，含数学部分。针对自己模拟考中的'+
        '各部分正确率来决定单项复习哪一块。如果句子改错的正确率不到85%，需要在模考后额外做出20个'+
        '句子改错的题目（即分析100个错误选项），可以在prep，语法大全987中找语法题目来'+
        '做。逻辑的正确率达不到75%，需要在模考后额外做出10个逻辑，材料可以在曼哈顿，prep'+
                            '，verbal分册中找。阅读的正确率相信会达到60%的。');

    }else if(totalSs>650&&totalSs<=800){
        $(".haveBG").find("h1").html("45天");
        $(".contList ul li:first-child").find("h4 span").html('5天');
        $(".contList ul li:first-child").find("p").html(' 1. 扩大词汇量：浏览一遍词汇表，背诵不熟悉的单词，包括数学词汇； ' +
        '<br/>2. 提升语法基础：看Manhattan SC部分，系统复习语法考点，一定要按照逻辑语义为王的思路做题，每天2~3个小时；');

        $(".contList ul li:nth-child(2)").find("h4 span").html('21天');
        $(".contList ul li:nth-child(2)").find("p").html(' 1.上课，或者看OG上对GMAT的介绍，了解考试内容及方式； <br/>2.做OG各个部分。' +
        '每天每部分至少20道题目，并对错题进行总结分析； <br/>3.熟悉做题过程中遇到的生词。');

//提升
        $(".contList ul li:nth-child(3)").find("h4 span").html('9天');
        $(".contList ul li:nth-child(3)").find("p").html(' 1. 查遗补缺，复习OG做题，保证每道题不会再错；'+
        '<br/>2. 定时定量训练。计时做题，题目可以从prep上查找。每天每部分做2个小组为佳，注意分析'+
        '错题原因并总结方法；'+
    '<br/>3.这期间以语法为主，一定要按照逻辑语义为王的思路做题。其次重点在逻辑上。阅读主要是'+
        '以理解文章的方法为主。讲义后面的数学＋og的数学也要看一下，尽快对所考的数学知识点查漏补'+
        '缺。额外时间，根据自己的情况刷单词，解析长难句。（长难句的解析并不是只是看书，而是要自'+
        '己解析句子，将自己的解析和正确解析进行对比，找到自己错误的原因，这对句子改错的复习帮助'+
        '非常大）。');
        //冲刺
        $(".contList ul li:nth-child(4)").find("h4 span").html('10天');
        $(".contList ul li:nth-child(4)").find("p").html('   1.这期间要求的是官方指南的每一个题目都要弄明白错误选项的错误原因；'+
        '<br/>2.换库后，开始做机经；'+
    '<br/>3.模考，整套整套的去做，调整pace。每天在雷哥GMAT做一套模考，含数学部分。针对自己模拟考中的'+
        '各部分正确率来决定单项复习哪一块。如果句子改错的正确率不到85%，需要在模考后额外做出20个'+
        '句子改错的题目（即分析100个错误选项），可以在prep，语法大全987中找语法题目来'+
       ' 做。逻辑的正确率达不到75%，需要在模考后额外做出10个逻辑，材料可以在曼哈顿，prep'+
                          '  ，verbal分册中找。阅读的正确率相信会达到60%的。');
    }
    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        //用户信息
        $http.post('http://www.gmatonline.cn/index.php?web/appapi/getUser').success(function(data) {
            if(data.userCode==1){
                $scope.nickname = data.userData.nickname;
                $scope.photo = data.userData.photo;
            }else{
                //头部个人中心图标未登陆点击跳转到登陆
                $("#personIcon").click(function(){location.href="login.html"});

            }
            //判断用户头像有没有
            var userImg=$("#userImg").attr("src");
            if(!userImg){
                $("#userImg").attr("src","style/images/userDefault.png");
            }
        });
    }]);



});