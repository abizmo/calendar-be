const jwt = require('jsonwebtoken');

const getToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  getToken,
};
