const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { getToken } = require('../utils/jwt');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email/password not exist',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Email/password not exist',
      });
    }

    const { id: uid, name } = user;

    const token = await getToken({ name, uid });

    return res.status(200).json({
      ok: true,
      msg: 'User logged in',
      data: { name, token, uid },
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Please, contact with the administrator',
    });
  }
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

    const { id: uid } = user;
    const token = await getToken({ name, uid });

    return res.status(201).json({
      ok: true,
      msg: 'New user registered',
      data: { name, token, uid },
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Please, contact with the administrator',
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req.user;

  try {
    const token = await getToken({ uid, name });

    res.json({
      ok: true,
      msg: 'renew',
      data: { name, token, uid },
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Please, contact with the administrator',
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  renewToken,
};
