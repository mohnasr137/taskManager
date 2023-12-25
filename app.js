//packages
const express = require("express");
const mongoose = require("mongoose");
//imported
const tasks = require("./routers/tasks");
const auth = require("./routers/auth");

//starter
const app = express();
const port = process.env.port || 3000;
const url = process.env.API_URL;

//middlewares
app.use(express.json());

//routers
app.use(`${url}/auth`, auth);
//post signup
//post signin
app.use(`${url}/tasks`, tasks);
//get
//post
//get single
//update single
//delete single

//connection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("mongoose connection successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log(process.env.CONNECTION_STRING);
  });
app.listen(port, console.log(`server is listen in port:${port}`));
