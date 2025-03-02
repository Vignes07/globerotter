const express = require("express");
const { getAllDestinations } = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getAllDestinations);

module.exports = router;
