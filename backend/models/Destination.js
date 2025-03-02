const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  city: String,
  country: String,
  clues: [String],
  fun_facts: [String],
  trivia: [String],
});

module.exports = mongoose.model("Destination", DestinationSchema);
