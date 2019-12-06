/*! smooth-scroll v15.1.0 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}if("function"==typeof window.CustomEvent)return!1;e.prototype=window.Event.prototype,window.CustomEvent=e})(),(function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var o=(new Date).getTime(),a=Math.max(0,16-(o-e)),r=window.setTimeout((function(){t(o+a)}),a);return e=o+a,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){return"querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype},o=function(){var e={};return Array.prototype.forEach.call(arguments,(function(t){for(var n in t){if(!t.hasOwnProperty(n))return;e[n]=t[n]}})),e},a=function(t){return!!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)},r=function(t){return parseInt(e.getComputedStyle(t).height,10)},i=function(e){var t;try{t=decodeURIComponent(e)}catch(n){t=e}return t},u=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t>=1&&t<=31||127==t||0===a&&t>=48&&t<=57||1===a&&t>=48&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(a):"\\"+n.charAt(a)}var u;try{u=decodeURIComponent("#"+r)}catch(e){u="#"+r}return u},c=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},l=function(t,n,o,a){var r=0;if(t.offsetParent)do{r+=t.offsetTop,t=t.offsetParent}while(t);return r=Math.max(r-n-o,0),a&&(r=Math.min(r,s()-e.innerHeight)),r},m=function(e){return e?r(e)+e.offsetTop:0},d=function(e,t){var n=t.speedAsDuration?t.speed:Math.abs(e/1e3*t.speed);return t.durationMax&&n>t.durationMax?t.durationMax:t.durationMin&&n<t.durationMin?t.durationMin:n},f=function(t){if(history.replaceState&&t.updateURL&&!history.state){var n=e.location.hash;n=n||e.pageYOffset,history.replaceState({smoothScroll:JSON.stringify(t),anchor:n||e.pageYOffset},document.title,n||e.location.href)}},h=function(e,t,n){t||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id)},p=function(t,n,o){0===t&&document.body.focus(),o||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))},g=function(t,n,o,a){if(n.emitEvents&&"function"==typeof e.CustomEvent){var r=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:a}});document.dispatchEvent(r)}};return function(r,y){var v,w,E,S,b,A,O={};O.cancelScroll=function(e){cancelAnimationFrame(A),A=null,e||g("scrollCancel",v)},O.animateScroll=function(n,a,r){var i=o(v||t,r||{}),u="[object Number]"===Object.prototype.toString.call(n),f=u||!n.tagName?null:n;if(u||f){var y=e.pageYOffset;i.header&&!S&&(S=document.querySelector(i.header));var w,E,b,C=m(S),I=u?n:l(f,C,parseInt("function"==typeof i.offset?i.offset(n,a):i.offset,10),i.clip),q=I-y,M=s(),F=0,L=d(q,i),x=function(t,o){var r=e.pageYOffset;if(t==o||r==o||(y<o&&e.innerHeight+r)>=M)return O.cancelScroll(!0),p(n,o,u),g("scrollStop",i,n,a),w=null,A=null,!0},H=function(t){w||(w=t),F+=t-w,E=F/parseInt(L,10),E=E>1?1:E,b=y+q*c(i,E),e.scrollTo(0,Math.floor(b)),x(b,I)||(A=e.requestAnimationFrame(H),w=t)};0===e.pageYOffset&&e.scrollTo(0,0),h(n,u,i),g("scrollStart",i,n,a),O.cancelScroll(!0),e.requestAnimationFrame(H)}};var C=function(t){if(!a()&&0===t.button&&!t.metaKey&&!t.ctrlKey&&"closest"in t.target&&(E=t.target.closest(r))&&"a"===E.tagName.toLowerCase()&&!t.target.closest(v.ignore)&&E.hostname===e.location.hostname&&E.pathname===e.location.pathname&&/#/.test(E.href)){var n=u(i(E.hash)),o=v.topOnEmptyHash&&"#"===n?document.documentElement:document.querySelector(n);o=o||"#top"!==n?o:document.documentElement,o&&(t.preventDefault(),f(v),O.animateScroll(o,E))}},I=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(v)){var t=history.state.anchor;t&&0!==t&&!(t=document.querySelector(u(i(history.state.anchor))))||O.animateScroll(t,null,{updateURL:!1})}};return O.destroy=function(){v&&(document.removeEventListener("click",C,!1),e.removeEventListener("popstate",I,!1),O.cancelScroll(),v=null,w=null,E=null,S=null,b=null,A=null)},O.init=function(a){if(!n())throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";O.destroy(),v=o(t,a||{}),S=v.header?document.querySelector(v.header):null,document.addEventListener("click",C,!1),v.updateURL&&v.popstate&&e.addEventListener("popstate",I,!1)},O.init(y),O}}));

// 锚点滚动
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    easing: 'easeInOutCubic',
    speedAsDuration: true,
    clip: true,
    updateURL: true,
    popstate: true,
    ignore: '.subscribe-button, .search-overlay-close'
})

// 阅读页面顶部进度条
var postProgressBar = function () {
    var progressBar = document.querySelector('progress')
    var header = document.querySelector('.floating-header')
    var title = document.querySelector('.post-full-title')
    var lastScrollY = window.scrollY
    var lastWindowHeight = window.innerHeight
    var ticking = false
    function onScroll() {
        lastScrollY = window.scrollY
        requestTick()
    }
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update)
        }
        ticking = true
    }
    function update() {
        var rect = title.getBoundingClientRect()
        var trigger = rect.top + window.scrollY
        var triggerOffset = title.offsetHeight + 35
        var lastDocumentHeight = document.body.offsetHeight
        var progressMax = lastDocumentHeight - lastWindowHeight

        if (lastScrollY >= trigger + triggerOffset) {
            header.classList.add('floating-active')
        } else {
            header.classList.remove('floating-active')
        }
        progressBar.setAttribute('max', progressMax)
        progressBar.setAttribute('value', lastScrollY)
        ticking = false
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    update()
}
postProgressBar()

// Toc
var tocBar = document.querySelector('.toc-bar ')
var tocOpen = document.querySelector('.toc-open')
var tocClose = document.querySelector('.toc-close')
var tocSwitch = document.querySelector('.toc-switch')
var tocMain = document.querySelector('.toc-main')
var tocWidth = window.getComputedStyle(tocMain).width.replace("px","")

if (window.screen.width >= '768' ) {
    tocBar.style.right = -tocWidth + 'px'
}

tocSwitch.addEventListener('click', function(){
    if (tocOpen.classList.contains('hide')) {
        if (window.screen.width >= '768' ) {
            tocBar.style.right = -tocWidth + 'px'
        } else {
            // 隐藏 toc
            tocBar.style.top = '100%'
        }
        tocClose.classList.add('hide')
        tocOpen.classList.remove('hide')
    } else {
        if (window.screen.width >= '768' ) {
            tocBar.style.right = 0
        } else {
            // 显示 toc
            tocBar.style.top = 0
        }
        tocOpen.classList.add('hide')
        tocClose.classList.remove('hide')
    }
});

// 移动设备下，点击关闭书签
var tocItem = document.querySelectorAll('.toc-link')
tocItem.forEach(function(toc) {
    toc.addEventListener('click', function(){
        if (window.screen.width < '768' ) {
            tocBar.style.top = '100%'
            tocClose.classList.add('hide')
            tocOpen.classList.remove('hide')
        }
    })
});

/*
* @Author: xzhih
* @Date:   2018-11-04 23:25:09
* @Last Modified by:   xzhih
* @Last Modified time: 2018-12-04 05:37:55
* 在非 service workers 场景下
*/

