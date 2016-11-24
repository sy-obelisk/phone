/**
 * Created by Administrator on 2016/9/6.
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>768){
                docEl.style.fontSize = '20px';
            }else{
                docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
            }
            //if (!clientWidth) return;
            //docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
            //console.log(40 * (clientWidth / 750))
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);




