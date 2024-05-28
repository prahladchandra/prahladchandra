const axios = require('axios');
const fs = require('fs');

const API_KEY = 'f61eea2a95bc4755b654a76dad614b5b'; // Your Weatherbit API key
const LATITUDE = 35.7721; // Replace with the latitude of your city
const LONGITUDE = -78.63861; // Replace with the longitude of your city
const UNITS = 'I'; // Imperial units (Fahrenheit)

const URL = `https://api.weatherbit.io/v2.0/current?lat=${LATITUDE}&lon=${LONGITUDE}&key=${API_KEY}&units=${UNITS}`;

const updateReadme = async () => {
  try {
    const response = await axios.get(URL);
    const data = response.data.data[0]; // Extract the first item from the data array

    const city = data.city_name;
    const temp = data.temp;
    const weatherDesc = data.weather.description;
    const sunrise = data.sunrise;
    const sunset = data.sunset;

    const weatherInfo = `
## Hello from ${city}!

<p>Currently, the weather is: <b>${temp}°F, ${weatherDesc}</b>.</p>
<p>Today, the sun rises at ${sunrise} and sets at ${sunset}.</p>
`;

    const readmePath = 'README.md';
    let readmeContent = fs.readFileSync(readmePath, 'utf8');

    // Replace placeholders with actual weather information
    readmeContent = readmeContent.replace('<!--WEATHER-->', weatherInfo);

    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log('README updated successfully with weather information.');
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
};

updateReadme();
