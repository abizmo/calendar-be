const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Connect')
  } catch (err) {
    throw new Error('Mongoose connect error');
  }
}

module.exports = {
  dbConnection
};
