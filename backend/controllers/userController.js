const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = new User({ username });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserScore = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUser, getUserScore };
