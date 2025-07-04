const axios = require("axios");
const Setting = require("../models/Setting.js");

export const getWeather = async () => {
  const settings = await Setting.findOne();
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${settings.weatherApiKey}&units=metric`
  );
  return `${res.data.weather[0].main}, ${res.data.main.temp}°C`;
};
