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

function displayWeather(response) {
  document.querySelector("#name-city").innerHTML = response.data.name;
  document.querySelector("#degree-change").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", submit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", searchCurrentLocation);

search("Kyiv");
