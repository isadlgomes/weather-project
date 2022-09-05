function formatTime(num) {
  return String(num).padStart(2, "0");
}

function showCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-input");
  let city = `${search.value}`;
  if (city === "") {
    alert("Please type something!");
  } else {
    let apiKey = "7215c9c944cc81a60b6a870c43db8372";
    let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiCity}`).then(displayCity);
  }
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getGps);
}

function getGps(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7215c9c944cc81a60b6a870c43db8372";
  let apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiLocation}`).then(displayCity);
}

function displayCity(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector("#show-city");
  displayCity.innerHTML = `${cityName}`;

  let countryName = response.data.sys.country;
  let displayCountry = document.querySelector("#show-country");
  displayCountry.innerHTML = `${countryName}`;

  let wind = response.data.wind.speed;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = ` Wind speed: ${wind} m/s`;

  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = ` Humidity: ${humidity} %`;

  let weatherDescription = response.data.weather[0].description;
  let displayWeather = document.querySelector("#weather-status");
  displayWeather.innerHTML = `${weatherDescription}`;

  celsiusTemperature = response.data.main.temp;

  let showTemperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${showTemperature}ºC`;

  let icon = response.data.weather[0].icon;
  let showIcon = document.querySelector("#icon");
  showIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  showIcon.setAttribute("alt", weatherDescription);

  let sunrise = response.data.sys.sunrise;
  let formattedSunrise = new Date(sunrise * 1000).toLocaleTimeString("en-GB");
  let showSunrise = document.querySelector("#sunrise");
  showSunrise.innerHTML = `${formattedSunrise}h`;

  let sunset = response.data.sys.sunset;
  let formattedSunset = new Date(sunset * 1000).toLocaleTimeString("en-GB");
  let showSunset = document.querySelector("#sunset");
  showSunset.innerHTML = `${formattedSunset}h`;
}

function getFahrenheit(event) {
  event.preventDefault();
  let convertToFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let fahrenheit = document.querySelector("#current-temp");
  fahrenheit.innerHTML = `${convertToFahrenheit}ºF`;
}

function getCelsius(event) {
  event.preventDefault();
  let convertToCelsius = Math.round(celsiusTemperature);
  let celsius = document.querySelector("#current-temp");
  celsius.innerHTML = `${convertToCelsius}ºC`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row" align="center">`;

  let daily = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daily.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="card border-light h-100 my-card" style="border-radius: 30px">
          <div class="card-header" id="firstday">
            Tue 26/07
          </div>
          <div class="card-body" id="icon-temp">
            <img src="" class="card-img mx-auto" alt="" width="40%">
            <h5 class="card-title text-center">26ºC</h5>
          </div>
        </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let weekday = days[now.getDay()];
let month = months[now.getMonth()];
let day = now.getDate();
let hoursAndMinutes =
  formatTime(now.getHours()) + ":" + formatTime(now.getMinutes());
let time = document.querySelector("#current-time");
let showtime = `${weekday} ${month} ${day}, ${hoursAndMinutes}`;
time.innerHTML = showtime;

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", showCity);

let button = document.querySelector("#btn-location");
button.addEventListener("click", getPosition);

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", getFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", getCelsius);
