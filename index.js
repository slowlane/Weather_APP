// const body = document.querySelector("body");
const input = document.getElementById("weather");
const submitButton = document.getElementById("submit-button");
const background = document.getElementById("background");

submitButton.addEventListener("click", clickEventGetWeather);

async function getWeather(location) {
  try {
    const locationData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=4f1d800a4d7d5a883081c7932caeb820`,
      { mode: "cors" }
    );
    const locationWeather = await locationData.json();
    // const weatherData = locationWeather.main;
    console.log(locationWeather);

    createTemperatureDisplay(locationWeather, location);
    changeBackground(location)
      .then((img) => {
        const photoUrl = img.urls.raw;
        const image = new Image();

        image.src = photoUrl;
        image.classList.add("fade-in");
        image.classList.add("background-imagery");

        return image;
      })
      .then((image) => {
        const images = background.querySelector("img");
        if (images) {
          //This is to delete the old image after the new image has already faded in.
          const imageNode = images;
          setTimeout(function () {
            imageNode.remove();
          }, 5000);
        }
        background.append(image);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.log(err);
  }
}

function clickEventGetWeather(e) {
  e.preventDefault();
  const location = input.value;
  getWeather(location);
}

function createTemperatureDisplay(weatherData, location) {
  //Get data from DOM
  const content = document.querySelector("#content");
  const temperaturePara = content.querySelector("#temperature-paragraph");
  const previousTemperatureParagraph = content.querySelector("p");

  //Create new DOM entries
  const displayingInfoForParagraph = document.createElement("p");
  const displayingWeatherType = document.createElement("p");

  const weatherTextString =
    `Displaying info for: ${location}` +
    "<br>" +
    `Current temperature: ${weatherData.main.temp}C` +
    "<br>" +
    `Humidity: ${weatherData.main.humidity}%` +
    "<br>" +
    `Feels like: ${weatherData.main["feels_like"]}C` +
    "<br>" +
    `Weather: ${weatherData.weather[0].description}`;

  if (previousTemperatureParagraph) {
    //If they exist, update fields

    // displayingInfoForParagraph.innerHTML = "";
    previousTemperatureParagraph.innerHTML = weatherTextString;
  } else {
    //Create the fields
    temperaturePara.innerHTML = weatherTextString;
    content.appendChild(temperaturePara);
  }
}

async function changeBackground(location) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${location} weather city&client_id=BLSXzIUOjLqf4jA99BGQR98-uFjc7VHA42VcJawH3wI`,
    { mode: "cors" }
  );
  const imageData = response.json();
  return imageData;
}

// async function waitForBg() {}

function createModal() {
  const content = document.getElementById("content");
  const modal = document.createElement("div");
  modal.id = "modal";
  // modal.style.backgroundImage =
  // "url('./cupertino_activity_indicator_selective.gif')";

  content.appendChild(modal);
}
function removeModal() {
  const modal = document.getElementById("modal");
  modal.remove();
}
