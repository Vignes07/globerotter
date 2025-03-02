const express = require("express");
const { getGameData } = require("../controllers/gameController");
const router = express.Router();

router.get("/data", getGameData);

module.exports = router;
