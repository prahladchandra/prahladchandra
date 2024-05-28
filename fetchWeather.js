const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = 'Your City'; // Replace with your city
const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

const getWeather = async () => {
  try {
    const response = await axios.get(URL);
    const data = response.data;

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    const city = data.name;
    const temp = data.main.temp;
    const weatherDesc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    return {
      city,
      temp,
      weatherDesc,
      icon,
      sunrise,
      sunset,
    };
  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`);
    process.exit(1);
  }
};

const updateReadme = async () => {
  const weather = await getWeather();
  const weatherInfo = `
## Hello from <img src="https://github.com/bumb7ebee/bumb7ebee/blob/asset/images/icon/india_32.png" width="28" height="28"/> ${weather.city}!

<p>Currently, the weather is: <b>${weather.temp}°C, <img src="https://openweathermap.org/img/wn/${weather.icon}.png" width="28" height="28" title="Weather Icon" alt="Weather Icon"> <i>(${weather.weatherDesc})</i></b></br>
Today, the sun rises at <b>${weather.sunrise}</b> and sets at <b>${weather.sunset}</b>.</p>
`;

  const readmePath = path.join(__dirname, 'README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  const startMarker = '## Hello from';
  const endMarker = '## Skills';

  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  const newReadmeContent = readmeContent.substring(0, startIndex) + weatherInfo + '\n' + readmeContent.substring(endIndex);

  fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
};

updateReadme();
