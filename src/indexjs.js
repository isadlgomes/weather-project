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

  let weatherDescription = response.data.weather[0].main;
  console.log(response.data);
  let displayWeather = document.querySelector("#weather-status");
  displayWeather.innerHTML = `${weatherDescription}`;

  let showTemperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${showTemperature}ºC`;

  let sunrise = response.data.sys.sunrise;
  console.log(sunrise);
  let formattedSunrise = new Date(sunrise * 1000).toLocaleTimeString("en-GB");
  console.log(formattedSunrise);
  let showSunrise = document.querySelector("#sunrise");
  showSunrise.innerHTML = `${formattedSunrise} -`;

  let sunset = response.data.sys.sunset;
  console.log(sunset);
  let formattedSunset = new Date(sunset * 1000).toLocaleTimeString("en-GB");
  console.log(formattedSunset);
  let showSunset = document.querySelector("#sunset");
  showSunset.innerHTML = ` ${formattedSunset}`;

  let wind = response.data.wind.speed;
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = ` Wind speed: ${wind} m/s`;

  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = ` Humidity: ${humidity} %`;
}

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
