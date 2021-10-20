const bcrypt = require('bcryptjs');

const User = require("../models/user");

const loginUser = (req, res) => {
  const { email, name, password } = req.body;

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
  const { email, name, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists',
      });
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    user = new User({
      email,
      name,
      password: hash,
    });
    await user.save();

    return res.status(201).json({
      ok: true,
      msg: 'New user registered',
      data: {
        uid: user.id,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Please, contact with the administrator',
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