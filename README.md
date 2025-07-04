# 🌤️ Telegram Weather Bot with Admin Panel

A full-stack weather notification Telegram bot that provides users with real-time weather updates, air quality index (AQI), sunrise/sunset timings, and more — powered by OpenWeather API. Includes an Admin Panel built with **Next.js (App Router)**, **TailwindCSS**, and **ShadCN UI** for managing users and bot settings.

---

## 📦 Features

### 🤖 Telegram Bot
- `/start` to subscribe to weather updates
- Location sharing to receive real-time weather + AQI
- `/stop` to unsubscribe
- Daily update support (optional cron job)
- Stores:
  - Name, username, chatId
  - Joined date and last update
  - User location (lat, lon)
  - Subscribed / blocked status

### 🛠️ Admin Panel
- Built using **Next.js App Router (JSX)**
- View & manage users:
  - Block or delete users
  - View location & last updated time
- Bot settings management:
  - View & update OpenWeather API key
  - Secure API key input with eye icon toggle
  - UI cards for API status, usage, and limits

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── models/              # Mongoose schemas (User.js, Setting.js)
│   ├── bot.js              # Telegram bot logic
│   ├── app.js              # Express entrypoint
│   ├── .env                # Env variables
│   └── ...
├── client/                 # Next.js
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── users/page.jsx
│   │   │   └── settings/page.jsx
│   │   └── layout.jsx
│   ├── components/
│   │   └── Sidebar.jsx
│   ├── lib/
│   │   └── api.js
│   ├── styles/
│   │   └── globals.css
│   └── .env.local
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/telegram-weather-bot.git
cd telegram-weather-bot
```

### 2. Setup Backend

```bash
cd backend
npm install
```

👉 **Create `.env`**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/telegram-bot
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

👉 **Start Backend**

```bash
nodemon app.js
```

### 3. Setup Frontend (Admin Panel)

```bash
cd client
npm install
```

👉 **Create `.env.local`**

```env
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

👉 **Start Frontend**

```bash
npm run dev
```

**Admin panel will be running at** `http://localhost:3000`

---

## 🔐 API Key Source

Get your free API key from: 🌐 [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🧠 Future Improvements

- [ ] Add authentication for admin panel
- [ ] Pagination and filtering in user list
- [ ] Dashboard analytics for bot usage
- [ ] Auto-detect city using reverse geocoding
- [ ] Weather card image generation (custom image board for messages)
- [ ] Theme toggle (dark/light mode)

---

## 👨‍💻 Technologies Used

| Platform | Tech Stack |
|----------|------------|
| **Telegram Bot** | Node.js, axios, node-telegram-bot-api |
| **Database** | MongoDB, Mongoose |
| **Admin Panel** | Next.js (App Router), TailwindCSS, ShadCN UI |
| **Icons** | react-icons |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [OpenWeather](https://openweathermap.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

---

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository or contact the maintainers.
