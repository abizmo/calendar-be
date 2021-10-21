require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { dbConnection } = require('./config/database');
const authRouter = require('./routes/auth');

const app = express();
const { PORT } = process.env;

dbConnection();

app.use(cors());
app.use(express.static('public'));
app.use(express.json())
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
