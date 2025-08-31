//Jab DOM content load ho tabhi trigger karna baki chize
document.addEventListener("DOMContentLoaded", () => {
  //

  const cityInput = document.getElementById("city-input");
  const getWeatherbtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessageDisplay = document.getElementById("error-message");

  const API_KEY = "b2f62efa48c75b3dc3ba793d54a26469"; //env variables

  //first step
  getWeatherbtn.addEventListener("click", async function (e) {
    let city = cityInput.value.trim();

    //City hi nhi dali
    if (!city) {
      return;
    }

    //Server or database can throw you some error
    //Database/server is in another continent and it will take some time from getting data from server or Database

    try {
      //Mean wait kro aur await husmesha async function ke saath hi use hota hai
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data from Open weather api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    // console.log(typeof response);
    // console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City Not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature :${main.temp}`;
    descriptionDisplay.textContent = `Weather :${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessageDisplay.classList.add("hidden");
  }

  function displayError() {
    weatherInfo.classList.add("hidden"); //hidden class add kardo
    errorMessageDisplay.classList.remove("hidden"); //hidden class remove kardo
  } //
});
