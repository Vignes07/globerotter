const express = require("express");
const { createUser, getUserScore } = require("../controllers/userController");
const router = express.Router();

router.post("/create", createUser);
router.get("/score/:username", getUserScore);

module.exports = router;
