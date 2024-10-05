function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function kmhToMph(kmh) {
  return kmh * 0.621371;
}

async function fetchWeather(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const temperatureCelsius = data.current_weather.temperature;
    const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius);
    const windSpeedKmh = data.current_weather.windspeed;
    const windSpeedMph = kmhToMph(windSpeedKmh);
    const conditions = data.current_weather.weathercode;

    const isImperial = document.getElementById("unit-switch").checked;

    if (isImperial) {
      document.getElementById("temperature-data").innerHTML = `
              <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
              <p>Wind Speed: ${windSpeedMph.toFixed(2)} mph</p>
          `;
    } else {
      document.getElementById("temperature-data").innerHTML = `
              <p>Temperature: ${temperatureCelsius}°C</p>
              <p>Wind Speed: ${windSpeedKmh} km/h</p>
          `;
    }

    document.getElementById("conditions-data").innerHTML = `
          <p>Weather Condition Code: ${conditions}</p>
      `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById(
      "temperature-data"
    ).innerHTML = `<p>Please provide valid coordinates.</p>`;
    document.getElementById(
      "conditions-data"
    ).innerHTML = `<p>Please provide valid coordinates.</p>`;
  }
}

document
  .getElementById("location-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    fetchWeather(latitude, longitude);
  });

document.getElementById("unit-switch").addEventListener("change", function () {
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  if (latitude && longitude) {
    fetchWeather(latitude, longitude);
  }
});

document.getElementById("temperature-link").addEventListener("click", () => {
  document.getElementById("temperature-section").classList.add("active");
  document.getElementById("conditions-section").classList.remove("active");
});

document.getElementById("conditions-link").addEventListener("click", () => {
  document.getElementById("conditions-section").classList.add("active");
  document.getElementById("temperature-section").classList.remove("active");
});
