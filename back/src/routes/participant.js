const { Router } = require('express');
const {
  joinGame,
  leaveGame,
  getParticipantsByGame,
} = require('../controllers/participant.controller');
const verifyToken = require('../middleware/auth');

module.exports = Router()
  .post('/:gameId/join', verifyToken, joinGame)
  .post('/:gameId/leave', verifyToken, leaveGame)
  .get('/:gameId/participants', verifyToken, getParticipantsByGame);
