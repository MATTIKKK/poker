const { Router } = require('express');
const verifyToken = require('../middleware/auth');
const {
  listGames,
  createGame,
  getGameById
} = require('../controllers/game.controller');

module.exports = Router()
  .get('/', verifyToken, listGames)      
  .post('/', verifyToken, createGame)     
  .get('/:id', verifyToken, getGameById);  