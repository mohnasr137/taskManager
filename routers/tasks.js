const express = require("express");
const { getUserTasks } = require("../controllers/tasks");
const router = express.Router();

//controllers
router.get("/user/:id", getUserTasks);

module.exports = router;
