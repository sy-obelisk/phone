$(function(){
    //获取页面参数
    var Request=GetRequests();
    var cihuis=Request['cihui'];
    var sccrs=Request['sccr'];
    var quss=Request['qus'];
    //词汇
    if(cihuis>=0&&cihuis<=90){
        $(".contList ul li:first-child").find("p").html('Hello，hello，看得懂吗？词汇部分有点弱哎，' +
        '后面的题目是不是看得很费劲？抓紧时间背单词吧~建议每天花费2个小时来背单词哦~《托福词汇》、《GMAT精选词汇》都可以看呢。');
    }else if(cihuis>=91&&cihuis<=120){
        $(".contList ul li:first-child").find("p").html('hello，词汇这个部分稍微有点问题，这会对你后期的做题速度产生非常大的影响。由于自身词汇量不够，' +
        '在看题目的时候也会很迷茫，所以建议每天还是花费2个小时来背一下单词，可以过一下《GMAT精选词汇》。');
    }else if(cihuis>=121&&cihuis<=145){
        $(".contList ul li:first-child").find("p").html('Hello，题目做起来是不是经常感觉模棱两可的？没错，就是因为词汇这一部分的很多释义还存在小问题，包括固定搭配，' +
        '那这些都会影响对题目的理解，所以，还是再过一遍《GMAT精选词汇》吧~知道你不想背，可是还得背~每天就背半个小时到1个小时之间吧');
    }else if(cihuis>=146&&cihuis<=170){
        $(".contList ul li:first-child").find("p").html('哎哟，不错哦~基本词汇都过关了~如果你觉得我们测得刚好都是你会的，' +
        '那你可以再过一遍《GMAT精选词汇》，不然的话，就只需要积累平时做题不认识的单词就ok了。');
    }
//sc/cr
    if(sccrs>=0&&sccrs<=150){
        $(".contList ul li:nth-child(2)").find("p").html('语文部分呢，做对的最多不过三道题~那除了词汇这一部分造成的理解上的影响，' +
        '就是语法这一部分了。赶快抓紧时间，燃烧吧~干掉万恶语法！建议看《张道真实用英语语法》，再配合雷哥GMAT课程即可。');
    }else if(sccrs>=151&&sccrs<=250){
        $(".contList ul li:nth-child(2)").find("p").html('语文部分呢，还可以，不过想要得高分呢，就还得继续努力了！除了基本的词汇，语法也是很重要呢~是不是觉得很多题目意思我都理解了，但是做起来就感觉很棘手呢？即使有些千辛万苦的做完了，却发现人家考查的根本不是这个点！所以说，熟悉GMAT考点很重要哦~！' +
        '除了《长难句解析》要看，《OG》也是必看的哦。每天看个1个小时左右的难句解析，再配合做题就行。自觉费力者，可参加雷哥GMAT课程叫老师带你学~');
    }else if(sccrs>=251&&sccrs<=350){
        $(".contList ul li:nth-child(2)").find("p").html('语文部分的呢，还不错，基本考点都可以找到，不过稍微复杂一点的就可能找不到。做错的部分很大一部分原因应该就是简简单单的不会。' +
        '所以建议通过做题直接来查找自己的问题。题目可以做《OG》，考点方法可以从雷哥GMAT知识点板块进行查找。');
    }else if(sccrs>=351&&sccrs<=405){
        $(".contList ul li:nth-child(2)").find("p").html('语文部分呢，可以说做的很赞啦~可以好好研究下导致自己错误的原因是什么？如果是题目没看懂造成的，那基本语法和词汇都要小心咯；如果是知识点的模棱两可，还用我说吗？赶快端本语法书看起来吧！' +
        '建议看《Manhattan SC》和《OG》。每天学个5、6个小时的verbal就可以了。自觉费力者，可参加雷哥GMAT课程。');
    }

    //数学
    if(quss>=0&&quss<=100){
        $(".contList ul li:nth-child(3)").find("p").html('最后，我们来说说数学部分，难吗？作为中国考生，要是题目都看得懂，那得这个分数可有点说不过去了~赶快端起高中数学书，' +
        '好好再学一遍~！之后再配合《数学高分突破》学习一下，可事半功倍！另外，雷哥GMAT里也有数学课程哦~');
    }else if(quss>100&&quss<=150){
        $(".contList ul li:nth-child(3)").find("p").html('最后，我们来说说数学部分，难吗？应该不难吧……好好想想问题出在哪里，可千万不' +
        '要是在读题上出现问题……词汇、语法、数学知识点，傻傻分不清楚。雷哥GMAT数学会帮你把一切理清楚。建议针对数学这部分每天复习2~3个小时左右。');
    } else if(quss>150&&quss<=200){
        $(".contList ul li:nth-child(3)").find("p").html('最后，说下数学，虽然数学只错了一道题，但整体而言，错误率还是高达20%。要知道数学的容错率只有10%，想要在37道题里，' +
        '只错2、3道还是挺难得。复习过程中，一定要找到自己的弱项是哪里，GMAT数学的考点在哪里，从而保证GMAT数学不拉分。');
    }else if(quss>200&&quss<=225){
        $(".contList ul li:nth-child(3)").find("p").html('最后，我们来说说数学部分，简单吧？可千万不要掉以轻心~如果GMAT想得高分，' +
        '数学必须给力，然而想要达到满分还是很难的。建议从现在开始就做GMAT数学真题，每天搞定50题，轻松应对GMAT数学~');
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