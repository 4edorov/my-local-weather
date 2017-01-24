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
            myBgWeather = value.weather[0]["icon"];
            $(".myCityAndCountry").html(myCityAndCountry);
            $(".myTemperature").html(myTemperatureInC);
            $(".toC").addClass("active");
            $(".toF").removeClass("active");
            $(".myPressure").html(value.main.pressure + " hPa");
            $(".myHumidity").html(value.main.humidity + " %");
            $(".myDescription").html(value.weather[0]["description"]);
            $(".myIconWeather").html("<img src='" + myIconWeather + "' class='img-responsive imgIcon' alt='Image icon'>");
            $(".myWind").html(myWind);

            if (myBgWeather == "01d") {
                var bgWeather = "url(http://images.fineartamerica.com/images-medium-large-5/green-grass-panorama-on-blue-sky-michal-bednarek.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "01n") {
                var bgWeather = "url(http://mscookietookie.com/wp-content/uploads/2015/04/night-sky-hd-wallpaper-2-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "02d") {
                var bgWeather = "url(http://www.kinotronic.ru/wp-content/uploads/2012/06/white-clouds-on-blue-sky-cambodia-dual-screen-widescreen-wallpaper-y-g-ibackgroundz.com_-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "02n") {
                var bgWeather = "url(http://emiliamaciejewska.pl/wp-content/uploads/2016/01/158H-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "03d") {
                var bgWeather = "url(http://www.kinotronic.ru/wp-content/uploads/2012/06/white-clouds-on-blue-sky-cambodia-dual-screen-widescreen-wallpaper-y-g-ibackgroundz.com_-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "03n") {
                var bgWeather = "url(http://emiliamaciejewska.pl/wp-content/uploads/2016/01/158H-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "04d") {
                var bgWeather = "url(http://images.fineartamerica.com/images-medium-large-5/blue-sky-and-building-storm-clouds-panorama-fine-art-print-keith-webber-jr.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "04n") {
                var bgWeather = "url(http://www.elisaforsgren.com/wp-content/uploads/2015/06/December-2014-Storm-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "09d") {
                var bgWeather = "url(http://img15.deviantart.net/7541/i/2015/209/c/9/sunday_morning_by_jonuriah-d938d24.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "09n") {
                var bgWeather = "url(http://urgant-tv.ru/_ph/2/169277172.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "10d") {
                var bgWeather = "url(http://www.localtoglobal.org/images/rain.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "10n") {
                var bgWeather = "url(http://urgant-tv.ru/_ph/2/169277172.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "11d") {
                var bgWeather = "url(http://www.benmessina.com/FB/PICS/LARGE/Passing_Storm_Sunshine_Coast.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "11n") {
                var bgWeather = "url(http://pixdaus.com/files/items/pics/7/38/569738_fdfc5aa5a2b7bef4887ccae19c3fefba_large.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "13d") {
                var bgWeather = "url(https://dl.dropboxusercontent.com/s/4acjg9y5p2728m4/gameofthroens_heroes_08.jpg?dl=0)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "13n") {
                var bgWeather = "url(https://www.bsr.org/images/sized/images/heroes/2016-12-1-where-bsr-be-december-blog-hero-900x300.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "50d") {
                var bgWeather = "url(http://photos.lifeisphoto.ru/167/0/1675503.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
            if (myBgWeather == "50n") {
                var bgWeather = "url(http://images.fineartamerica.com/images-medium-large/foggy-night-mike-nellums.jpg)";
                $(".bgWeather").css('background-image', bgWeather);
            }
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