$(document).ready(function(){
    
    /* sets proper bars' position when scrolling + adds name in firstbar (can be used to dinamically name sections) */
    
    if( parseInt($(window).height()) >= (parseInt($("#name").height()) + parseInt($("#head-001").height())))
        $("#wrapper").css("top", window.innerHeight - $("#first-bar").height());
       
    var barsTop = $("#first-bar").css("top");
    
    $(window).resize(function(){
        barsTop = "calc(100vh - " + $("#first-bar").css("height") + ")";
        $("#first-bar, #sidebar-wrapper").css("top", barsTop);
    });
       
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        
        var nameHeight = $("#name").css("height");
        var headHeight = Math.round(parseInt($("#head-001").css("height")));

        if(height > 50)
        {
            $("#head-001").css("top", "-1000px");
            $("#first-bar, #sidebar-wrapper").css("top", nameHeight);
        }
        else
        {
            $("#head-001").css("top", "0px");
            $("#first-bar, #sidebar-wrapper").css("top", barsTop);
        }
    });

    // collection of colors for screen animation (comment/uncomment code below to use section colors)
    /* var sectionColors = [{hex:"#FD971F", rgb:"rgb(253,151,31)"},
                         {hex:"#A6E22E", rgb:"rgb(166,226,46)"}, 
                         {hex:"#66D9EF", rgb:"rgb(102,217,239)"}, 
                         {hex:"#F92672", rgb:"rgb(249,38,114)"}];
                         */
        
    var sectionColors = [];
    // push rgb and hex property objects to sectionColorArray
    
    $(".section-title-stripe").each(function(){
        
        var rgbCode = $(this).css("background-color");
        var hexCode = rgbCode.match(/\d+/g);
        
        var color = {
            rgb : $(this).css("background-color"),
            hex : rgbToHex(hexCode)
        };
            
        sectionColors.push(color);
    });
        
    // converts every r, g, b in rgb strings array to hex string
    function rgbToHex(rgb) 
    {
        var hexCode = "";       
        for(var i=0; i < rgb.length; i++)
        {
            var hex = parseInt(rgb[i]).toString(16);
            hex = hex.length == 1 ? "0" + hex : hex;           
            hexCode += hex;
        }        
        return "#" + hexCode;
    }
    
    function pickColor()
    {
        var idx = Math.floor(Math.random() * (sectionColors.length - 1)); 
        var color = sectionColors[idx];
        sectionColors.splice(idx, 1);
        sectionColors.push(color);
        
        return color;
    }
    
    var $colorSpan = $("#screen").find("#color-code");    
    setInterval(function(){
        
        var col = pickColor();
        var colHex = col["hex"];
        var colRgb = col["rgb"];       
        $colorSpan.css("background-color", "lightgray");
        
        setTimeout(function(){
            $colorSpan.html("");
            $colorSpan.css("background-color", "black");
            myLoop();
        }, 250);
                
        var i = 0;       
        function myLoop(){           
            setTimeout(function () {
                var randomKIdx = Math.floor(Math.random() * ($(".key").length));
                var $key = $(".key:eq("+ randomKIdx +")");
                $key.addClass("pressed");
                setTimeout(() => {$key.removeClass(pressed);}, 150);
                $colorSpan.append(colHex[i]);
                i++;
                if (i < colHex.length)
                    myLoop();
                else
                {
                    setTimeout(function(){
                        $colorSpan.append(";");
                        $("#top-anim h2").css("color", colRgb);
                        popText();
                    }, 500);                   
                }
            }, 200)
        }       
    }, 4000);
    
    /* toggle button behavior when pressed.... */
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper, #first-bar, #first-bar > a").toggleClass("toggled");
    });
    
    /* spawn background texts */
    var bgTexts = ["design", "games", "web-apps", "development"];
    
    function popText()
    {
        var text = bgTexts[Math.floor(Math.random() * (bgTexts.length))];
        var pos1 = Math.random() * (30 - 10) + 10;
        var pos2 = Math.random() * (80 - 60) + 60;
        var posX = Math.random() < 0.5 ? pos1 : pos2;
        
        var newText = $("#proto-bg-txt").clone();
        newText.html(text + "<br /><i class='fa fa-angle-double-down'></i>");
        newText.appendTo("#head-001");
        newText.addClass("bg-text");
        newText.css({"color":"aquamarine", left:posX+"%"});
        newText.animate({opacity:"1"},{queue:false, duration: 500});
        newText.animate({top:"200%"},{queue: false, duration: 3000, complete: function(){
            $(this).remove();
        }});
    }

    /* Set all the project by data-pulling */
    var webapps = [
        {
            link: "//codepen.io/Bagongo/embed/QGjZjV/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"Web Apps",
            name:"Tribute page",
            description: "A simple landing page created as an exercise for freecodecamp.com",
            code: "html, js, css",
            frameworks: "bootstrap, jquery"},
        {
            link: "//codepen.io/Bagongo/embed/QGjZjV/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"Web Apps",
            name:"Tribute page",
            description: "A simple landing page created as an exercise for freecodecamp.com",
            code: "html, js, css",
            frameworks: "bootstrap, jquery"},
        {
            link: "//codepen.io/Bagongo/embed/QGjZjV/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"Web Apps",
            name:"Tribute page",
            description: "A simple landing page created as an exercise for freecodecamp.com",
            code: "html, js, css",
            frameworks: "bootstrap, jquery"},
        {
            link: "//codepen.io/Bagongo/embed/QGjZjV/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"Web Apps",
            name:"Tribute page",
            description: "A simple landing page created as an exercise for freecodecamp.com",
            code: "html, js, css",
            frameworks: "bootstrap, jquery"}
    ];

    function loadProjectsData(section, template, projects)
    {    
        for(var i=1; i < projects.length; i++)
        {
            var newProj = document.getElementById(template).cloneNode(true);            
            document.getElementById(section).children[1].appendChild(newProj);
        }

        $("#" + section + " > .proj-ext-container").children(".proj-container").each(function(i){            
            var projData = projects[i];

            $(this).find(".proj-title").prepend(projData["name"]);
            $(this).find(".proj-description").append(projData["description"]);
            $(this).find(".proj-code").append(projData["code"]);
            $(this).find(".proj-frameworks").append(projData["frameworks"]);
            $(this).find("iframe").attr("src", projects[i]["link"]);
        });
    }

    loadProjectsData("web-apps", "webapp-template", webapps);
    loadProjectsData("games", "game-template", webapps);

    /* project panels inner functioning */
    $(".proj-title > i").hover(function(){
        $($(this).parent().siblings(".proj-info-panel")).toggleClass("toggled");
        $($(this).parent().parent().find("iframe")).toggleClass("toggled");
    });

    /* waypoints functionality */
    var $barName = $("#bar-name");
    var originBarCol = $barName.parent().css("background-color");

    $(".section-title").waypoint(function(scrolling){

        if(scrolling == "down")
        {
            var title = $(this.element);
            var barName;

            if(title.html() === undefined)
            {
                barName = "";
                $barName.parent().css("background-color", originBarCol);
            }
            else
                barName = title.html();

            $barName.html(barName); 
            $barName.parent().css("background-color", title.css("background-color"));

        }   
    });

    $(".section-title").waypoint(function(scrolling){

        if(scrolling == "up")
        {
            var title = $(this.element).closest(".row").prev().find(".section-title");
            var barName;

            if(title.html() === undefined)
            {
                barName = "";
                $barName.parent().css("background-color", originBarCol);
            }
            else
                barName = title.html();

            $barName.html(barName);
            $barName.parent().css("background-color", title.css("background-color"));
        }   
    }, {offset : "15%"});

});