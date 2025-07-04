const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");
const User = require("./models/User");
const Setting = require("./models/Setting");

dotenv.config();

// Initialize Telegram Bot with polling
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

/**
 * Handle /start command
 */
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const name = `${msg.from.first_name || ""} ${
    msg.from.last_name || ""
  }`.trim();
  const username = msg.from.username || "";
  const joinedAt = new Date(msg.date * 1000); // Convert Unix to Date
  const lastUpdated = new Date();

  const welcomeMessage = `👋 Welcome to WeatherNext!

With this bot, you can:
• 📍 Get real-time weather updates for your location
• 🧪 Know the air quality index (AQI)
• ☀️ Get sunrise and sunset timings

To get started:
1. Tap the button below to share your location
2. Receive your personalized weather report instantly`;

  let user = await User.findOne({ chatId });

  if (!user) {
    // Save new user in DB
    user = new User({
      chatId,
      isSubscribed: true,
      name,
      username,
      joinedAt,
      lastUpdated,
    });
    console.log("🆕 Saving new user to DB:", user);
    await user.save();

    bot.sendMessage(chatId, welcomeMessage, {
      reply_markup: {
        keyboard: [[{ text: "📍 Send Location", request_location: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  } else {
    // Update subscription and show location prompt
    user.isSubscribed = true;
    user.lastUpdated = lastUpdated;
    await user.save();

    bot.sendMessage(
      chatId,
      "You are already subscribed.\nPlease share your location:",
      {
        reply_markup: {
          keyboard: [[{ text: "📍 Send Location", request_location: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      }
    );
  }
});

/**
 * Handle location sharing from user
 */
bot.on("location", async (msg) => {
  const chatId = msg.chat.id;
  const lat = msg.location.latitude;
  const lon = msg.location.longitude;
  const lastUpdated = new Date();

  // console.log("📍 Location shared by user:", msg.location);

  const settings = await Setting.findOne();
  const weatherRes = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${settings.weatherApiKey}&units=metric`
  );

  const city = weatherRes.data.name;
  const country = weatherRes.data.sys.country;

  // Update user location in DB
  await User.findOneAndUpdate(
    { chatId },
    {
      location: { lat, lon, city, country },
      lastUpdated,
    },
    { new: true }
  );

  // Send formatted weather report
  const weatherReport = await getWeatherByCoords(lat, lon);
  bot.sendMessage(chatId, weatherReport);
});

/**
 * Handle /stop command
 */
bot.onText(/\/stop/, async (msg) => {
  const chatId = msg.chat.id;
  await User.findOneAndUpdate({ chatId }, { isSubscribed: false });
  bot.sendMessage(chatId, "You have unsubscribed from weather updates.");
});

/**
 * Get full weather + AQI report for given coordinates
 */
async function getWeatherByCoords(lat, lon) {
  const settings = await Setting.findOne();

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${settings.weatherApiKey}&units=metric`;
  const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${settings.weatherApiKey}`;

  const [weatherRes, aqiRes] = await Promise.all([
    axios.get(weatherUrl),
    axios.get(aqiUrl),
  ]);

  const data = weatherRes.data;
  const aqiData = aqiRes.data.list[0];

  // Extract weather details
  const cityName = data.name;
  const countryCode = data.sys.country;
  // console.log("📍 City:", cityName);
  // console.log("🌍 Country Code:", countryCode);
  const weatherDescription = data.weather[0].description;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const visibility = data.visibility / 1000; // meters to km
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  // AQI details
  const aqi = aqiData.main.aqi;
  const { label: aqiLabel, emoji: aqiEmoji } = getAqiLabel(aqi);

  // Format message
  return `
🌦️ Weather in ${cityName}, ${countryCode}:

🌤️ Condition: ${weatherDescription}
🌡️ Temperature: ${temp}°C (Feels like ${feelsLike}°C)
💧 Humidity: ${humidity}%
🌬️ Wind: ${windSpeed} km/h
🌫️ Visibility: ${visibility} km
☀️ Sunrise: ${sunrise}
🌇 Sunset: ${sunset}

🧪 Air Quality Index: ${aqiEmoji} ${aqiLabel} (${aqi})
🕒 Last updated: ${new Date().toLocaleTimeString()}`;
}

/**
 * Convert AQI number to label + emoji
 */
function getAqiLabel(aqi) {
  switch (aqi) {
    case 1:
      return { label: "Good", emoji: "🟢" };
    case 2:
      return { label: "Fair", emoji: "🟡" };
    case 3:
      return { label: "Moderate", emoji: "🟠" };
    case 4:
      return { label: "Poor", emoji: "🔴" };
    case 5:
      return { label: "Very Poor", emoji: "🟣" };
    default:
      return { label: "Unknown", emoji: "❓" };
  }
}

/**
 * Send daily reminder (exported)
 */
module.exports = {
  sendDailyWeather: async () => {
    const users = await User.find({ isSubscribed: true, isBlocked: false });
    for (const user of users) {
      bot.sendMessage(
        user.chatId,
        "🌍 Please share your location to receive daily weather updates.",
        {
          reply_markup: {
            keyboard: [[{ text: "📍 Send Location", request_location: true }]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        }
      );
    }
  },
};
