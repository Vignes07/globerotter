const Destination = require("../models/Destination");

const getGameData = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getGameData };
