const express = require('express');
const authRouter = require('./routes/auth');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Poker Backend is up and running');
});

module.exports = app;
