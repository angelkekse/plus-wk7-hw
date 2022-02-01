function formatDate() {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let clock = now.toLocaleTimeString();
  let dateNum = now.getDate();
  let dateStatement = `${day} ${dateNum} ${month} @ ${clock}`;
  return dateStatement;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
    <span class="weather-forecast-day"> ${day} </span>
    <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="#" />
    <div class="weather-forecast-temperature">
    <span class="wfmax">34°</span> <span class="wfmin">23°</span>
    </div>
    </div>
    
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function newCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  document.querySelector("#title-city").innerHTML = input.value;
  let apiUrlEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "3afd3b68923f6dfb599ab1fd13851db5";
  let units = "metric";
  let apiUrl = `${apiUrlEndpoint}q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateCity);
}

function updateCity(response) {
  console.log(response); // to find other data
  let titleCity = document.querySelector("#title-city");
  let currentTemp = document.querySelector("#changed-city-now");
  let maxTemp = document.querySelector("#changed-city-input-temp-high");
  let minTemp = document.querySelector("#changed-city-input-temp-low");
  let newDescription = document.querySelector("#changed-city-desc");
  let newWind = document.querySelector("#changed-city-wind");
  let newHumidity = document.querySelector("#changed-city-humidity");
  let weatherElement = document.querySelector("#weather-icon");
  celsiusTemperature1 = response.data.main.temp;
  celsiusTemperature2 = response.data.main.temp_max;
  celsiusTemperature3 = response.data.main.temp_min;
  newWindSpeed = response.data.wind.speed;
  titleCity.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(celsiusTemperature1)}°C`;
  maxTemp.innerHTML = `${Math.round(celsiusTemperature2)}°C`;
  minTemp.innerHTML = `${Math.round(celsiusTemperature3)}°C`;
  newDescription.innerHTML = response.data.weather[0].description;
  newWind.innerHTML = `${Math.round(newWindSpeed)} knots`;
  newHumidity.innerHTML = response.data.main.humidity;
  weatherElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchLoc(position) {
  let apiUrlEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "3afd3b68923f6dfb599ab1fd13851db5";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiUrlEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateCity);
  console.log(apiUrl);
}

function getPlaceHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLoc);
}

function convertToCelsius(event) {
  event.preventDefault();
  let changedCityTemp1 = document.querySelector("#changed-city-now");
  changedCityTemp1.innerHTML = `${Math.round(celsiusTemperature1)}°C`;
  let changedCityTemp2 = document.querySelector(
    "#changed-city-input-temp-high"
  );
  changedCityTemp2.innerHTML = `${Math.round(celsiusTemperature2)}°C`;
  let changedCityTemp3 = document.querySelector("#changed-city-input-temp-low");
  changedCityTemp3.innerHTML = `${Math.round(celsiusTemperature3)}°C`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature1 = Math.round((celsiusTemperature1 * 9) / 4 + 32);
  let changedCityTemp1 = document.querySelector("#changed-city-now");
  changedCityTemp1.innerHTML = `${fahrenheitTemperature1}°F`;
  let fahrenheitTemperature2 = Math.round((celsiusTemperature2 * 9) / 4 + 32);
  let changedCityTemp2 = document.querySelector(
    "#changed-city-input-temp-high"
  );
  changedCityTemp2.innerHTML = `${fahrenheitTemperature2}°F`;
  let fahrenheitTemperature3 = Math.round((celsiusTemperature3 * 9) / 4 + 32);
  let changedCityTemp3 = document.querySelector("#changed-city-input-temp-low");
  changedCityTemp3.innerHTML = `${fahrenheitTemperature3}°F`;
}

function convertIntoKPH(event) {
  event.preventDefault();
  let newKPHWind = Math.round(newWindSpeed * 1.85);
  let changedWind1 = document.querySelector("#changed-city-wind");
  changedWind1.innerHTML = `${newKPHWind} kph`;
}

function convertIntoKNOTS(event) {
  event.preventDefault();
  let newKNOTSWind = Math.round(newWindSpeed);
  let changedWind2 = document.querySelector("#changed-city-wind");
  changedWind2.innerHTML = `${newKNOTSWind} knots`;
}

let now = new Date();

let timeDisplay = document.querySelector("#date-and-time");
timeDisplay.innerHTML = formatDate();

let searchBox = document.querySelector("form");
searchBox.addEventListener("submit", newCity);

let celsiusTemperature1 = null;
let celsiusTemperature2 = null;
let celsiusTemperature3 = null;
let newWindSpeed = null;

let convertFahrenheit = document.querySelector("#tempF");
convertFahrenheit.addEventListener("click", convertToFahrenheit);

let convertCelsius = document.querySelector("#tempC");
convertCelsius.addEventListener("click", convertToCelsius);

let convertKPH = document.querySelector("#kilometresPerHour");
convertKPH.addEventListener("click", convertIntoKPH);

let convertKNOTS = document.querySelector("#knotsMeasure");
convertKNOTS.addEventListener("click", convertIntoKNOTS);

let currentLoc = document.querySelector("#current-location");
currentLoc.addEventListener("click", getPlaceHere);

displayForecast();
