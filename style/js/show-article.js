/**
 * Created by Administrator on 2016/11/28.
 */
var Request = GetRequests();
var gossipId = Request['id'];
var userId = localStorage.getItem("userId");
var wapUid = localStorage.getItem("wapUid");
var username = localStorage.getItem("username");
var TyPe = '1';
var Bid = '';
var Bname = '';
$(function () {
    var myApp = angular.module("myApp", []);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
        //用户信息
        $http({
            method: 'post',
            url: 'http://www.gmatonline.cn/index.php?web/appapi/getUser',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userId: userId
            }
        }).success(function (data) {
            console.log(data);
            $scope.photo = data.userData.photo;
            if (data.userCode == 0) {
                $('#reply-img').attr('src', 'style/images/userDefault.png');
            } else {
                $('#reply-img').attr('src', 'http://www.gmatonline.cn/' + data.userData.photo + '');
            }
            sessionStorage.setItem("icon", data.userData.photo);
            sessionStorage.setItem("nickname", data.userData.nickname);

        });
        //帖子详情
        $http({
            method: 'post',
            url: 'http://gossip.gmatonline.cn/cn/wap-api/gossip-details',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userid: userId,
                uid: wapUid,
                gossipId: gossipId
            }
        }).success(function (data) {
            console.log(data);
            $scope.data = data;
            $scope.count=data.reply.length;
            $scope.content = $sce.trustAsHtml(escape2Html(emojione.toImage(data.content)));
            $scope.title = $sce.trustAsHtml(escape2Html(emojione.toImage(data.title)));
            for (var i = 0; i < $scope.data.reply.length; i++) {
                $scope.data.reply[i].content = $sce.trustAsHtml(escape2Html(emojione.toImage($scope.data.reply[i].content)));
            }
        });

        $scope.replyer = function (item,item2,item3) {
            $('#reply-int').attr('placeholder', '回复 ' + item + '').val('');
            TyPe = '2';
            Bid=item2;
            Bname=item3;
        };

    }]);

    //点赞
    $(document).on('click', '.likeWrap', function () {
        $(this).addClass("onLike");
        $(this).parents("li").siblings("li").find(".likeWrap").removeClass("onLike");
        var Request = GetRequests();
        var id = Request['id'];//帖子ID
        $.ajax({
            url:'http://gossip.gmatonline.cn/cn/wap-api/add-like',
            method:"POST",
            dataType:"json",
            data:{
                gossipId:id,
                uid:wapUid
            },
            success:function(data){
                alert(data.message);
                $('.onLike').find('.likeNum').html(data.likeNum);
                console.log(data)
            }
        })

    });


    //评论
    $('.article-wrap').on("click",function(){
        $('#reply-int').attr('placeholder', '我也说一句……').val('');
        TyPe='1';
    });

    $('.send').click(function () {
        console.log(TyPe,Bid,Bname);
        var Request = GetRequests();
        var id = Request['id'];
        var type = Request['type'];
        var gossipUser = Request['publisher'];
        var icon = sessionStorage.getItem('icon');
        var content = $('#reply-int').val();
        var uid = wapUid;
        var uName = sessionStorage.getItem('nickname');
        if (uid == null) {
            alert('请先登录');
            location.href='login.html';
        }
        if (uName == null) {
            uName = username;
        }
        if (TyPe==1){
            Bid=0;
            Bname='';
        }
        if (content == '') {
            alert('请输入评论内容')
        } else {
            $.ajax({
                method: "POST",
                url: 'http://gossip.gmatonline.cn/cn/wap-api/reply',
                data: {
                    content: content,
                    type: 1,
                    id: id,
                    gossipUser: gossipUser,
                    replyUser: Bid,
                    userImage: icon,
                    uName: uName,
                    replyUserName: Bname,
                    uid: uid,
                    belong: '1'
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 1) {
                        alert("评论成功");
                        location.reload();

                    }
                }

            })
        }

    });

});




