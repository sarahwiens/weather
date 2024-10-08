function updateCurrentCity(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${response.data.city}`;
}

function updateCurrentDay(response) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let dayElement = document.querySelector("#current-day");
  dayElement.innerHTML = currentDay;
}

function updateCurrentTime(response) {
  let currentMinutes = now.getMinutes();
  currentMinutes = ("0" + currentMinutes).slice(-2);
  let currentHours = now.getHours();
  currentHours = ("0" + currentHours).slice(-2);
  let currentTimeElement = document.querySelector("#current-time");
  currentTimeElement.innerHTML = `${currentHours}:${currentMinutes}`;
}

function updateCurrentWeatherDescription(response) {
  let currentWeatherDescriptionElement = document.querySelector(
    "#current-weather-description"
  );
  currentWeatherDescriptionElement.innerHTML = `${response.data.condition.description}`;
}

function updateCurrentHumidity(response) {
  let currentHumidityElement = document.querySelector("#current-humidity");
  currentHumidityElement.innerHTML = `${response.data.temperature.humidity}%`;
}

function updateCurrentWindSpeed(response) {
  let currentWindSpeedElement = document.querySelector("#current-wind-speed");
  currentWindSpeedElement.innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function updateCurrentWeatherIcon(response) {
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" />`;
}

function updateCurrentTemperature(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}`;
}

function getCurrentWeatherDetails(apiURL) {
  axios.get(apiURL).then(updateCurrentCity);
  axios.get(apiURL).then(updateCurrentDay);
  axios.get(apiURL).then(updateCurrentTime);
  axios.get(apiURL).then(updateCurrentWeatherDescription);
  axios.get(apiURL).then(updateCurrentHumidity);
  axios.get(apiURL).then(updateCurrentWindSpeed);
  axios.get(apiURL).then(updateCurrentWeatherIcon);
  axios.get(apiURL).then(updateCurrentTemperature);
}

function determineApiUrL(city) {
  let apiKey = "7f314bd46t448eb65o54002ab9dadc03";
  let units = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  getCurrentWeatherDetails(apiURL);
}

function handleSearchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-form-input");
  let city = searchInput.value.toLowerCase().trim();
  determineApiUrL(city);
}

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-weather-day-container">
        <div class="forecast-weather-day">${day}</div>
        <div class="forecast-weather-icon">☀</div>
        <div class="forecast-weather-temperature">
          <div class="forecast-weather-temperature-high">
            <strong>26°C</strong>
          </div>
          <div class="forecast-weather-temperature-low">18°C</div>
        </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#forecast-weather-container");
  forecastElement.innerHTML = forecastHtml;
}

let now = new Date();
let searchCityFormElement = document.querySelector("#search-city-form");
searchCityFormElement.addEventListener("submit", handleSearchCity);

determineApiUrL("Paris");
displayForecast();
