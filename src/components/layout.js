import { b } from "../../builder";
import { showTimezoneAndClock } from "./timezones";

export function weatherApi() {
  // Create form
  const locationForm = b("form", {
    id: "location-form",
    onsubmit: handleFormSubmit,
    children: [
      b("label", {
        for: "location-input",
        textContent: "Enter a location:",
      }),
      b("input", {
        type: "text",
        id: "location-input",
      }),
      b("button", {
        type: "submit",
        textContent: "Search",
      }),
    ],
  });

  const mapContainer = b("div", {
    id: "map-container",
  });

  const weatherContainer = b("div", {
    id: "weather-container",
  });

  const mainContainer = b("div", {
    children: [locationForm, mapContainer, weatherContainer],
  });

  document.body.append(mainContainer);


// handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const locationInput = document.getElementById("location-input");

  // Get coordinates of location using Google Maps API
  const googleMapsApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationInput.value}&key=${`AIzaSyAwPB3_HoHYDJ-kbbb9kyaPb1n5OIqgM5Y`}`;
  fetch(googleMapsApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const location = data.results[0].geometry.location;

      // Show location on map
      const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${`AIzaSyAwPB3_HoHYDJ-kbbb9kyaPb1n5OIqgM5Y`}&center=${location.lat},${location.lng}&zoom=15`;
      const mapElement = b("iframe", {
        src: mapUrl,
        width: "600",
        height: "450",
        allowfullscreen: "",
        loading: "lazy",
      });
      mapContainer.innerHTML = "";
      mapContainer.append(mapElement);

      // Get weather data for the location
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${`99320a681ee00e0299a4b391a7055c65`}`;
      fetch(weatherApiUrl)
        .then((response) => response.json())
        .then((data) => {
          const weatherDescription = data.weather[0].description;
          console.log("Weather description:", weatherDescription);

          const translationApiUrl = `https://api.openai.com/v1/engines/davinci/completions`;
          const prompt = `Translate the phrase: '"${weatherDescription}"' to romanian`;
console.log(prompt)
          fetch(translationApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${`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`}`
            },

            body: JSON.stringify({
              prompt,
              max_tokens: 100,
              temperature: 0.3,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            })
          })
          .then(response => {
            console.log(response.status);
            console.log(response)
            return response.json();
            
          })
          .then((translationData) => {
            const translatedText = translationData.choices[0].text.trim();
            console.log("Translated description:", translatedText);

            showTimezoneAndClock(location);

            weatherContainer.innerHTML = `The weather in ${locationInput.value} is currently ${translatedText}.`;
          })
          .catch((error) => {
            console.error(error);
            weatherContainer.innerHTML = "An error occurred while translating the weather data.";
          });
        })
        .catch((error) => {
          console.error(error);
          weatherContainer.innerHTML = "An error occurred while fetching weather data.";
        });
    })
    .catch((error) => {
      console.error(error);
    });
}




  
}
  
