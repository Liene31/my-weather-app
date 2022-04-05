//Updates Day and Time

//Converts input in string and adds "0"
function padTo2Digits(num) {
  return String(num).padStart(2, '0');
}

let currentDate = new Date();

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


let date = document.querySelector("#current-date");
date.innerHTML = currentTime(currentDate);


function updateCurrentMeteo(response) {
  
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);    

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;  

  document.querySelector("#visibility").innerHTML = response.data.visibility;   

  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);  

  document.querySelector("#city").innerHTML = response.data.name;       

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



let searchIconElement = document.querySelector("button");
searchIconElement.addEventListener("click", handleSearch);



searchCity("Brussels");

   
















