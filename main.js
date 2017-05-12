$(document).ready(function(){

//PROJECTS MANAGEMENT
    
    var projects = [{
            link:"//codepen.io/Bagongo/embed/WRrZQq/?height=397&theme-id=0&default-tab=result&embed-version=2",
            imgLink:"http://res.cloudinary.com/dourvudhy/image/upload/v1494365873/portf_projects_pics/quotes-app.png",
            imgLocal:"imgs/projx/quotes-app.png",
            iframe: false,
            section:"games",
            name:"Quote Machine",
            description: "A simple game where you have to match a quote to it's author",
            languages: "html, css, js",
            frameworks: "none",
            priority: 1
        },
        {
            link: "//codepen.io/Bagongo/embed/RpmpWz/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"games",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494365871/portf_projects_pics/simons-app.png",
            imgLocal:"imgs/projx/simons-app.png",
            iframe: false,
            name:"Simon's Game",
            description: "An enanched replica of the popular game from the 80's",
            languages: "html, css, js",
            frameworks: "jquery",
            priority: 3
        },
        {
            link: "//codepen.io/Bagongo/embed/EWdrMG/?height=314&theme-id=0&default-tab=result&embed-version=2",
            section:"games",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494365870/portf_projects_pics/tictactoe-app.png",
            imgLocal:"imgs/projx/tictactoe-app.png", 
            iframe: false,
            name:"Tic Tac Toe - WG",
            description: "A 'War Games' themed tic tac toe game, featuring single-player and multiplayer modes",
            languages: "html, css, js",
            frameworks: "none",
            priority: 2
        },
        {
            link: "//codepen.io/Bagongo/embed/xqLWoq/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"web-apps",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494365870/portf_projects_pics/pomodoro-app.png",
            imgLocal:"imgs/projx/pomodoro-app.png",
            iframe: false,
            name:"Tomatimer",
            description: "A pomodoro clock, useful to regulate your work/breaks flow",
            languages: "html, css, js",
            frameworks: "none",
            priority: 2
        },
        {
            link: "//codepen.io/Bagongo/embed/gmOWEZ/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"web-apps",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494365869/portf_projects_pics/calculator-app.png",
            imgLocal:"imgs/projx/calculator-app.png",
            iframe: false,
            name:"Magnetic Calculator",
            description: "A fully functional animated calculator",
            languages: "html, css, js",
            frameworks: "none",
            priority: 3
        },
        {
            link: "//codepen.io/Bagongo/embed/BpOyQx/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"web-apps",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494341377/twitch-app_py5l5g.png",
            imgLocal:"imgs/projx/twitch-app.png",
            iframe: false,
            name:"Twitch Favorites",
            description: "An application that lets you search for Twitch users and see status of your favorite streamers",
            languages: "html, css, js",
            frameworks: "jquery",
            priority: 1
        },
        {
            link: "//codepen.io/Bagongo/embed/QdvpVw/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"web-apps",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494366493/portf_projects_pics/wiki-app.png",
            imgLocal:"imgs/projx/wiki-app.png",
            iframe: false,
            name:"Wiki Dossiers",
            description: "A Wikipedia search tool, developed to experiment with Wikipedia's API",
            languages: "html, css, js",
            frameworks: "jquery",
            priority: 3
        },
        {
            link: "//codepen.io/Bagongo/embed/OWXgVY/?height=265&theme-id=0&default-tab=result&embed-version=2",
            section:"web-apps",
            imgLink: "http://res.cloudinary.com/dourvudhy/image/upload/v1494365879/portf_projects_pics/weather-app.png", 
            imgLocal:"imgs/projx/weather-app.png",
            iframe: false,
            name:"Local Weather",
            description: "A single page weather application. It provides local weather data by using reverse geocoding",
            languages: "html, css, js",
            frameworks: "none",
            priority: 1
        }
    ];

    function createNewProj(project, proto)
    {
        var clone = proto.clone();
        clone.removeAttr('id');
        var parent = $("#" + project.section + " .proj-ext-container");

        if(project.iframe && $(window).width() > 768)
        {
            var $iframe = $("<iframe src= " + project.link + "></iframe>");
            clone.find(".proj-frame").append($frame);
        }
        else
        {
            //add detection of broken link and provide local alternative
            clone.find(".proj-frame").css("background-image", "url(" + project.imgLocal + ")");
        }

        clone.find(".proj-title").text(project.name);
        clone.find(".proj-link").attr("href", project.link);
        clone.find(".proj-description").text(project.description);
        clone.find(".proj-lang span").text(project.languages);
        clone.find(".proj-frameworks span").text(project.frameworks);
        clone.css("display", "flex");       
        clone.appendTo(parent);
    }

    projects.sort(function(a, b){
        return(b.priority - a.priority);
    });

    for(var i=0; i < projects.length; i++)
        createNewProj(projects[i], $("#proto-proj"));

//GLOBAL VARS & LISTENERS
    $(".project-info-btn").hover(function(){
        $(this).closest(".proj-container").find(".proj-frame, .proj-info-panel").toggleClass("toggled");
    });

    $(".link").bind("mouseover mouseout", function(e){
        if(e.type == "mouseover"){
            $(this).addClass("hovered");
        }
        else
            $(this).removeClass("hovered");
    });

    $(".link").bind("touchstart touchend", function(e){
        var obj = $(this);
        setTimeout(function(){obj.removeClass("hovered");}, 100);
    });

    // $(".link").bind("touchend mouseout", function(){
    //     $(this).removeClass("hovered");
    // });  

    // $(".proj-container").hover(function(){
    //     $(this).find(".project-info-btn, .proj-link i").addClass("flash");
    // }, function(){
    //     $(this).find(".project-info-btn, .proj-link i").removeClass("flash");
    // });  

//TOP ANIMATION INNER FUNCTIONING    

    var $colorCode = $("#color-code"); //the changing value in the laptop screen   
    
    // collection of colors for screen animation (comment/uncomment code below to use section colors)
    var screenColors = [{hex:"#fd971f", rgb:"rgb(253,151,31)"},
                         {hex:"#a6e22e", rgb:"rgb(166,226,46)"}, 
                         {hex:"#66d9ef", rgb:"rgb(102,217,239)"}, 
                         {hex:"#f92672", rgb:"rgb(249,38,114)"}];

    /*var screenColors = [];
    // push rgb and hex property objects to sectionColorArray   
    $(".section-title-stripe").each(function(){
        
        var rgbCode = $(this).css("background-color");
        var hexCode = rgbCode.match(/\d+/g);
        
        var color = {
            rgb : $(this).css("background-color"),
            hex : rgbToHex(hexCode)
        };
            
        screenColors.push(color);
    });
    */
        
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

    //select a random color from all screenColors elements but the last
    //and then move it to the end of the array 
    //to prevent consecutive selection of the same color
    function pickColor()
    {
        var idx = Math.floor(Math.random() * (screenColors.length - 1)); 
        var color = screenColors[idx];
        screenColors.splice(idx, 1);
        screenColors.push(color);
        
        return color;
    }
        
    function startPrintingToScreen()
    {
        var col = pickColor().hex;

        for(var i=0; i <= col.length; i++)
        {
            var letter = i >= col.length ? ";" : col[i]; //last char printed should be ','
            printDigit(letter, 200 * i, col);
        }                
    }

    function printDigit(letter, delay, color)
    {           
        setTimeout(function() {
            var randomKIdx = Math.floor(Math.random() * $(".key").length);
            var $key = $(".key:eq("+ randomKIdx +")"); //select random key to get pressed
            $key.addClass("pressed");
            setTimeout(() => {$key.removeClass("pressed");}, 150); //unpress the key
            $colorCode.append(letter);

            if(letter === ";") //the color value has been printed out
            {
                $("#top-anim h2").css("color", color);
                setTimeout(eraseLastInput, 1000); 
            }

        }, delay);
    }

    function eraseLastInput()
    {
        $colorCode.css("background-color", "lightgray");
        setTimeout(function(){
            $colorCode.html("").css("background-color", "black");
            setTimeout(startPrintingToScreen, 750);
        }, 500);  
    }

    setTimeout(eraseLastInput, 1000);

//SCROLLING AND BARS SYSTEM

    var scrollTimer, lastScrollFireTime = 0;
    $(window).on('scroll', function() {
        var minScrollTime = 10;
        var now = new Date().getTime();

        function processScroll() 
        {
            manageTopPosition();
            scrollRainBg();
        }

        if (!scrollTimer) 
        {
            if (now - lastScrollFireTime > (3 * minScrollTime)) 
            {
                processScroll(); // fire immediately on first scroll
                lastScrollFireTime = now;
            }

            scrollTimer = setTimeout(function() {
                scrollTimer = null;
                lastScrollFireTime = new Date().getTime();
                processScroll();
            }, minScrollTime);
        }
    });

    var navBarOriginCol = $("#nav-bar").css("background-color");
    var tucked = false;

    function manageTopPosition()
    {
        var scrollHeight = $(window).scrollTop();

        if(scrollHeight > 50 && !tucked)
        {
            tucked = true;
            $("#top").css({"top": determineTopHeight() + "px", "position": "fixed"});
            $("#nav-bar").toggleClass("tucked");
            $("#nav-bar > .link > div:first").removeClass("hovered");
        }
        else if (scrollHeight <= 50 && tucked)
        {
            tucked = false;
            $("#top").css({"top": "0", "position": "absolute"});
            $("#name").css("display", "flex");
            $("#nav-bar").toggleClass("tucked");
            resetNavbar();
            $("#nav-bar > .link:first > div:first").addClass("hovered");
        }
    }

    $(window).resize(function(){
        if(tucked)
        {
            showHideHead(); 
            $("#top").removeClass("all-trans");
            $("#top").css("top", determineTopHeight() + "px");
            $("#top").addClass("all-trans");
        }
    });

    function showHideHead()
    {
        if($(window).height() <= 450)
            $("#name").css("display", "none");
        else
            $("#name").css("display", "flex");
    }

    function determineTopHeight()
    {
        showHideHead(); 

        if($("#name").css("display") === "none")
            return parseInt($("#nav-bar").height() - $("#top").height());
        else
            return parseInt($("#nav-bar").height() - $("#top").height() + $("#name").height());
    }

    function resetNavbar()
    {
        $("#nav-bar").css("background-color", navBarOriginCol);
        $("#nav-bar .link").each(function(){
            $(this).find("div:first").removeClass("hovered");
        });
    }

    function scrollRainBg()
    {
        var bg = $("#rain-bg");
        var bgTop = parseInt(bg.css("background-position-y")) - 1;

        if(bgTop <= 0)
            bg.css("background-position-y", "100%");
        else
            $("#rain-bg").css("background-position-y", bgTop + "%");
    }

    //smooth scrolling when navbar links get clicked
    $("#nav-bar .link").on("click", function(event){
        var target = $(this).attr("href");
        if(target !== "")
        {
            event.preventDefault();
            var targetHeight = $(target).offset().top;
            $("html, body").animate({scrollTop: targetHeight}, 500);
        }
    });

    /* waypoints functionality */
    function navBarReacts(sectionId)
    {
        var color = $("#" + sectionId).find(".section-title-stripe").css("background-color");
        $("#nav-bar").css("background-color", color);
        $("#nav-bar .link").each(function(){
            if($(this).attr("data-section") === sectionId)
                $(this).find("div:first").addClass("hovered");
            else
                $(this).find("div:first").removeClass("hovered");
        });
    }

    $(".section").waypoint(function(scrolling){
        if(scrolling == "down")
            navBarReacts($(this.element).attr("id"));             
    });

    $(".section-bot").waypoint(function(scrolling){
        if(scrolling == "up")
        {
            var sectionId = $(this.element).closest(".section").attr("id");
            navBarReacts(sectionId);       
        }   

    }, {offset : "0%"}); 

});