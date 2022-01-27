let now = new Date();
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
let timeDisplay = document.querySelector("#date-and-time");
timeDisplay.innerHTML = formatDate();

//////////////////////////////////

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
  titleCity.innerHTML = response.data.name;
  let output1 = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#changed-city-now");
  currentTemp.innerHTML = `${output1}°C`;
  let output2 = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#changed-city-input-temp-high");
  maxTemp.innerHTML = `${output2}°C`;
  let output3 = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#changed-city-input-temp-low");
  minTemp.innerHTML = `${output3}°C`;
  let output4 = Math.round(response.data.wind.speed);
  let newWind = document.querySelector("#changed-city-wind");
  newWind.innerHTML = `${output4} kph`;
  let output5 = response.data.main.humidity;
  let newHumidity = document.querySelector("#changed-city-humidity");
  newHumidity.innerHTML = `${output5} %`;
}

let searchBox = document.querySelector("form");
searchBox.addEventListener("submit", newCity);

function searchLoc(position) {
  let apiUrlEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "3afd3b68923f6dfb599ab1fd13851db5";
  let units = "metric";
  let apiUrl = `${apiUrlEndpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateCity);
  console.log(apiUrl);
}

function getPlaceHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLoc);
}

let currentLoc = document.querySelector("#current-location");
currentLoc.addEventListener("click", getPlaceHere);
