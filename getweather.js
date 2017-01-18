// Receive geolocation data
function geoFindMe() {
    
    var output = document.getElementById("out");
    
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    
    function myLocation(position) {
        
        myLon = position.coords.longitude;
        myLat = position.coords.latitude;
        
        var myAPPID = "96211e2aa251a6f826cb4f8155285d24";
        var myRequest = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + myLat + "&lon=" + myLon + "&APPID=" + myAPPID;
        $.getJSON(myRequest, function(json) {
            $(".message").html(JSON.stringify(json));
        });
        
    }
    
    function errorMyLocation(error) {
        output.innerHTML = "Unable to retrieve you location";
    }
    
    navigator.geolocation.getCurrentPosition(myLocation, errorMyLocation, {maximumAge: 600000});
}

//geoFindMe();