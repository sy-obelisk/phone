$(function(){

});

//倒计时
function countDown(subj){
    var min=parseInt($("#minute").html());
    var sec=parseInt($("#second").html());
    var mins= 0,secs=0;
    var timer=setInterval(function(){
        if(sec==0){
            min--;
            sec=59;
        }else{
            sec--;
        }
        //倒计时结束，清除timer
        if(min==0 && sec==0){
            clearInterval(timer);
            ckanswer(subj);
        }
        if(mins<10){
            mins="0"+min;
        }else{
            mins=min;
        }
        if(sec<10){
            secs="0"+sec;
        }else{
            secs=sec;
        }

        $("#minute").html(mins);
        $("#second").html(secs);
    },1000);


}