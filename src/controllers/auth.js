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

const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: 'register',
    data: {
      name,
      email,
      password
    },
  });
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