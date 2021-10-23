const { verifyToken } = require('../utils/jwt');

const tokenValidation = async (req, res, next) => {
  const token = req.header('X-Authorization');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token not found',
    });
  }

  try {
    const user = await verifyToken(token);

    req.user = user;
    return next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: 'Internal error server',
    });
  }
};

module.exports = tokenValidation;
