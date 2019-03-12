var box = document.getElementById("info-box");
var links = document.getElementsByTagName("a");
var articles = document.getElementsByTagName("article");
if (links.length > 0 && articles.length > 0) {
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function (i) {
            return function () {
                for (var n = 0; n < links.length; n++) {
                    links[n].className = "";
                    articles[n].className = "";
                }
                links[i].className = "active";
                articles[i].className = "active-panel";
            }
        }(i);
    }
}

/*             var tabs = document.querySelectorAll(".info-box li a");
            var panels = document.querySelectorAll(".info-box article");

            for (i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                setTabHandler(tab, i);
            }
            function setTabHandler(tab, tabPos) {
                tab.onclick = function(){
                    for (i = 0; i < tabs.length; i++) {
                        if (tabs[i].getAttribute("class")) {
                            tabs[i].removeAttribute("class");
                        }
                    }
                    tab.setAttribute("class", "active");

                for (i = 0; i < panels.length; i++) {
                    if (panels[i].getAttribute("class")) {
                        panels[i].removeAttribute("class");
                    }
                }

                panels[tabPos].setAttribute("class", "active-panel");
            }
        } */