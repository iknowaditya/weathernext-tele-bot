const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  weatherApiKey: { type: String, required: true },
  botToken: { type: String, required: true },
});

module.exports = mongoose.model("Setting", settingSchema);
