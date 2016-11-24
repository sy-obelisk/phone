$(function(){
    //TouchSlide({ slideCell:"#slidePop",effect:"left"});
    TouchSlide( { slideCell:"#tabBox1",
        endFun:function(i){ //高度自适应
            var bd = document.getElementById("tabBox1-bd");
            bd.parentNode.style.height = bd.children[i].children[0].offsetHeight+"px";
            if(i>0)bd.parentNode.style.transition="200ms";//添加动画效果
        }

    } );
    //    弹窗居中
    $(".warn-center").css({
        marginLeft:"-"+parseInt($(".warn-center").css("width"))/2+"%"
    });
});

function slideFont(o){
    var htmls= $(o).find("a").html();
    $(o).parent("ul").siblings(".putV").html(htmls);
}

function showNext(o){
    //$(o).parents(".con").hide().next(".con").show();
    //IE
    if(document.all) {
        document.getElementById("next").click();
    }
// 其它浏览器
    else {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        document.getElementById("next").dispatchEvent(e);
    }
}
function showPrev(o){
    //$(o).parents(".con").hide().next(".con").show();
    //IE
    if(document.all) {
        document.getElementById("prev").click();
    }
// 其它浏览器
    else {
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        document.getElementById("prev").dispatchEvent(e);
    }
}


function subStudy(){
    var names=$("#myName").val();
    var phone=$("#myPhone").val();
    var country=$("#country").html();
    var subject=$("#subject").val();
    var studyL=$("#studyL").html();
    var mySubject=$("#mySubject").val();
    var outCountry=$("#outCountry").val();
    var language=$("#language").val();
    var gpa=$("#gpa").val();
    var otherInfo=$("#otherInfo").val();

      if(!names||!phone||!country||!subject||!studyL||!mySubject||!outCountry||!language||!gpa){
          alert("请把信息填写完整，注意必填项！");
          $("#warns").modal('hide');
          return false;
      }

    $.ajax({
        url: 'http://www.gmatonline.cn/index.php?web/appapi/addContent',
        type: 'post',
        data:{
            catId:237,
            name:names,
            extend:[phone,country,subject,studyL,mySubject,outCountry,language,gpa,otherInfo]
        },
        //jsonp:'callback',
        dataType: 'json',
        success: function (data) {
            if(data.code==1){
                alert("提交成功");
                location.href="navList.html";
            }
        },
        error: function () {
            alert("网络通讯失败");
        }
    });

}