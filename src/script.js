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

function updateCurrentWeatherElements(response) {
  updateCurrentCity(response);
  updateCurrentDay(response);
  updateCurrentTime(response);
  updateCurrentWeatherDescription(response);
  updateCurrentHumidity(response);
  updateCurrentWindSpeed(response);
  updateCurrentWeatherIcon(response);
  updateCurrentTemperature(response);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-weather-day-container">
        <div class="forecast-weather-day">${formatForecastDay(day.time)}</div>
        <div ><img src= "${
          day.condition.icon_url
        }" class="forecast-weather-icon"/></div>
        <div class="forecast-weather-temperature">
          <div class="forecast-weather-temperature-high">
            <strong>${Math.round(day.temperature.maximum)}°C</strong>
          </div>
          <div class="forecast-weather-temperature-low">${Math.round(
            day.temperature.minimum
          )}°C</div>
        </div>
      </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast-weather-container");
  forecastElement.innerHTML = forecastHtml;
}

function getCurrentWeatherDetails(currentApiUrl) {
  axios.get(currentApiUrl).then(updateCurrentWeatherElements);
}

function getForecastWeatherDetails(forecastApiUrl) {
  axios.get(forecastApiUrl).then(displayForecast);
}

function determineApiUrl(city, apiKey, units) {
  let currentApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  console.log(currentApiUrl);
  getCurrentWeatherDetails(currentApiUrl);
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  console.log(forecastApiUrl);
  getForecastWeatherDetails(forecastApiUrl);
}

function updateApiParameters() {
  if (checkboxElement.checked) {
    units = "imperial";
  } else {
    units = "metric";
  }
  console.log(units);

  let searchInput = document.querySelector("#search-city-form-input");
  let city = searchInput.value.toLowerCase().trim() || "Paris";

  console.log(city);
  let apiKey = "7f314bd46t448eb65o54002ab9dadc03";
  console.log(apiKey);
  determineApiUrl(city, apiKey, units);
}

function handleSearchCity(event) {
  event.preventDefault();
  updateApiParameters();
}

function handleUnitToggle(event) {
  updateApiParameters();
  updateUnits();
}

let now = new Date();
let searchCityFormElement = document.querySelector("#search-city-form");
searchCityFormElement.addEventListener("submit", handleSearchCity);
let checkboxElement = document.getElementById("units");
checkboxElement.addEventListener("change", handleUnitToggle);
updateApiParameters();
