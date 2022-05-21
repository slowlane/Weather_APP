// const body = document.querySelector("body");
const input = document.getElementById("weather");
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", clickEventGetWeather);

async function getWeather(location) {
  try {
    const locationData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=4f1d800a4d7d5a883081c7932caeb820`,
      { mode: "cors" }
    );
    const locationWeather = await locationData.json();
    const temperature = locationWeather.main.temp;

    createTemperatureDisplay(temperature, location);
    changeBackground(location);
  } catch (err) {
    console.log(err);
  }
}

function clickEventGetWeather(e) {
  e.preventDefault();
  const location = input.value;
  getWeather(location);
}

function createTemperatureDisplay(temp, location) {
  const content = document.querySelector("#content");
  const temperaturePara = content.querySelector("#temperature-paragraph");
  const previousTemperatureParagraph = content.querySelector("p");
  // let temperaturePara;

  if (previousTemperatureParagraph) {
    previousTemperatureParagraph.innerHTML = `Temperature in ${location} is ${temp} degrees celsius`;
  } else {
    // temperaturePara = document.createElement("p");
    temperaturePara.innerHTML = `Temperature in ${location} is ${temp} degrees celsius`;
    content.appendChild(temperaturePara);
  }
}

async function changeBackground(location) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${location}&client_id=BLSXzIUOjLqf4jA99BGQR98-uFjc7VHA42VcJawH3wI`,
    { mode: "cors" }
  );
  const imageData = response.json();
  console.log(imageData);
  imageData
    .then((img) => {
      console.log(img);
      const photoUrl = img.urls.raw + " weather";
      console.log(photoUrl);
      document.body.style.backgroundImage = `url('${photoUrl}')`;
    })
    .catch((err) => {
      console.error(err);
    });
  // document.body.style.backgroundImage = `url('https://api.unsplash.com/photos?query=${location}&client_id=BLSXzIUOjLqf4jA99BGQR98-uFjc7VHA42VcJawH3wI')`;
}
// https://api.unsplash.com/photos?query=London?client_id=BLSXzIUOjLqf4jA99BGQR98-uFjc7VHA42VcJawH3wI
