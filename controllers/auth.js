const brcyptjs = require("bcryptjs");
const User = require("../modules/user");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isMatch = email.match(re);
    if (name.length < 3) {
      return res.status(400).json({ message: "please enter a valid name" });
    }
    if (!isMatch) {
      return res.status(400).json({ message: "please enter a valid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "please enter a long password" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "the user with same email is already exist!." });
    }
    const hashedPassword = await brcyptjs.hash(password, 10);
    let user = new User({
      name,
      email,
      password: hashedPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "the user with this email does not exist!." });
    }
    const isMatch = await brcyptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { signUp, signIn };
