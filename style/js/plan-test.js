/**
 * Created by Administrator on 2016/11/25.
 */
var userId = localStorage.getItem("userId");
var wapUid = localStorage.getItem("wapUid");
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        $http({
            method: 'post',
            url: 'http://gossip.gmatonline.cn/cn/wap-api/gossip-list',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId,
                uid: wapUid,
                page: '1',
                pageSize: "1000"
            }
        }).success(function (data) {
            console.log(data);
            $scope.num = data.num;
            if ($scope.num == 0) {
                $(".hintWrap ").hide();
            } else {
                $(".hintWrap ").show();
            }
            $scope.items1 = data.data.data;
            for (var i = 0; i < $scope.items1.length; i++) {
                $scope.items1[i].content = $sce.trustAsHtml(escape2Html(emojione.toImage($scope.items1[i].content)));
                $scope.items1[i].title = $sce.trustAsHtml(escape2Html(emojione.toImage($scope.items1[i].title)));
                $scope.items1[i].count=$scope.items1[i].reply.length;
                for (var j = 0; j < $scope.items1[i].reply.length; j++) {
                    $scope.items1[i].reply[j].content = $sce.trustAsHtml(escape2Html(emojione.toImage($scope.items1[i].reply[j].content)));
                }


            }


        });

//        显示评论
        $(document).on("click", ".comment-icon", function () {
            var _this = $(this).parent();
            if (_this.hasClass("on")) {
                _this.removeClass("on");
                _this.next().fadeOut(200);
            } else {
                _this.addClass("on");
                _this.next().fadeIn();
            }

        })
    }]);

    //点赞
    $(document).on('click', '.likeWrap', function () {
        $(this).addClass("onLike");
        $(this).parents("li").siblings("li").find(".likeWrap").removeClass("onLike");
        var gossipId=$(this).parent(".comment").find(".gossipId").val(); //帖子ID
        $.ajax({
            url:'http://gossip.gmatonline.cn/cn/wap-api/add-like',
            method:"POST",
            dataType:"json",
            data:{
                gossipId:gossipId,
                uid:wapUid,
            },
            success:function(data){
                alert(data.message);
                $('.onLike').find('.likeNum').html(data.likeNum);
            }
        })

    })


});





