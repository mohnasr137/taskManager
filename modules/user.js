const mongoose = require("mongoose");

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
  type: {
    type: String,
    default: "user",
  },
  tasks: [
    {
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
      description: {
        type: String,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
