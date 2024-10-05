function handleSearchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-form-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
}

let searchCityFormElement = document.querySelector("#search-city-form");
searchCityFormElement.addEventListener("submit", handleSearchCity);
