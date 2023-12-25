const mongoose = require("mongoose");
const tasksSchema = require("./tasks");

const userSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    trim: true,
  },
  email: {
    require: true,
    type: String,
    trim: true,
  },
  password: {
    require: true,
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tasks: [tasksSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
