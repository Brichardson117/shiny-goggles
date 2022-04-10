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
//  var currentWeather = document.createElement("div")
//  currentWeather.classList = "border border-primary w-25 p-3 "
 var cityNameH2 = document.createElement("h2");
 cityNameH2.textContent = name;
 var temperaturePEl = document.createElement("p");
 temperaturePEl.textContent = "Temp: " + data.current.temp + " ˚F";
 var weatherImg = document.createElement("img");
 weatherImg.src = "http://openweathermap.org/img/wn/" +data.current.weather[0].icon + ".png" 
 var humidityEl = document.createElement("p")
 humidityEl.textContent ="humidity: " + data.current.humidity +"%";
 var uvEl = document.createElement("p");
 uvEl.textContent = "UV Index: " + data.current.uvi;
 var windspeedEl = document.createElement("p");
 windspeedEl.textContent = "Windspeed:" + data.current.wind_speed + "MPH";
 var dateEl = document.createElement("h3")
 dateEl.textContent = moment.unix(data.current.dt).format('MM-DD-YYYY');


 document.querySelector("#displayWheather").append(cityNameH2,dateEl ,weatherImg ,temperaturePEl,humidityEl,uvEl,windspeedEl)
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