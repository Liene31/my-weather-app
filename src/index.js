
function padTo2Digits(num) {
  return String(num).padStart(2, '0');
}

function currentTime(dateInput) {

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

    let dayOfTheWeek = days[dateInput.getDay()];
    let hours = padTo2Digits(dateInput.getHours());
    let minutes = padTo2Digits(dateInput.getMinutes());

    return `${dayOfTheWeek} ${hours}:${minutes}`;
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

function updateCurrentMeteo(response) {

      let code = response.data.weather[0].icon;  
      let currentDate = new Date(); 
      celsiusTemperature = Math.round(response.data.main.temp);

      document.querySelector("#current-date").innerHTML = currentTime(currentDate);
      
      document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);    

      document.querySelector("#humidity").innerHTML = response.data.main.humidity;  

      document.querySelector("#description").innerHTML = response.data.weather[0].description;  
      
      document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);  

      document.querySelector("#city").innerHTML = response.data.name;    

      console.log(response);
      
      setIconImage(code);  
  
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
  
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function showTemperatureCelsius(event) {
  event.preventDefault();  
  
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
}



let celsiusTemperature = null;

let searchIconElement = document.querySelector("button");
searchIconElement.addEventListener("click", handleSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showTemperatureFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTemperatureCelsius);



searchCity("Brussels");

   
















