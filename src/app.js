let now = new Date();
let currentTime = document.querySelector("#curent-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let currentDay = document.querySelector("#day-week");
currentDay.innerHTML = `${month} ${date}`;
currentTime.innerHTML = `${day} ${hours}:${minutes} `;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastElement.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date"><center>
      ${formatDate(forecastDay.dt)}</center></div>
      <center><img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        width="48"
        alt=""
      /></center>
      <div class="weather-forecast-temps"><center>
        <span class="weather-forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </center></div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ea5e6773c5e751dd43021439f134293d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#name-city").innerHTML = response.data.name;
  document.querySelector("#degree-change").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "ea5e6773c5e751dd43021439f134293d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "ea5e6773c5e751dd43021439f134293d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", submit);

search("Kyiv");

console.log(
  `https://api.openweathermap.org/data/2.5/weather?q=warsaw&appid=ea5e6773c5e751dd43021439f134293d&units=metric`
);
