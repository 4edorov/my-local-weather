// Receive geolocation data
function geoFindMe() {
    
    var output = document.getElementById("outState");
    
    if (!navigator.geolocation) {
        output.innerHTML = "<div class='alert alert-danger'><strong>Wrong! </strong>Geolocation is not supported by your browser</div>";
        return;
    }
    
    function myLocation(position) {
        
        myLon = position.coords.longitude;
        myLat = position.coords.latitude;
        
        var myAPPID = "96211e2aa251a6f826cb4f8155285d24";
        // To proper work it must be added at the begin of url: https://cors-anywhere.herokuapp.com/
        var myRequest = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + myLat + "&lon=" + myLon + "&units=metric&APPID=" + myAPPID;
        
        /* Example of OpenWeatherMap respond 
         {"coord":{"lon":47.68,"lat":35.56},
         "weather":[{
         "id":600,
         "main":"Snow",
         "description":"light snow",
         "icon":"13n"
         }],
         "base":"stations",
         "main":{
         "temp":-0.25,
         "pressure":1008,
         "humidity":92,
         "temp_min":-1,
         "temp_max":0
         },
         "visibility":10000,
         "wind":{
         "speed":8,
         "deg":260
         },
         "clouds":{"all":90},
         "dt":1485192600,
         "sys":{
         "type":1,
         "id":7323,
         "message":0.0057,
         "country":"RU",
         "sunrise":1485149810,
         "sunset":1485179139},
         "id":473157,
         "name":"Ivanovsky Posëlok",
         "cod":200}
        */
        
        /* Request and respond from OpenWeatherMap with Promise!!! */
        
        var weather = new Promise(function(resolve, reject) {
            $.getJSON(myRequest, function(jsonOWMRespond) {
                if (jsonOWMRespond) {
                    output.innerHTML = "<div class='alert alert-success'><strong>Success! </strong> Data recieved</div>";
                    resolve(jsonOWMRespond);
                } else {
                    reject("Error");
                }
            });
        });
            
        weather.then(function(value) {
            var myCityAndCountry = value.name + ", " + value.sys.country;
            var myWind = value.wind.speed + " m/sec; " + value.wind.deg + " degrees";
            var myIconWeather = "http://openweathermap.org/img/w/" + value.weather[0]["icon"] + ".png";
            myTemperatureInC = value.main.temp;
            $(".myCityAndCountry").html(myCityAndCountry);
            $(".myTemperature").html(myTemperatureInC);
            $(".toC").addClass("active");
            $(".myPressure").html(value.main.pressure + " hPa");
            $(".myHumidity").html(value.main.humidity + " %");
            $(".myDescription").html(value.weather[0]["description"]);
            $(".myIconWeather").html("<img src='" + myIconWeather + "' class='img-responsive imgIcon' alt='Image icon'>");
            $(".myWind").html(myWind);
        }, function(reason) {
            output.innerHTML = "<div class='alert alert-danger'><strong>Wrong! </strong>No data from server" + reason + "</div>";
        });
        
        /* Standard request and respond from OpenWeatherMap
        $.getJSON(myRequest, function(jsonOWMRespond) {
            var myCityAndCountry = jsonOWMRespond.name + ", " + jsonOWMRespond.sys.country;
            var myWind = jsonOWMRespond.wind.speed + " " + jsonOWMRespond.wind.deg;
            var myIconWeather = "http://openweathermap.org/img/w/" + jsonOWMRespond.weather[0]["icon"] + ".png";
            $(".myCityAndCountry").html(myCityAndCountry);
            $(".myTemperature").html(jsonOWMRespond.main.temp);
            $(".myPressure").html(jsonOWMRespond.main.pressure);
            $(".myHumidity").html(jsonOWMRespond.main.humidity);
            $(".myDescription").html(jsonOWMRespond.weather[0]["description"]);
            $(".myIconWeather").html("<img src='" + myIconWeather + "' class='img-responsive' style='width: 25%; margin: auto' alt='Image icon'>");
            $(".myWind").html(myWind);       
        });
        */
    }
    
    function errorMyLocation() {
        output.innerHTML = "<div class='alert alert-danger'><strong>Wrong! </strong>Unable to retrieve you location</div>";
    }
    
    navigator.geolocation.getCurrentPosition(myLocation, errorMyLocation, {maximumAge: 600000});
}

$(document).ready(function() {
    $(".getWeather").on("click", function() {
        geoFindMe();
        var bgWeather = "url(http://wallpaper.zone/img/4665942.jpg)";
        $(".bgWeather").css('background-image', bgWeather);
    });
});

// For tooltips elements
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

// Convert temperature to F and to C
$(document).ready(function() {
    $(".toF").on("click", function() {
        myTemperatureInF = myTemperatureInC * 1.8 + 32;
        $(".myTemperature").html(myTemperatureInF);
        $(".toF").addClass("active");
        $(".toC").removeClass("active");
    })
    $(".toC").on("click", function() {
        $(".myTemperature").html(myTemperatureInC);
        $(".toC").addClass("active");
        $(".toF").removeClass("active");
    })
});