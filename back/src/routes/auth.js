const { Router } = require('express');
const {
  register,
  login,
  anonymousRegister,
} = require('../controllers/auth.controller.js');

module.exports = Router()
  .post('/register', register)
  .post('/login', login)
  .post('/anonymous', anonymousRegister);
