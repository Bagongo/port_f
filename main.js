$(document).ready(function(){

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

    // var navbarInitTop = $(window).innerHeight() - parseInt($("#nav-bar").height());
    // var animInitTop = $("#top-anim").css("top");
    // var barsHeight = parseInt($("#nav-bar").height()) + parseInt($("#top-anim").height());

    $(window).scroll(function(){
        var top = $("#nav-bar").height() - $("#top").height() + $("#name").height();
        var height = $(window).scrollTop();      

        if(height > 50)
        {
            $("#top").css("top", top + "px");
            $("#top").css("position", "fixed");
        }
        else
        {
            $("#top").css("top", "0");
            $("#top").css("position", "absolute");
        }
    });

});