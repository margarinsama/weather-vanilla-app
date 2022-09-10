let now = new Date();
function showDate() {
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return currentDate;
}
let today = document.querySelector("#date-holder");
today.innerHTML = showDate();
//
//
function showWeather(response) {
  document.querySelector(".city-name").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  //console.log(response.data);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
}
function search(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=349a59a0a5ddf126a305e835cb2164e3`;
  axios.get(url).then(showWeather);
}
function submit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-search").value;
  search(cityName);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

function userPosition(position) {
  let appId = "349a59a0a5ddf126a305e835cb2164e3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${appId}`;
  axios.get(apiUrl).then(showWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userPosition);
}
let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", currentLocation);

search("Mariupol");