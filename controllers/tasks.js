const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user with this email not found",
      });
    }
    const { name, tasks } = user;
    return res.json({ success: true, name, tasks });
  } catch (err) {
    return res.json({ success: false, message: err });
  }
};

module.exports = {
  getUser,
};
