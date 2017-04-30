$(document).ready(function(){

//PROJECTS MANAGEMENT
    
    var projects = [{
            link: "//codepen.io/Bagongo/embed/WRrZQq/?height=397&theme-id=0&default-tab=result&embed-version=2",
            section:"web-apps",
            name:"Quote Machine",
            description: "A simple game where you have to match a quote to it's author",
            code: "html, css, js",
            frameworks: "none"
        }
    ];

    for(var i=0; i < 5; i++)
    {
        var project = projects[0];
        var $target = $("#" + project.section + " .proj-ext-container");
        var projEl = $("#proto-proj").clone();
        projEl.find(".proj-title").text(project.name);
        projEl.find("iframe").attr("src", project.link);
        projEl.find(".proj-description").text(project.description);
        projEl.find(".proj-code span").text(project.code);
        projEl.find(".proj-frameworks span").text(project.frameworks);
        projEl.css("display", "flex");
        projEl.appendTo($target);
    } 

//GLOBAL VARS & LISTENERS
    $(".project-info-btn").hover(function(){
        $(this).closest(".proj-container").find("iframe, .proj-info-panel").toggleClass("toggled");
    });    

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

//SCROLLING AND FIXED BARS SYSTEM

    var tucked = false;

    $(window).scroll(function(){
        var top = parseInt($("#nav-bar").height() - $("#top").height() + $("#name").height());
        var height = $(window).scrollTop(); 

        if(height > 50 && !tucked)
        {
            tucked = true;
            $("#top").css({"top": top + "px", "position": "fixed"});
            $("#nav-bar").toggleClass("tucked");
            $("#nav-bar > a > div:first").removeClass("hovered");
        }
        else if (height <= 50 && tucked)
        {
            tucked = false;
            $("#top").css({"top": "0", "position": "absolute"});
            $("#nav-bar").toggleClass("tucked");
            $("#nav-bar > a:first > div:first").addClass("hovered");
        }
    });

    /* waypoints functionality */

    var firstSectionId = $(".section:first").attr("id");
    var navBarOriginCol = $("#nav-bar").css("background-color");

    function navBarReacts(sectionId)
    {
        var color = $("#" + sectionId).find(".section-title-stripe").css("background-color");
        $("#nav-bar").css("background-color", color);
        $("#nav-bar a").each(function(){
            if($(this).attr("data-section") === sectionId)
                $(this).find("div:first").addClass("hovered");
            else
                $(this).find("div:first").removeClass("hovered");
        });
    }

    function resetNavbar()
    {
        $("#nav-bar").css("background-color", navBarOriginCol);
        $("#nav-bar a").each(function(){
            $(this).find("div:first").removeClass("hovered");
        });
    }

    $(".section").waypoint(function(scrolling){
        if(scrolling == "down")
            navBarReacts($(this.element).attr("id"));             
    });

    $(".section-title-stripe").waypoint(function(scrolling){
        if(scrolling == "up")
        {
            var prevSection = $(this.element).closest(".section").prev(".section").attr("id");
            
            if(prevSection !== undefined)
                navBarReacts(prevSection);
            else
                resetNavbar();
        }   

    }, {offset : "20%"}); 

});