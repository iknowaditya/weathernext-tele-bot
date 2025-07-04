const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: { type: Number, required: true, unique: true },
  isSubscribed: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  name: String,
  username: String,
  joinedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  location: {
    lat: Number,
    lon: Number,
    city: String,
    country: String,
  },
});

module.exports = mongoose.model("User", userSchema);
