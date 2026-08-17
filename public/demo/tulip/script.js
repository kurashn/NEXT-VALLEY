document.addEventListener('DOMContentLoaded', function() {

    // ハンバーガーメニュー
    var menuButton = document.getElementById("menuButton");
    if (menuButton) {
        menuButton.addEventListener("click", function() {
            this.classList.toggle("active");
            document.getElementById("navsp").classList.toggle("active");
            document.getElementById("mask").classList.toggle("active");
        });
    }

    // クラス案内(スマホ)の開閉
    var parentMenu = document.querySelectorAll(".class-about > li > a");
    for (var i = 0; i < parentMenu.length; i++) {
        parentMenu[i].addEventListener("click", function(e) {
            e.preventDefault();
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("active");
        });
    }

    // スクロールで要素をふわっと表示
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
        reveals.forEach(function(el) { io.observe(el); });
    } else {
        reveals.forEach(function(el) { el.classList.add("is-in"); });
    }

    // スクロール後に固定ナビを出す / ハンバーガーの色を切り替える
    var siteNav = document.getElementById("siteNav");
    var header = document.querySelector("header");
    var threshold = 120;
    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        var limit = header ? Math.max(header.offsetHeight - 80, threshold) : threshold;
        var scrolled = y > limit;
        if (siteNav) siteNav.classList.toggle("is-show", scrolled);
        document.body.classList.toggle("is-scrolled", y > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

});
