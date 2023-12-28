const express = require("express");
const { getUser } = require("../controllers/tasks");
const router = express.Router();

//controllers
router.post("/getUser", getUser);

module.exports = router;
