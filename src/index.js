
function padTo2Digits(num) {
  return String(num).padStart(2, '0');
}

function currentTime(timestamp) {
  let currentDate = new Date(timestamp);  

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

    let dayOfTheWeek = days[currentDate.getDay()];
    let hours = padTo2Digits(currentDate.getHours());
    let minutes = padTo2Digits(currentDate.getMinutes());

    return `Updated on ${dayOfTheWeek} ${hours}:${minutes}`;
}

function formatDay(timestamp) {

  let date = new Date(timestamp * 1000);  
  let daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayOfTheWeek = daysShort[date.getDay()];

  return dayOfTheWeek;
}


function displayForecast(response) {

  let forecastDaily = response.data.daily;    
  
  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function(forecast, index) {
    if(index < 6) {
    forecastHTML = forecastHTML + `

    <div class="col col-sm-2 forecast-cont">
        <div class="temperature-date">${formatDay(forecast.dt)}</div>
        <div class="temperature-img">
          <img src="Images/${forecast.weather[0].icon}.png"
           id="forecast-icon" />
        </div>
        <div class="temperature-max-min">
        <span>${Math.round(forecast.temp.max)}°|</span>
        <span>${Math.round(forecast.temp.min)}°</span>
        </div>
      </div>
      `;
      }  
  });

  forecastHTML = forecastHTML + `</div>`; 

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;        
  
}

  function getForecast(coord) {
        
    let apiKey = `7f7b212e480de247710aebbd9f9c68bd`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude={part}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast); 
  }

function updateCurrentMeteo(response) {

      let code = response.data.weather[0].icon;           
      
      celsiusTemperature = Math.round(response.data.main.temp);

      document.querySelector("#current-date").innerHTML = currentTime(response.data.dt * 1000);
      
      document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);    

      document.querySelector("#humidity").innerHTML = response.data.main.humidity;  

      document.querySelector("#description").innerHTML = response.data.weather[0].description;  
      
      document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);  

      document.querySelector("#city").innerHTML = response.data.name;      

      document.querySelector("#weather-icon").setAttribute("src",`Images/${code}.png`);

      getForecast(response.data.coord); 
  
}

function searchCity(city) {

  let apiKey = `7f7b212e480de247710aebbd9f9c68bd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateCurrentMeteo); 
}


function handleSearch(event) {
  event.preventDefault();

  let searchForCityInput = document.querySelector("#search-city");
  let city = searchForCityInput.value;
  
  searchCity(city);
}

function showPosition(position) {  

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;   

  let apiKey = `7f7b212e480de247710aebbd9f9c68bd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(updateCurrentMeteo);     

}

function useNavigator() {

  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchIconElement = document.querySelector("button");
searchIconElement.addEventListener("click", handleSearch);

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", useNavigator);

searchCity("Brussels");


   
















