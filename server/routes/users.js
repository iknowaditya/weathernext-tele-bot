const express = require("express");
const User = require("../models/User.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/block/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isBlocked: true });
  res.json({ message: "User blocked" });
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
