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
  if (currentHour > 20) {
    document.getElementById('wrapper').style.backgroundImage="url(img/evening.jpg)";
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
  celciusTemp = Math.round(
      response.data.main.temp
    );
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
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  
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
  fLink.classList.remove("active");
  cLink.classList.add("active");
  navigator.geolocation.getCurrentPosition(userPosition);
}
let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", currentLocation);

function changeToFahr(event) {
  event.preventDefault();
  cLink.classList.remove("active");
  fLink.classList.add("active");
  let fTemp = Math.round((celciusTemp*1.8) + 32);
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = fTemp;
}

function changeToCel(event) {
  event.preventDefault();
  fLink.classList.remove("active");
  cLink.classList.add("active");
  let cTemp = celciusTemp;
  let tempValue = document.querySelector("#degrees");
  tempValue.innerHTML = cTemp;

}

let celciusTemp = null;

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", changeToFahr);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", changeToCel)
search("Mariupol");