$(document).ready(function(){

    /* toggle button behavior when pressed.... */
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper, #first-bar").toggleClass("toggled");
    });

    /* sets proper bars' position when scrolling + adds name in firsrtbar (can be used to dinamically name sections) */
    var barsTop = $("#first-bar").css("top");        
    $(window).scroll(function() {
        var height = $(window).scrollTop();

        if(height > 20)
            $("#first-bar, #sidebar-wrapper").css("top", "0px");
        else
            $("#first-bar, #sidebar-wrapper").css("top", barsTop);
    });

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
            document.getElementById(section).appendChild(newProj);
        }

        $("#" + section).children(".proj-container").each(function(i){            
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