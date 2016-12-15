$(function () {
    //声明模块
    var myApp = angular.module("myApp", []);
    var Request = GetRequests();
    var type= Request['type'];
    var mkid= Request['mkid'];
    var mkscoreid= Request['mkscoreid'];
    var userId=localStorage.getItem("userId");
    if(type==1){
        $('.return').click(function(){
            location.href='examResult.html?type='+type+'&mkid='+mkid+'&mkscoreid='+mkscoreid+''
        })
    }
    if(type==2){
        $('.return').click(function(){
            location.href='examResult.html?mkid='+mkid+'&mkscoreid='+mkscoreid+'&type='+type+''
        })
    }
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/resultDetal',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid:userId,
                mkid: Request.mkid,
                mkscoreid: Request.mkscoreid,
                mark: Request.mark,
                section:Request.section
            }
        }).success(function (data) {
            console.log(data);
            if (data.userCode == 0) {
                //location.href = "login.html";
            } else {
                $scope.type=type;
                $scope.mkscoreid=mkscoreid;
                $scope.name = data.mkinfo.name;
                $scope.mkid = data.mkid;
                $scope.id = data.mkinfo.id;
                $scope.mark = data.mark;
                $scope.section = data.section;
                $scope.subject = data.subject;
                $scope.questionrecord = data.questionrecord;
                for (var i = 0; i < $scope.questionrecord.length; i++) {
                    $scope.questionrecord[i].questiontitle = $sce.trustAsHtml(data.questionrecord[i].questiontitle);
                }
                if (data.VerbalNum != 0 && data.QuantNum == 0) {//语文
                    $scope.disV = 'disShow';
                    $scope.disQ = '';
                    if ($scope.subject == '5') {
                        $scope.onV01 = 'on';
                    } else if ($scope.section == '6') {
                        $scope.onV02 = 'on';
                    } else if ($scope.section == '8') {
                        $scope.onV03 = 'on';
                    } else if ($scope.section == '7') {
                        $scope.onV04 = 'on';
                    }
                } else if (data.VerbalNum == 0 && data.QuantNum != 0) {//数学
                    $scope.disV = '';
                    $scope.disQ = 'disShow';
                    if ($scope.subject == '6') {
                        $scope.onQ01 = 'on';
                    } else if ($scope.section == '5') {
                        $scope.onQ02 = 'on';
                    } else if ($scope.section == '4') {
                        $scope.onQ03 = 'on';
                    }
                } else if (data.VerbalNum != 0 && data.QuantNum != 0) {//全套
                    $scope.disV = 'disShow';
                    $scope.disQ = 'disShow';
                }

                if ($scope.mark == 'verbal' || $scope.mark == 'quant' || $scope.mark == 'all') {
                    $scope.twoLC = 'on';
                } else if ($scope.mark == 'yesfalse') {
                    $scope.twoLC02 = 'on';
                }
                else if ($scope.mark == 'long_time') {
                    $scope.twoLC03 = 'on';
                }

            }

        });

    }]);

});