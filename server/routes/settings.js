const express = require("express");
const Setting = require("../models/Setting.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const setting = await Setting.findOne();
  res.json(setting);
});

router.post("/", async (req, res) => {
  const existing = await Setting.findOne();
  if (existing) {
    await Setting.updateOne({}, req.body);
    return res.json({ message: "Updated" });
  } else {
    const newSetting = new Setting(req.body);
    await newSetting.save();
    res.json({ message: "Created" });
  }
});

module.exports = router;
