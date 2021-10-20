const User = require("../models/user");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: 'login',
    data: {
      email,
      password,
    },
  });
};

const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'New user registered',
    });
  } catch (err) {
    res.status(409).json({
      ok: false,
      msg: 'User already exists'
    });
  }
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  loginUser,
  registerUser,
  renewToken,
}