// 保存搜索数据
var keepSearchData = function (siteRoot) {
    fetch(siteRoot + 'searchData.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(resData) {
        localStorage.setItem('searchData', JSON.stringify(resData));
    })
}

// 检查和获取搜索数据
var checkAndGetData = function (siteRoot) {
    fetch(siteRoot + 'searchVersion.txt?t=' + (+new Date()))
    .then(function(response) {
        return response.text();
    })
    .then(function(resVersion) {
        if (localStorage.getItem('searchVersion') !== resVersion) {
            localStorage.setItem('searchVersion', resVersion);
            keepSearchData(siteRoot)
        }
    })
}

// 监听搜索
var searchFunc = function(siteRoot) {
    checkAndGetData(siteRoot)
    var localSearchData = localStorage.getItem("searchData");
    var datas = JSON.parse(localSearchData);
    var input = document.getElementById("local-search-input");
    if (!input) return;
    var resultContent = document.getElementById("local-search-result");
    input.addEventListener("input", function() {
        if (typeof(localSearchData) !== 'string') {
            localSearchData = localStorage.getItem("searchData");
            datas = JSON.parse(localSearchData);
        }
        printRs(this, datas, resultContent)
    });
};

// 监听搜索(SW)
var searchFuncSW = function(siteRoot) {
    fetch(siteRoot + 'searchData.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(resData) {
        var localSearchData = JSON.stringify(resData);
        var datas = JSON.parse(localSearchData);
        var input = document.getElementById("local-search-input");
        if (!input) return;
        var resultContent = document.getElementById("local-search-result");
        input.addEventListener("input", function() {
            printRs(this, datas, resultContent)
        });
    });
};

// 打印结果
var printRs = function (input, datas, resultContent) {
    var str = '<ul class="search-result-list">';
    var keywords = input.value.trim().toLowerCase().split(/[\s\-]+/);
    resultContent.innerHTML = "";
    if (input.value.trim().length <= 0) {
        return;
    }
    datas.forEach(function(data) {
        var isMatch = true;
        var content_index = [];
        if (!data.title || data.title.trim() === "") {
            data.title = "Untitled";
        }
        var data_title = data.title.trim().toLowerCase();
        var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
        var data_url = data.url;
        var index_title = -1;
        var index_content = -1;
        var first_occur = -1;
        if (data_content !== "") {
            keywords.forEach(function(keyword, i) {
                index_title = data_title.indexOf(keyword);
                index_content = data_content.indexOf(keyword);
                if (index_title < 0 && index_content < 0) {
                    isMatch = false;
                } else {
                    if (index_content < 0) {
                        index_content = 0;
                    }
                    if (i == 0) {
                        first_occur = index_content;
                    }
                }
            });
        } else {
            isMatch = false;
        }
        if (isMatch) {
            str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
            var content = data.content.trim().replace(/<[^>]+>/g, "");
            if (first_occur >= 0) {
                var start = first_occur - 20;
                var end = first_occur + 80;
                if (start < 0) {
                    start = 0;
                }
                if (start == 0) {
                    end = 100;
                }
                if (end > content.length) {
                    end = content.length;
                }
                var match_content = content.substr(start, end);
                keywords.forEach(function(keyword) {
                    var regS = new RegExp(keyword, "gi");
                    match_content = match_content.replace(regS, '<em class="search-keyword">' + keyword + "</em>");
                });
                str += '<p class="search-result">' + match_content + "...</p>";
            }
            str += "</li>";
        }
    });
    str += "</ul>";
    resultContent.innerHTML = str;
}