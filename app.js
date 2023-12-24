//packages
const express = require("express");
const mongoose = require("mongoose");
//imported
const tasks = require("./routers/tasks");
const auth = require("./routers/auth");

//starter
const app = express();
const port = process.env.port || 3000;
const route = "/api/v1/";
const DB =
  "mongodb+srv://MohNasr:Moh01093669048@cluster0.yi1blqm.mongodb.net/?retryWrites=true&w=majority";
//middlewares
app.use(express.json());

//routers
app.use(`${route}auth`, auth);
//post signup
//post signin
app.use(`${route}tasks`, tasks);
//get
//post
//get single
//update single
//delete single

//connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("mongoose connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, console.log(`server is listen in port:${port}`));
