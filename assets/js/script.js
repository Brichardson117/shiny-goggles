var searchBtn = document.querySelector("#btn");
var cityNameEl= document.querySelector("#state")
var cityName = " ";

var searchLocationHandler = function(event) {
    event.preventDefault();

    var city = cityNameEl.value.trim
    if (city) {
        getWeatherRepo(city);
        cityNameEl.value = " ";
    } else {
        alert("Please enter valid Location.");
    }; 

};

var getWeatherRepo = function(lat,lon,name) {
 var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9d0b4962f3190a47703e718c0e6b86a0"
 fetch(weatherApi).then(function(respone){
     if(respone.ok) {
         respone.json().then(function(data){
             displayWeather(data,name)
            console.log(data);
         })
     }else {
         alert("Cannot get weather for that location.")
     }
 })
}

var displayWeather = function(data,name){
 var cityNameH2 = document.createElement("h2");
 cityNameH2.textContent = name;
 var temperaturePEl = document.createElement("p");
 temperaturePEl.textContent = "Temp: " + data.current.temp;
 var weatherImg = document.createElement("img");
 weatherImg.src = "http://openweathermap.org/img/wn/" +data.current.weather[0].icon + ".png" 


 document.querySelector("#displayWheather").append(cityNameH2, temperaturePEl,weatherImg)
}


function apiCall() {
    const cityInputEl = document.querySelector("#citySearch");
    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInputEl.value + "&limit=5&appid=9d0b4962f3190a47703e718c0e6b86a0";
  fetch(baseUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getWeatherRepo(data[0].lat,data[0].lon, data[0].name);
    //   
    });
}
searchBtn.addEventListener("click", apiCall);

// repoEl.classList = ("p-3 mb-2 bg-success text-white w-25 rounded")