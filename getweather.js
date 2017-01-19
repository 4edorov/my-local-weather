// Receive geolocation data
function geoFindMe() {
    
    var output = document.getElementById("out");
    
    /*if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }*/
    
    function myLocation(position) {
        
        myLon = position.coords.longitude;
        myLat = position.coords.latitude;
        
        var myAPPID = "96211e2aa251a6f826cb4f8155285d24";
        var myRequest = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + myLat + "&lon=" + myLon + "&units=metric&APPID=" + myAPPID;
        
        /* Example of OpenWeatherMap respond 
        var jsonOWMRespond = {
            "coord":{"lon":37.78,"lat":55.76},
            "weather":[{
                "id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],
            "base":"stations",
            "main":{"temp":267.65,"pressure":1032,"humidity":79,"temp_min":267.15,"temp_max":268.15},
            "visibility":10000,
            "wind":{"speed":6,"deg":280},
            "clouds":{"all":90},
            "dt":1484712000,
            "sys":{"type":1,"id":7323,"message":0.0083,"country":"RU","sunrise":1484718286,"sunset":1484746471},
            "id":473157,
            "name":"Vladimirskiy Posëlok",
            "cod":200
        }
        */
        
        /* Request and respond from OpenWeatherMap with Promise!!! */
        
        var weather = new Promise(function(resolve, reject) {
            $.getJSON(myRequest, function(jsonOWMRespond) {
                resolve(jsonOWMRespond);
            });
        });
            
        weather.then(function(value) {
            var myCityAndCountry = value.name + ", " + value.sys.country;
            var myWind = value.wind.speed + " m/sec; " + value.wind.deg + " degrees";
            var myIconWeather = "http://openweathermap.org/img/w/" + value.weather[0]["icon"] + ".png";
            $(".myCityAndCountry").html(myCityAndCountry);
            $(".myTemperature").html(value.main.temp);
            $(".myPressure").html(value.main.pressure + " hPa");
            $(".myHumidity").html(value.main.humidity + " %");
            $(".myDescription").html(value.weather[0]["description"]);
            $(".myIconWeather").html("<img src='" + myIconWeather + "' class='img-responsive imgIcon' alt='Image icon'>");
            $(".myWind").html(myWind);
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
    
    function errorMyLocation(error) {
        output.innerHTML = "Unable to retrieve you location";
    }
    
    navigator.geolocation.getCurrentPosition(myLocation, errorMyLocation, {maximumAge: 600000});
}

$(document).ready(function() {
    $(".getWeather").on("click", function() {
        geoFindMe();
    });
});