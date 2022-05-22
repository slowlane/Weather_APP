// const body = document.querySelector("body");
const input = document.getElementById("weather");
const submitButton = document.getElementById("submit-button");
const background = document.getElementById("background");

submitButton.addEventListener("click", clickEventGetWeather);

async function getWeather(location) {
  try {
    const locationData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}_weather&units=metric&APPID=4f1d800a4d7d5a883081c7932caeb820`,
      { mode: "cors" }
    );
    const locationWeather = await locationData.json();
    const temperature = locationWeather.main.temp;
    console.log(locationWeather);

    createTemperatureDisplay(temperature, location);
    await changeBackground(location)
      .then((img) => {
        const photoUrl = img.urls.raw;
        const image = new Image();
        image.src = photoUrl;
        console.log(photoUrl);
        return image;
        // background.style.backgroundImage = `url('${photoUrl}')`;
      })
      .then((image) => {
        const images = background.querySelector("img");
        background.style.backgroundImage = image.src;
        image.classList.add("background-imagery");
        if (images) {
          images.remove();
        }

        background.append(image);
      })
      .catch((err) => {
        console.error(err);
      });
    // await changeBackground(location);
    // removeModal();
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
  // console.log(imageData);
  return imageData;
}

async function waitForBg() {}

function createModal() {
  const content = document.getElementById("content");
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.style.backgroundImage =
    "url('./cupertino_activity_indicator_selective.gif')";

  content.appendChild(modal);
}
function removeModal() {
  const modal = document.getElementById("modal");
  modal.remove();
}
