const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  start: {
    require: true,
    type: String,
  },
  end: {
    require: true,
    type: String,
  },
  done: {
    require: true,
    type: Boolean,
  },
  des: {
    type: String,
  },
  degree: {
    type: Number,
  },
});

module.exports = tasksSchema;
