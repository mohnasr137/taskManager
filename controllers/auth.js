const brcyptjs = require("bcryptjs");
const User = require("../models/user");

const signUp = async (req, res) => {
  try {
    let tasks = [];
    tasks = req.body.tasks;
    const { email, password, isAdmin } = req.body;
    let name = req.body.name;
    name = name.split("-");
    name = `${name[0]} ${name[1]}`;
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isMatch = email.match(re);
    if (name.length < 3) {
      return res.json({ success: false, message: "please enter a valid name" });
    }
    if (!isMatch) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "please enter a long password",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "the user with same email is already exist!.",
      });
    }
    const hashedPassword = await brcyptjs.hash(password, 10);
    let user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      tasks,
    });
    user = await user.save();
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "the user with this email does not exist!.",
      });
    }
    const isMatch = await brcyptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password." });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

module.exports = { signUp, signIn };
