const { Router } = require('express');
const { register } = require('../controllers/auth.controller.js');

module.exports = Router()
  .post('/register', register);