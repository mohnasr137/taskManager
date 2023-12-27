const express = require("express");
const { getUser } = require("../controllers/tasks");
const router = express.Router();

//controllers
router.get("/getUser", getUser);

module.exports = router;
