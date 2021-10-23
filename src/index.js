/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { dbConnection } = require('./config/database');
const authRouter = require('./routes/auth');
const eventsRouter = require('./routes/events');

const app = express();
const { PORT } = process.env;

dbConnection()
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('DB NOT Connected'));

app.use(cors());
app.use(express.static('src/public'));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
