
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

  console.log(forecastDaily);
  
  let forecastHTML = `<div class="row">`;
  forecastDaily.forEach(function(forecast, index) {
    if(index < 5) {
    forecastHTML = forecastHTML + `

    <div class="col col-sm-2">
        <div class="temperature-date">${formatDay(forecast.dt)}</div>
        <div class="temperature-img">
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        </div>
        <div class="temperature-of-the-date">${Math.round(forecast.temp.day)}°C</div>
      </div>
      `;
      }  
  });

  forecastHTML = forecastHTML + `</div>`; 

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;        
}


function setIconImage(code) {    
  
    if (code === "01d") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/01d.png`);
    } else if (code === "01n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/01n.png`);
    } else if (code === "02d") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/02d.png`);
    } else if (code === "02n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/02n.png`);
    } else if (code === "03d" || code === "03n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/03d.png`);
    } else if (code === "04d" || code === "04n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/04d.png`);
    } else if (code === "09d" || code === "09n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/09d.png`);
    } else if (code === "10d") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/10d.png`);
    }  else if (code === "10n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/10n.png`);
    } else if (code === "11d" || code === "11n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/11d.png`);
    } else if (code === "13d" || code === "13n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/13d.png`);
    } else if (code === "50d" || code === "50n") {
      document.querySelector("#weather-icon").setAttribute("src",`Images/50d.png`);
    }
    
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
      
      
      setIconImage(code);
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

function showTemperatureFahrenheit(event) {
  event.preventDefault();
  
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function showTemperatureCelsius(event) {
  event.preventDefault();  
  
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
}

function useNavigator() {

  navigator.geolocation.getCurrentPosition(showPosition);
}



let celsiusTemperature = null;

let searchIconElement = document.querySelector("button");
searchIconElement.addEventListener("click", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showTemperatureFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTemperatureCelsius);

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", useNavigator);



searchCity("Brussels");


   
















