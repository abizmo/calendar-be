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

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);

      resolve({ uid, name });
    } catch(err) {
      reject(err);
    }
  });
};

module.exports = {
  getToken,
  verifyToken,
};
