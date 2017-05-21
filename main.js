$(document).ready(function(){

//PROJECTS MANAGEMENT
    
    //retrieve projects data and start individual project creation
    $.getJSON("https://api.myjson.com/bins/t0f11", function(data){
        var projects = data;

        projects.sort(function(a, b){
            return(b.priority - a.priority);
        });

        for(var i=0; i < projects.length; i++)
        {
            createNewProj(projects[i], $("#proto-proj"));

            // for proper functioning (related to their positioning) 
            // waypoints should be loaded once 
            // all the section are filled with their projects
            if(i >= projects.length - 1)
                loadWaypoints();
        }
    });

    function createNewProj(project, proto)
    {
        var clone = proto.clone();
        clone.removeAttr('id');
        var parent = $("#" + project.section + " .proj-ext-container");

        if(projectsIframeOn && project.hasOwnProperty("iframe") && $(window).width() > 768) //change to hasOwnProperty('iframe'), in order to load iframes
        {
            var $iframe = $("<iframe src= " + project.link + "></iframe>");
            clone.find(".proj-frame").append($iframe);
        }
        else
            clone.find(".proj-frame").css("background-image", "url(" + project.imgLocal + ")");

        clone.find(".proj-title").text(project.name);
        clone.find(".proj-link").attr("href", project.link);
        clone.find(".proj-description").text(project.description);
        clone.find(".proj-lang span").text(project.languages);
        clone.find(".proj-frameworks span").text(project.frameworks);
        clone.css("display", "flex");
        clone.find(".project-info-btn").hover(function(){
            $(this).closest(".proj-container").find(".proj-frame, .proj-info-panel").toggleClass("toggled");
        });

        clone.appendTo(parent);
    }

//GLOBAL VARS & LISTENERS

    var projectsIframeOn = false;    

    // manages hovering events on navbar links to prevent 'sticky hovering' on mobile devices
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

//TOP ANIMATION INNER FUNCTIONING    

    var $colorCode = $("#color-code"); //the changing value in the laptop screen   
    var screenColors = []; //holds the colors for the top animation greeting message

    // gather the color of each section and push it to screenColors    
    $(".section-title-stripe").each(function(){       
        var rgbCode = $(this).css("background-color");
        var hexCode = rgbCode.match(/\d+/g);      
        var color = {
            rgb : $(this).css("background-color"),
            hex : rgbToHex(hexCode)
        };
            
        screenColors.push(color);
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

    //select a random color, except the last one, from screenColors
    //and then move it to the end of the array 
    //(this prevents consecutive selection of the same color)
    function pickColor()
    {
        var idx = Math.floor(Math.random() * (screenColors.length - 1)); 
        var color = screenColors[idx];
        screenColors.splice(idx, 1);
        screenColors.push(color);
        
        return color;
    }

    //entry point of the laptop animation    
    function startPrintingToScreen()
    {
        var col = pickColor().hex;

        for(var i=0; i <= col.length; i++)
        {
            var letter = i >= col.length ? ";" : col[i]; //last char printed should be ';'
            printDigit(letter, 200 * i, col);
        }                
    }

    function printDigit(letter, delay, color)
    {           
        setTimeout(function() {
            var randomKIdx = Math.floor(Math.random() * $(".key").length);
            var $key = $(".key:eq("+ randomKIdx +")"); //select random key to get pressed
            $key.addClass("pressed");
            setTimeout(function(){$key.removeClass("pressed");}, 150); //unpress the key
            $colorCode.append(letter);

            if(letter === ";") //the whole color value has been printed out
            {
                $("#top-anim h2").css("color", color);
                setTimeout(eraseLastInput, 1000); 
            }

        }, delay);
    }

    //erase last printed color and restarts the sequence
    function eraseLastInput()
    {
        $colorCode.css("background-color", "lightgray");
        setTimeout(function(){
            $colorCode.html("").css("background-color", "black");
            setTimeout(startPrintingToScreen, 750);
        }, 500);  
    }

    //initiate the animation loop 
    setTimeout(eraseLastInput, 1000);

//SCROLLING AND BARS SYSTEM

    // makes the scroll-related events to fire at arbitrary intervals
    var scrollTimer, lastScrollFireTime = 0;
    $(window).on('scroll', function() {
        var minScrollTime = 10;
        var now = new Date().getTime();

        function processScroll() 
        {
            manageTopPosition();
            scrollRainBg($("#rain-fg"));
            scrollRainBg($("#rain-bg"));
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
    var tucked = false; // the state of the top section (folded/unfolded)
    // handles the folding/unfolding of the top section
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

    // handles top bars position/visibililty when the window is resized 
    // (mostly employed to detect mobile viewport orientation)
    $(window).resize(function(){
        if(tucked)
        {
            showHideHead(); 
            $("#top").removeClass("all-trans");
            $("#top").css("top", determineTopHeight() + "px");
            $("#top").addClass("all-trans");
        }
    });

    // show/hides top name-bar
    function showHideHead()
    {
        if($(window).height() <= 450)
            $("#name").css("display", "none");
        else
            $("#name").css("display", "flex");
    }

    // determined at what height the top section should be tucked
    function determineTopHeight()
    {
        showHideHead(); 

        if($("#name").css("display") === "none")
            return parseInt($("#nav-bar").height() - $("#top").height());
        else
            return parseInt($("#nav-bar").height() - $("#top").height() + $("#name").height());
    }

    // restore the navbar to original color/hover state when top gets folded/unfolded
    function resetNavbar()
    {
        $("#nav-bar").css("background-color", navBarOriginCol);
        $("#nav-bar .link").each(function(){
            $(this).find("div:first").removeClass("hovered");
        });
    }

    //handles the selfie animation
    function scrollRainBg(element)
    {
        var rain = element;
        var rainTop = parseInt(rain.css("background-position-y")) - 1;

        if(rainTop <= 0)
            rain.css("background-position-y", "100%");
        else
            rain.css("background-position-y", rainTop + "%");
    }

    // provides smooth scrolling to anchor when navbar links get clicked
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

    // handles navbar links highlighting
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

    function loadWaypoints()
    {
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

    }

});