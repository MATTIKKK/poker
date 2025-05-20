const express = require('express');
const participantRouter = require('./routes/participant');
const authRouter = require('./routes/auth');
const gameRouter = require('./routes/game');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/games', gameRouter);
app.use('/api/games', participantRouter);


app.get('/', (req, res) => {
  res.send('Poker Backend is up and running');
});

module.exports = app;
